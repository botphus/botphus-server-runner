import {ITaskErrorMessage} from '../interfaces/task';

/**
 * Task Message
 * @type {Array}
 */
export type TaskMessage<T> = [ITaskErrorMessage, T];
