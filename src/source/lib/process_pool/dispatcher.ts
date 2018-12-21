import * as cluster from 'cluster';
import * as path from 'path';

import {IProcessPoolMap, IProcessPoolWork, IProcessPoolWorkEvent} from '../../interfaces/process_pool';
import {ITaskMessage} from '../../interfaces/task';
import {MessageType} from '../../types/common';
import {TaskMessage} from '../../types/task';

import {PROCESS_POOL_SIZE} from '../../const';

/**
 * Current worker count
 * @type {number}
 */
let workerCount: number = 0;

// Use cluster.setupMaster insteadof cluster.isMaster
// To resolve mocha test bug
cluster.setupMaster({
    exec: path.join(__dirname, 'worker.js')
});

/**
 * Create-task work pool
 * @type {IProcessPoolMap}
 */
const workerPoolMap: IProcessPoolMap = new Map<string, IProcessPoolWorkEvent<ITaskMessage>>();

let workQueue: IProcessPoolWork[] = [];

/**
 * Handle worker exit event
 * @param {cluster.Worker} worker Worker
 * @param {number}         code   Process exit code
 * @param {string}         signal Process exit signal
 */
function handleWorkerExit(worker: cluster.Worker, code: number, signal: string) {
    global.console.warn(`worker ${worker.process.pid} died: ${code}-${signal}`);
    // Reduce worker count
    workerCount--;
    destoryWorker(worker, 1);
    // Check left worker & register again
    if (workerCount === 0) {
        global.console.info(`Workers all died, register again`);
        register();
    }
}

/**
 * Handle worker receive message
 * @param {cluster.Worker} worker  Worker
 * @param {TaskMessage}    message Message data
 */
function handleWorkerReceiveMessage(worker: cluster.Worker, message: TaskMessage<ITaskMessage>) {
    const curEvent = workerPoolMap.get(worker.id.toString());
    const [err, data] = message;
    curEvent.emit('message', message);
    // If worker is error
    if (err) {
        destoryWorker(worker, 1);
        return;
    }
    // If worker is end
    switch (data.type) {
        case MessageType.TASK_END:
            destoryWorker(worker, 0);
            dispatchWorks();
            return;
    }
}

/**
 * Destory worker in map & event listeners
 * @param {cluster.Worker} worker Worker
 * @param {number}         code   Exit code
 */
function destoryWorker(worker: cluster.Worker, code: number): void {
    const workerId = worker.id.toString();
    const curEvent = workerPoolMap.get(workerId);
    curEvent.emit('exit', code);
    curEvent.removeAllListeners();
    workerPoolMap.delete(workerId);
}

/**
 * Dispatch work
 */
function dispatchWorks(): void {
    if (workQueue.length === 0) {
        return;
    }
    const idleWorkers: string[] = [];
    // Get idle worker list
    for (const id in cluster.workers) {
        if (!workerPoolMap.has(id)) {
            idleWorkers.push(id);
        }
    }
    if (idleWorkers.length === 0) {
        return;
    }
    // Dispatch work queue for multiple works
    workQueue = workQueue.filter((work) => {
        if (idleWorkers.length === 0) {
            return false;
        }
        const curId = idleWorkers.splice(0, 1)[0];
        const curWorker = cluster.workers[curId];
        workerPoolMap.set(curId, work.event);
        curWorker.send(work.workData);
        return true;
    });
}

/**
 * Register worker
 */
export function register(): void {
    // If has workers, block it
    if (workerCount > 0) {
        return;
    }
    if (cluster.listeners('exit').length === 0) {
        // Check worker count
        cluster.on('exit', handleWorkerExit);
    }
    if (cluster.listeners('message').length === 0) {
        // Check worker count
        cluster.on('message', handleWorkerReceiveMessage);
    }
    // Register process pool
    for (let i = 0; i < PROCESS_POOL_SIZE; i++) {
        cluster.fork();
        workerCount++;
    }
    dispatchWorks();
}

/**
 * Destroy all worker
 */
export function destory(): Promise<void> {
    cluster.removeAllListeners();
    return new Promise((resolve) => {
        cluster.disconnect(() => {
            resolve();
        });
    });
}

/**
 * Add work
 * @param {IProcessPoolWork} workData Add work data
 */
export function addWork(workData: IProcessPoolWork): void {
    // Add work queue
    workQueue.push(workData);
    // Run work
    dispatchWorks();
}
