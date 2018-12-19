import {MessageType} from '../types/common';

/**
 * Botphus Runner Config
 */
export interface IBotphusRunnerConfig {
    cachePath?: string; // Cache path for botphus rule file
    processPoolSize?: number; // Process pool size, default is cpu's number, and the pool will plus an additional create-task process
}

/**
 * Error message type
 */
export interface IErrorMessage extends Error {
    type?: MessageType;
}
