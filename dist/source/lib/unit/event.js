"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dialog listener
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-event-dialog
 * @param  {puppeteer.Page}                       page      Current Page
 * @param  {number}                               timeout   timeout, millisecond
 * @param  {()=>Promise<any>}                     childFunc Child functions after listener created
 * @param  {(dialog: puppeteer.Dialog)=>boolean}  checkFunc Check if info is right
 * @return {Promise<puppeteer.Dialog>}                      Return info
 */
function dialog(page, timeout, childFunc, checkFunc) {
    return eventListener(page, 'dialog', timeout, childFunc, checkFunc);
}
exports.dialog = dialog;
/**
 * Console listener
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-event-console
 * @param  {puppeteer.Page}                                           page      Current Page
 * @param  {number}                                                   timeout   timeout, millisecond
 * @param  {()=>Promise<any>}                                         childFunc Child functions after listener created
 * @param  {(consoleMessage: puppeteer.ConsoleMessage) => boolean}    checkFunc Check if info is right
 * @return {Promise<puppeteer.ConsoleMessage>}                                  Return info
 */
function console(page, timeout, childFunc, checkFunc) {
    return eventListener(page, 'console', timeout, childFunc, checkFunc);
}
exports.console = console;
/**
 * Request listener
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-event-request
 * @param  {puppeteer.Page}                            page      Current Page
 * @param  {number}                                    timeout   timeout, millisecond
 * @param  {()=>Promise<any>}                          childFunc Child functions after listener created
 * @param  {(request: puppeteer.Request) => boolean}   checkFunc Check if info is right
 * @return {Promise<puppeteer.Request>}                          Return info
 */
function request(page, timeout, childFunc, checkFunc) {
    return eventListener(page, 'request', timeout, childFunc, checkFunc);
}
exports.request = request;
/**
 * Response listener
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-event-response
 * @param  {puppeteer.Page}                              page      Current Page
 * @param  {number}                                      timeout   timeout, millisecond
 * @param  {()=>Promise<any>}                            childFunc Child functions after listener created
 * @param  {(response: puppeteer.Response) => boolean}   checkFunc Check if info is right
 * @return {Promise<puppeteer.Response>}                           Return info
 */
function response(page, timeout, childFunc, checkFunc) {
    return eventListener(page, 'response', timeout, childFunc, checkFunc);
}
exports.response = response;
/**
 * Common event listener
 * @param  {puppeteer.Page}         page      Current Page
 * @param  {puppeteer.PageEvents}   eventName Event Name
 * @param  {number}                 timeout   timeout, millisecond
 * @param  {()=>Promise<any>}       childFunc Child functions after listener created
 * @param  {(info: T) => boolean}   checkFunc Check if info is right
 * @return {Promise<T>}                       Return info
 */
function eventListener(page, eventName, timeout, childFunc, checkFunc) {
    return new Promise((resolve, reject) => {
        // Create a timer for timeout
        let timer = setTimeout(() => {
            reject(new Error(`Event "${eventName}" listener timeout`));
            timer = null;
            removeTimer();
        }, timeout);
        // Register a listener
        page.on(eventName, curEventListener);
        function curEventListener(info) {
            // For timer check
            // Just in case, the code will trigger for some special time
            /* istanbul ignore next */
            if (!timer) {
                return;
            }
            // Check info is right when checkFunc exist
            if (checkFunc && !checkFunc(info)) {
                return;
            }
            removeTimer();
            resolve(info);
        }
        function removeTimer() {
            if (timer) {
                // Clear timer
                clearTimeout(timer);
                timer = null;
            }
            // Remove listener
            page.removeListener(eventName, curEventListener);
        }
        // Run & trigger listener
        childFunc()
            .catch((err) => {
            removeTimer();
            reject(err);
        });
    });
}
