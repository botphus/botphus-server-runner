import {TaskRuleTypeItem} from '@botphus/rule';

import {IBotphusRunnerConfig} from './interfaces/common';

import {BOTPHUS_TMP_PATH} from './const';
import {destory, register} from './lib/process_pool';
import {createTask} from './lib/task';

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
    public destory(): Promise<void> {
        return destory();
    }
}

export default BotphusCore;
// export types
export * from './types/common';
export * from './types/task';
// export interfaces
export * from './interfaces/common';
export * from './interfaces/task';
export * from './interfaces/process_pool';
