import {MessageType} from '../types/common';

/**
 * Botphus Runner Config
 */
export interface IBotphusRunnerConfig {
    cachePath?: string; // Cache path for botphus rule file
}

/**
 * Error message type
 */
export interface IErrorMessage extends Error {
    type?: MessageType;
}
