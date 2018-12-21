import BotphusRule, {TaskRuleTypeItem} from '@botphus/rule';
import * as fse from 'fs-extra';
import * as path from 'path';

import {IBotphusRunnerConfig} from '../../interfaces/common';
import {ITaskErrorMessage, ITaskMessage} from '../../interfaces/task';
import {MessageType} from '../../types/common';
import {TaskMessage} from '../../types/task';

import {createErrorMessage, getTaskNoByTaskName} from '../common';
import {checkCache, createCache} from './cache';

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
                }, (err) => { // Check render error
                    return Promise.reject(createErrorMessage(err, MessageType.TASK_RULES_RENDER_ERROR));
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
