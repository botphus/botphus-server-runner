"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require("cluster");
const path = require("path");
const common_1 = require("../../types/common");
const const_1 = require("../../const");
/**
 * Current worker count
 * @type {number}
 */
let workerCount = 0;
if (cluster.isMaster) {
    // Use cluster.setupMaster insteadof cluster.isMaster
    // To resolve mocha test bug
    cluster.setupMaster({
        exec: path.join(__dirname, 'worker.js')
    });
}
/**
 * Create-task work pool
 * @type {IProcessPoolMap}
 */
const workerPoolMap = new Map();
let workQueue = [];
/**
 * Handle worker exit event
 * @param {cluster.Worker} worker Worker
 * @param {number}         code   Process exit code
 * @param {string}         signal Process exit signal
 */
function handleWorkerExit(worker, code, signal) {
    global.console.warn(`worker ${worker.process.pid} died: ${code}-${signal || ''}`);
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
function handleWorkerReceiveMessage(worker, message) {
    const curEvent = workerPoolMap.get(worker.id.toString());
    const [err, data] = message;
    curEvent.emit('message', message);
    // If worker is error
    if (err) {
        if (err.type !== common_1.MessageType.UNIT_RULE_EXEC_SKIP_ERROR) {
            destoryWorker(worker, 1);
        }
        return;
    }
    // If worker is end
    switch (data.type) {
        case common_1.MessageType.TASK_END:
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
function destoryWorker(worker, code) {
    const workerId = worker.id.toString();
    const curEvent = workerPoolMap.get(workerId);
    curEvent.emit('exit', code);
    curEvent.removeAllListeners();
    workerPoolMap.delete(workerId);
}
/**
 * Dispatch work
 */
function dispatchWorks() {
    if (workQueue.length === 0) {
        return;
    }
    const idleWorkers = [];
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
            return true;
        }
        const curId = idleWorkers.splice(0, 1)[0];
        const curWorker = cluster.workers[curId];
        workerPoolMap.set(curId, work.event);
        curWorker.send(work.workData);
        return false;
    });
}
/**
 * Register worker
 */
function register() {
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
    for (let i = 0; i < const_1.PROCESS_POOL_SIZE; i++) {
        cluster.fork();
        workerCount++;
    }
    dispatchWorks();
}
exports.register = register;
/**
 * Destroy all worker
 */
function destory() {
    cluster.removeAllListeners();
    return new Promise((resolve) => {
        cluster.disconnect(() => {
            resolve();
        });
    });
}
exports.destory = destory;
/**
 * Add work
 * @param {IProcessPoolWork} workData Add work data
 */
function addWork(workData) {
    // Add work queue
    workQueue.push(workData);
    // Run work in next tick
    process.nextTick(dispatchWorks);
}
exports.addWork = addWork;
