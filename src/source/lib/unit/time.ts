/**
 * Sleep
 * @param  {number}        sleepTime Millisecond
 * @return {Promise<void>}           Nothing will return
 */
export function sleep(sleepTime: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, sleepTime);
    });
}
