"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
const process_pool_1 = require("./lib/process_pool");
const task_1 = require("./lib/task");
/**
 * Botphus Core Task
 */
class BotphusCore {
    constructor(customConfig) {
        // Update basic config
        this.config = Object.assign({ cachePath: const_1.BOTPHUS_TMP_PATH }, customConfig);
        // Register process pool
        process_pool_1.register();
    }
    /**
     * Create Task & return task no
     * @param  {string}          taskName      Task Name
     * @param  {number}          mtime         Task Update Time, 13 digits timestamp
     * @param  {TaskRuleTypeItem[]}  taskRules Task Rule List
     * @return {Promise<string>}               Promise with Task Number
     */
    createTask(taskName, mtime, taskRules) {
        return task_1.createTask(taskName, mtime, taskRules, this.config);
    }
    /**
     * Remove task with taskNo
     * @param  {string}        taskNo Task No
     * @return {Promise<void>}        Promise with none
     */
    removeTask(taskNo) {
        return task_1.removeTask(taskNo, this.config);
    }
    /**
     * Remove All Task Cache file
     * @return {Promise<void>} Promise with none
     */
    clearTask() {
        return task_1.clearTask(this.config);
    }
    /**
     * Start task
     * @param  {string}                taskNo      Task No
     * @param  {string}                startPage   Task start page
     * @param  {ITaskStartOption={}}   startOption Task start option
     * @return {Promise<ChildProcess>}             Promise with task child process
     */
    startTask(taskNo, startPage, startOption = {}) {
        return task_1.startTask(taskNo, startPage, startOption, this.config);
    }
}
exports.default = BotphusCore;
exports.destoryPool = process_pool_1.destory;
// export types
__export(require("./types/common"));
