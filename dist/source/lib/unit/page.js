"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Reload Page
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagereloadoptions
 * @param  {puppeteer.Page}              page Current Page
 * @return {Promise<puppeteer.Response>}      Page Response
 */
function reload(page) {
    return page.reload({
        waitUntil: 'domcontentloaded'
    });
}
exports.reload = reload;
/**
 * Set cookies
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagesetcookiecookies
 * @param  {puppeteer.Page}        page    Current Page
 * @param  {puppeteer.SetCookie[]} cookies Cookie List
 * @return {Promise<void>}                 Nothing will return
 */
function setCookie(page, cookies) {
    return page.setCookie(...cookies);
}
exports.setCookie = setCookie;
/**
 * Get cookies
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagecookiesurls
 * @param  {puppeteer.Page}              page Current Page
 * @param  {string[]}                    urls Cookie Urls, If no URLs are specified, this method returns cookies for the current page URL.
 * @return {Promise<puppeteer.Cookie[]>}      Cookie list
 */
function getCookie(page, urls) {
    return page.cookies(...urls);
}
exports.getCookie = getCookie;
/**
 * Delete cookies
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagedeletecookiecookies
 * @param  {puppeteer.Page}           page    Current Page
 * @param  {puppeteer.DeleteCookie[]} cookies Cookie List
 * @return {Promise<void>}                    Nothing will return
 */
function deleteCookie(page, cookies) {
    return page.deleteCookie(...cookies);
}
exports.deleteCookie = deleteCookie;
/**
 * Redirect to target url
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagegotourl-options
 * @param  {puppeteer.Page}              page   Current Page
 * @param  {string}                      url    target url
 * @param  {puppeteer.NavigationOptions} option page action
 * @return {Promise<puppeteer.Response>}        Page Response
 */
function goto(page, url, option = {
    waitUntil: 'domcontentloaded'
}) {
    return page.goto(url, option);
}
exports.goto = goto;
/**
 * Take a screenshot
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagescreenshotoptions
 * @param  {puppeteer.Page}              page   Current Page
 * @param  {puppeteer.ScreenshotOptions} option Screenshot Option
 * @return {Promise<string|Buffer>}             return image buffer or base64 string
 */
function screenShot(page, option) {
    return page.screenshot(Object.assign({ fullPage: true, quality: 80, type: 'jpeg' }, option));
}
exports.screenShot = screenShot;
