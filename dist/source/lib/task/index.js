"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = require("@botphus/rule");
const fse = require("fs-extra");
const path = require("path");
const common_1 = require("../../types/common");
const common_2 = require("../common");
const process_pool_1 = require("../process_pool");
const cache_1 = require("./cache");
const botphusRule = new rule_1.default();
/**
 * Create Task & return task no
 * @param  {string}               taskName  Task Name
 * @param  {number}               mtime     Task Update Time, 13 digits timestamp
 * @param  {TaskRuleTypeItem[]}   taskRules Task Rule List
 * @param  {IBotphusRunnerConfig} config    Botphus Runner Config
 * @return {Promise<string>}                Promise with Task Number
 */
function createTask(taskName, mtime, taskRules, config) {
    const taskNo = common_2.getTaskNoByTaskName(taskName);
    // Cache file path for rules
    const cacheFilePath = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    // Check if cache exists
    return botphusRule.validRule(taskRules)
        .then(() => {
        return cache_1.checkCache(cacheFilePath, taskNo, mtime);
    }, (err) => {
        return Promise.reject(common_2.createErrorMessage(err, common_1.MessageType.TASK_RULES_VALID_ERROR));
    })
        .then((curTaskNo) => {
        if (curTaskNo) {
            return curTaskNo;
        }
        // if cache is inexistence, create it & return taskNo
        return cache_1.createCache(cacheFilePath, taskNo, taskRules)
            .then(() => {
            return taskNo;
        }, (err) => {
            return Promise.reject(common_2.createErrorMessage(err, common_1.MessageType.TASK_RULES_RENDER_ERROR));
        });
    });
}
exports.createTask = createTask;
/**
 * Remove task file
 * @param  {string}               taskNo Task No
 * @param  {IBotphusRunnerConfig} config Botphus Runner Config
 * @return {Promise<void>}               Promise with nothing
 */
function removeTask(taskNo, config) {
    // Cache file path
    const cacheFilePath = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return fse.remove(cacheFilePath);
}
exports.removeTask = removeTask;
/**
 * Clear all task files from cache dir
 * @param  {IBotphusRunnerConfig} config Botphus Runner Config
 * @return {Promise<void>}               Promise with nothing
 */
function clearTask(config) {
    return fse.emptyDir(path.join(config.cachePath, '/task-cache/'));
}
exports.clearTask = clearTask;
/**
 * Start task
 * @param  {string}                taskNo      Task No
 * @param  {string}                startPage   Task start page
 * @param  {ITaskStartOption}      startOption Task start option
 * @param  {IBotphusConfig}        config      Botphus config
 * @return {Promise<ChildProcess>}             Promise with task child process
 */
function startTask(taskNo, startPage, startOption, config) {
    // Cache file path
    const cacheFilePath = path.join(config.cachePath, '/task-cache/', taskNo + '.js');
    return cache_1.getCache(cacheFilePath)
        .then((stats) => {
        if (!stats) {
            return Promise.reject(new common_2.ErrorMessage('Task cache is nonexistence', common_1.MessageType.TASK_RULES_CACHE_ERROR));
        }
        const curEvent = process_pool_1.createEvent();
        // Add work
        process_pool_1.addWork({
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
exports.startTask = startTask;
/**
 * Send task msg
 * @param {ITaskErrorMessage} err  Error info
 * @param {ITaskMessage}      data Task data
 */
function sendTaskMsg(err, data = null) {
    const message = [null, data];
    // Reset err message to object because the error instance can't send by process send
    if (err) {
        message[0] = {
            index: err.index,
            message: err.message,
            name: err.name,
            stack: err.stack,
            type: err.type,
        };
    }
    process.send(message);
}
exports.sendTaskMsg = sendTaskMsg;
