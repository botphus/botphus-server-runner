import {TaskRuleTypeItem} from '@botphus/rule';

import {IBotphusRunnerConfig} from './interfaces/common';
import {IProcessPoolWorkEvent} from './interfaces/process_pool';
import {ITaskMessage, ITaskStartOption} from './interfaces/task';

import {BOTPHUS_TMP_PATH} from './const';
import {destory, register} from './lib/process_pool';
import {clearTask, createTask, removeTask, startTask} from './lib/task';

/**
 * Botphus Core Task
 */
class BotphusCore {
    private config: IBotphusRunnerConfig; // Basic Config
    constructor(customConfig?: IBotphusRunnerConfig) {
        // Update basic config
        this.config = {
            cachePath: BOTPHUS_TMP_PATH,
            ...customConfig
        };
        // Register process pool
        register();
    }
    /**
     * Create Task & return task no
     * @param  {string}          taskName      Task Name
     * @param  {number}          mtime         Task Update Time, 13 digits timestamp
     * @param  {TaskRuleTypeItem[]}  taskRules Task Rule List
     * @return {Promise<string>}               Promise with Task Number
     */
    public createTask(taskName: string, mtime: number, taskRules: TaskRuleTypeItem[]): Promise<string> {
        return createTask(taskName, mtime, taskRules, this.config);
    }
    /**
     * Remove task with taskNo
     * @param  {string}        taskNo Task No
     * @return {Promise<void>}        Promise with none
     */
    public removeTask(taskNo: string): Promise<void> {
        return removeTask(taskNo, this.config);
    }
    /**
     * Remove All Task Cache file
     * @return {Promise<void>} Promise with none
     */
    public clearTask(): Promise<void> {
        return clearTask(this.config);
    }
    /**
     * Start task
     * @param  {string}                taskNo      Task No
     * @param  {string}                startPage   Task start page
     * @param  {ITaskStartOption={}}   startOption Task start option
     * @return {Promise<ChildProcess>}             Promise with task child process
     */
    public startTask(taskNo: string, startPage: string, startOption: ITaskStartOption = {}): Promise<IProcessPoolWorkEvent<ITaskMessage>> {
        return startTask(taskNo, startPage, startOption, this.config);
    }
}

export default BotphusCore;

export const destoryPool = destory;

// export types
export * from './types/common';
export * from './types/task';
// export interfaces
export * from './interfaces/common';
export * from './interfaces/task';
export * from './interfaces/process_pool';
