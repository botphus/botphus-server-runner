"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sleep
 * @param  {number}        sleepTime Millisecond
 * @return {Promise<void>}           Nothing will return
 */
function sleep(sleepTime) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, sleepTime);
    });
}
exports.sleep = sleep;
