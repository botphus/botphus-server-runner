import BotphusRule, {TaskRuleTypeItem} from '@botphus/rule';
import * as fse from 'fs-extra';
import * as path from 'path';

import {IBotphusRunnerConfig} from '../../interfaces/common';
import {IProcessPoolWorkEvent} from '../../interfaces/process_pool';
import {ITaskErrorMessage, ITaskMessage, ITaskStartOption} from '../../interfaces/task';
import {MessageType} from '../../types/common';
import {TaskMessage} from '../../types/task';

import {createErrorMessage, ErrorMessage, getTaskNoByTaskName} from '../common';
import {addWork, createEvent} from '../process_pool';
import {checkCache, createCache, getCache} from './cache';

const botphusRule = new BotphusRule();

/**
 * Create Task & return task no
 * @param  {string}               taskName  Task Name
 * @param  {number}               mtime     Task Update Time, 13 digits timestamp
 * @param  {TaskRuleTypeItem[]}   taskRules Task Rule List
 * @param  {IBotphusRunnerConfig} config    Botphus Runner Config
 * @return {Promise<string>}                Promise with Task Number
 */
export function createTask(taskName: string, mtime: number, taskRules: TaskRuleTypeItem[], config: IBotphusRunnerConfig): Promise<string> {
    const taskNo: string = getTaskNoByTaskName(taskName);
    // Cache file path for rules
    const cacheFilePath: string = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    // Check if cache exists
    return botphusRule.validRule(taskRules)
        .then(() => {
            return checkCache(cacheFilePath, taskNo, mtime);
        }, (err) => { // Check valid error
            return Promise.reject(createErrorMessage(err, MessageType.TASK_RULES_VALID_ERROR));
        })
        .then((curTaskNo) => {
            if (curTaskNo) {
                return curTaskNo;
            }
            // if cache is inexistence, create it & return taskNo
            return createCache(cacheFilePath, taskNo, taskRules)
                .then(() => {
                    return taskNo;
                });
        });
}

/**
 * Remove task file
 * @param  {string}               taskNo Task No
 * @param  {IBotphusRunnerConfig} config Botphus Runner Config
 * @return {Promise<void>}               Promise with nothing
 */
export function removeTask(taskNo: string, config: IBotphusRunnerConfig): Promise<void> {
    // Cache file path
    const cacheFilePath: string = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return fse.remove(cacheFilePath);
}

/**
 * Clear all task files from cache dir
 * @param  {IBotphusRunnerConfig} config Botphus Runner Config
 * @return {Promise<void>}               Promise with nothing
 */
export function clearTask(config: IBotphusRunnerConfig): Promise<void> {
    return fse.emptyDir(path.join(config.cachePath, '/task-cache/'));
}

/**
 * Start task
 * @param  {string}                taskNo      Task No
 * @param  {string}                startPage   Task start page
 * @param  {ITaskStartOption}      startOption Task start option
 * @param  {IBotphusConfig}        config      Botphus config
 * @return {Promise<ChildProcess>}             Promise with task child process
 */
export function startTask(taskNo: string, startPage: string, startOption: ITaskStartOption, config: IBotphusRunnerConfig): Promise<IProcessPoolWorkEvent<ITaskMessage>> {
    // Cache file path
    const cacheFilePath: string = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return getCache(cacheFilePath)
        .then((stats) => {
            if (!stats) {
                return Promise.reject(new ErrorMessage('Task cache is nonexistence', MessageType.TASK_RULES_CACHE_ERROR));
            }
            const curEvent = createEvent<ITaskMessage>();
            // Add work
            addWork({
                event: curEvent,
                workData: {
                    cacheFilePath,
                    config,
                    startOption,
                    startPage,
                    taskNo,
                    workType: 'runTask',
                }
            });
            return Promise.resolve(curEvent);
        });
}

/**
 * Send task msg
 * @param {ITaskErrorMessage} err  Error info
 * @param {ITaskMessage}      data Task data
 */
export function sendTaskMsg(err: ITaskErrorMessage, data: ITaskMessage = null): void {
    const message: TaskMessage<ITaskMessage> = [null, data];
    // Reset err message to object because the error instance can't send by process send
    if (err) {
        message[0] = {
            index: err.index, // Task unit index
            message: err.message, // error message
            name: err.name, // error name
            stack: err.stack, // error stack info
            type: err.type, // error type
        };
    }
    process.send(message);
}
