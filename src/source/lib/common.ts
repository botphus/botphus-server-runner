import * as crypto from 'crypto';

import {IErrorMessage} from '../interfaces/common';
import {MessageType} from '../types/common';

/**
 * Create hash
 * @param  {string} str Target String
 * @return {string}     Target string hash result
 */
export function createHash(str: string): string {
    return crypto
            .createHash('md5')
            .update(str)
            .digest('hex');
}

/**
 * Get task No with task name
 * @param  {string} taskName Task Name
 * @return {string}          Task No
 */
export function getTaskNoByTaskName(taskName: string): string {
    return createHash(taskName);
}

/**
 * Botphus message
 */

/**
 * Create a botphus error message
 * @param  {Error}         error Error message
 * @param  {MessageType}   type  Error type
 * @return {IErrorMessage}       Return Error message
 */
export function createErrorMessage(error: Error, type: MessageType): IErrorMessage {
    const errorMessage: IErrorMessage = error;
    errorMessage.type = type;
    return errorMessage;
}

/**
 * Botphus error message
 */
export class ErrorMessage extends Error {
    public type: MessageType;
    /**
     * Create a error message
     * @param {string}      message Error info
     * @param {MessageType} type    Error type
     */
    constructor(message: string, type: MessageType) {
        super(message);
        this.type = type;
        return this;
    }
}
