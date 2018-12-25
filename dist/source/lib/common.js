"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
/**
 * Create hash
 * @param  {string} str Target String
 * @return {string}     Target string hash result
 */
function createHash(str) {
    return crypto
        .createHash('md5')
        .update(str)
        .digest('hex');
}
exports.createHash = createHash;
/**
 * Get task No with task name
 * @param  {string} taskName Task Name
 * @return {string}          Task No
 */
function getTaskNoByTaskName(taskName) {
    return createHash(taskName);
}
exports.getTaskNoByTaskName = getTaskNoByTaskName;
/**
 * Botphus message
 */
/**
 * Create a botphus error message
 * @param  {Error}         error Error message
 * @param  {MessageType}   type  Error type
 * @return {IErrorMessage}       Return Error message
 */
function createErrorMessage(error, type) {
    const errorMessage = error;
    errorMessage.type = type;
    return errorMessage;
}
exports.createErrorMessage = createErrorMessage;
/**
 * Botphus error message
 */
class ErrorMessage extends Error {
    /**
     * Create a error message
     * @param {string}      message Error info
     * @param {MessageType} type    Error type
     */
    constructor(message, type) {
        super(message);
        this.type = type;
        return this;
    }
}
exports.ErrorMessage = ErrorMessage;
