import * as puppeteer from 'puppeteer';

/**
 * Reload Page
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagereloadoptions
 * @param  {puppeteer.Page}              page Current Page
 * @return {Promise<puppeteer.Response>}      Page Response
 */
export function reload(page: puppeteer.Page): Promise<puppeteer.Response> {
    return page.reload({
        waitUntil: 'domcontentloaded'
    });
}

/**
 * Set cookies
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagesetcookiecookies
 * @param  {puppeteer.Page}        page    Current Page
 * @param  {puppeteer.SetCookie[]} cookies Cookie List
 * @return {Promise<void>}                 Nothing will return
 */
export function setCookie(page: puppeteer.Page, cookies: puppeteer.SetCookie[]): Promise<void> {
    return page.setCookie(...cookies);
}

/**
 * Get cookies
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagecookiesurls
 * @param  {puppeteer.Page}              page Current Page
 * @param  {string[]}                    urls Cookie Urls, If no URLs are specified, this method returns cookies for the current page URL.
 * @return {Promise<puppeteer.Cookie[]>}      Cookie list
 */
export function getCookie(page: puppeteer.Page, urls?: string[]): Promise<puppeteer.Cookie[]> {
    return page.cookies(...urls);
}

/**
 * Delete cookies
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagedeletecookiecookies
 * @param  {puppeteer.Page}           page    Current Page
 * @param  {puppeteer.DeleteCookie[]} cookies Cookie List
 * @return {Promise<void>}                    Nothing will return
 */
export function deleteCookie(page: puppeteer.Page, cookies: puppeteer.DeleteCookie[]): Promise<void> {
    return page.deleteCookie(...cookies);
}

/**
 * Redirect to target url
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagegotourl-options
 * @param  {puppeteer.Page}              page   Current Page
 * @param  {string}                      url    target url
 * @param  {puppeteer.NavigationOptions} option page action
 * @return {Promise<puppeteer.Response>}        Page Response
 */
export function goto(page: puppeteer.Page, url: string, option: puppeteer.NavigationOptions = {
    waitUntil: 'domcontentloaded'
}): Promise<puppeteer.Response> {
    return page.goto(url, option);
}

/**
 * Take a screenshot
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagescreenshotoptions
 * @param  {puppeteer.Page}              page   Current Page
 * @param  {puppeteer.ScreenshotOptions} option Screenshot Option
 * @return {Promise<string|Buffer>}             return image buffer or base64 string
 */
export function screenShot(page: puppeteer.Page, option?: puppeteer.ScreenshotOptions): Promise<string|Buffer> {
    return page.screenshot({
        fullPage: true,
        quality: 80,
        type: 'jpeg',
        ...option
    });
}
