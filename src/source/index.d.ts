import { TaskRuleTypeItem } from '@botphus/rule';
import { IBotphusRunnerConfig } from './interfaces/common';
import { IProcessPoolWorkEvent } from './interfaces/process_pool';
import { ITaskMessage, ITaskStartOption } from './interfaces/task';
import { destory } from './lib/process_pool';
/**
 * Botphus Server runner
 */
export default class BotphusServerRunner {
    private config;
    constructor(customConfig?: IBotphusRunnerConfig);
    /**
     * Create Task & return task no
     * @param  {string}          taskName      Task Name
     * @param  {number}          mtime         Task Update Time, 13 digits timestamp
     * @param  {TaskRuleTypeItem[]}  taskRules Task Rule List
     * @return {Promise<string>}               Promise with Task Number
     */
    public createTask(taskName: string, mtime: number, taskRules: TaskRuleTypeItem[]): Promise<string>;
    /**
     * Remove task with taskNo
     * @param  {string}        taskNo Task No
     * @return {Promise<void>}        Promise with none
     */
    public removeTask(taskNo: string): Promise<void>;
    /**
     * Remove All Task Cache file
     * @return {Promise<void>} Promise with none
     */
    public clearTask(): Promise<void>;
    /**
     * Start task
     * @param  {string}                taskNo      Task No
     * @param  {string}                startPage   Task start page
     * @param  {ITaskStartOption={}}   startOption Task start option
     * @return {Promise<ChildProcess>}             Promise with task child process
     */
    public startTask(taskNo: string, startPage: string, startOption?: ITaskStartOption): Promise<IProcessPoolWorkEvent<ITaskMessage>>;
}
export declare const destoryPool: typeof destory;
export * from './types/common';
export * from './types/task';
export * from './interfaces/common';
export * from './interfaces/task';
export * from './interfaces/process_pool';
