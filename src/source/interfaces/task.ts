import {ClusterOptions, RedisOptions} from 'ioredis';
import {ConnectionConfig} from 'mysql';
import {LaunchOptions, NavigationOptions} from 'puppeteer';

import {MessageType} from '../types/common';
import {IErrorMessage} from './common';

/**
 * Task exclude unit map
 */
export interface ITaskExcludeUnit {
    [index: string]: boolean;
}
/**
 * Task start otpion
 */
export interface ITaskStartOption {
    puppeteerLaunchOption?: LaunchOptions; // Puppeteer Launch Option, details: https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-puppeteerlaunchoptions
    mysqlOption?: ConnectionConfig; // mysql.createConnection option, details: https://github.com/mysqljs/mysql#introduction
    redisOption?: RedisOptions | ClusterOptions; // ioredis option, details:
    // https://github.com/luin/ioredis/blob/master/API.md#new_Redis_new AND https://github.com/luin/ioredis/blob/master/API.md#new_Cluster_new
    excludeOption?: ITaskExcludeUnit;
    startPageOption?: NavigationOptions; // Puppeteer start page option, details: https://pptr.dev/#?product=Puppeteer&version=v1.8.0&show=api-pagegotourl-options
}

/**
 * Task Message Data
 * @type {Object}
 */
export type ITaskMessage = ITaskUnitMessage | ITaskStartMessage | ITaskEndMessage | ItaskUnitReceiveDataMessage;

/**
 * Task message
 */
interface ITaskMessageBase {
    index: string;
    context: object;
    type: MessageType;
    sendTime: number;
}
/**
 * Task error messsage
 */
export interface ITaskErrorMessage extends IErrorMessage {
    index?: string;
}
/**
 * Task start message
 */
export interface ITaskStartMessage extends ITaskMessageBase, ITaskStartOption {
    index: 'start';
    type: MessageType.TASK_START;
}
/**
 * Task end message
 */
export interface ITaskEndMessage extends ITaskMessageBase {
    index: 'end';
    type: MessageType.TASK_END;
    totalCase: number;
}
/**
 * Task unit start message
 */
export interface ITaskUnitMessage extends ITaskMessageBase {
    type: MessageType.TASK_UNIT_EXEC_START | MessageType.TASK_UNIT_EXEC_END;
    order: number;
}
/**
 * Task unit receive data messsage
 */
export interface ItaskUnitReceiveDataMessage extends ITaskMessageBase {
    type: MessageType.TASK_UNIT_EXEC_DATA_RECEIVE;
    order: number;
    data: any;
}
