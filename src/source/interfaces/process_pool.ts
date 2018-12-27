import {EventEmitter} from 'events';

import {ExitListener, MessageListener} from '../types/process_pool';
import {TaskMessage} from '../types/task';
import {IBotphusRunnerConfig} from './common';
import {ITaskMessage, ITaskStartOption} from './task';

/**
 * Process work event
 * reset message & exit event
 */
export interface IProcessPoolWorkEvent<T = ITaskMessage> extends EventEmitter {
    emit(event: 'message', message: TaskMessage<T>): any;
    emit(event: 'exit', code: number): any;
    on(event: 'message', listener: MessageListener<TaskMessage<T>>): this;
    on(event: 'exit', listener: ExitListener): this;
    once(event: 'message', listener: MessageListener<TaskMessage<T>>): this;
    once(event: 'exit', listener: ExitListener): this;
}

interface IProcessPoolWorkDataBase {
    // Work type
    workType: 'runTask';
    // Botphus instance config
    config: IBotphusRunnerConfig;
}

/**
 * Process pool run-task work item
 */
interface IProcessPoolWorkDataRun extends IProcessPoolWorkDataBase {
    // Work type
    workType: 'runTask';
    // Task No
    taskNo: string;
    // Task start page
    startPage: string;
    // Cache path
    cacheFilePath: string;
    // Task start option
    startOption: ITaskStartOption;
}

/**
 * Process pool map
 * - key: Worker ID
 * - value: Current work event
 */
export interface IProcessPoolMap extends Map<string, IProcessPoolWorkEvent> {}

/**
 * Process pool work data
 * TBD for other type
 */
export type IProcessPoolWorkData = IProcessPoolWorkDataRun;

/**
 * Process pool work item
 */
export interface IProcessPoolWork {
    // Work Data
    workData: IProcessPoolWorkData;
    // Event
    event: IProcessPoolWorkEvent;
}
