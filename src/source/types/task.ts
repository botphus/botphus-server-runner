import {ITaskErrorMessage, ITaskMessage} from '../interfaces/task';

/**
 * Task Message
 * @type {Array}
 */
export type TaskMessage<T = ITaskMessage> = [ITaskErrorMessage, T];
