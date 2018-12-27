/* Tips:
 * due to this issue https://github.com/GoogleChrome/puppeteer/issues/1054
 * the istanbul (coverage reporter) will cause error inside page.evaluate throwing exception.
 * the following function's "istanbul ignore next" comment allows istanbul to succeed
 */

import * as puppeteer from 'puppeteer';

/**
 * Click with selector
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageclickselector-options
 * @param  {puppeteer.Page} page       Current Page
 * @param  {string}         selector   Selector
 * @param  {boolean}        humanClick Simulate human click or not
 * @return {Promise<void>}             Nothing will return
 */
export function click(page: puppeteer.Page, selector: string, humanClick: boolean = true): Promise<void> {
    if (humanClick) {
        return page.click(selector);
    }
    // Don't use page click, it will cause wrong click when the selector is covered by other dom
    /* istanbul ignore next */
    return page.$eval(selector, (el: any) => el.click());
}

/**
 * Input some text
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-keyboardtypetext-options
 * @param  {puppeteer.Page} page     Current Page
 * @param  {string}         selector Selector
 * @param  {string}         text     Text String
 * @return {Promise<void>}           Nothing will return
 */
export function keyboard(page: puppeteer.Page, selector: string, text: string): Promise<void> {
    return page.type(selector, text);
}

/**
 * Get selector's attribute value
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageevalselector-pagefunction-args-1
 * @param  {puppeteer.Page}  page     Current Page
 * @param  {string}          selector Selector
 * @param  {string}          attrName Attribute Name
 * @return {Promise<any>}             Return attribute value
 */
export function getAttr(page: puppeteer.Page, selector: string, attrName: string): Promise<any> {
    /* istanbul ignore next */
    return page.$eval(selector, (el: any, evalAttrName) => el[evalAttrName], attrName);
}

/**
 * Set selector's attribute value
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageevalselector-pagefunction-args-1
 * @param  {puppeteer.Page} page      Current Page
 * @param  {string}         selector  Selector
 * @param  {string}         attrName  Attribute Name
 * @param  {string}         attrValue Attribute Value
 * @return {Promise<void>}            Nothing will return
 */
export function setAttr(page: puppeteer.Page, selector: string, attrName: string, attrValue: string): Promise<void> {
    /* istanbul ignore next */
    return page.$eval(selector, (el: any, evalAttrName, evalAttrValue) => {
        el[evalAttrName] = evalAttrValue;
    }, attrName, attrValue);
}

/**
 * Get selector's HTML content
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageevalselector-pagefunction-args-1
 * @param  {puppeteer.Page}  page     Current Page
 * @param  {string}          selector Selector
 * @return {Promise<string>}          Return HTML string
 */
export function getHtml(page: puppeteer.Page, selector: string): Promise<string> {
    /* istanbul ignore next */
    return page.$eval(selector, (el) => el.innerHTML);
}

/**
 * Get selector's text content
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageevalselector-pagefunction-args-1
 * @param  {puppeteer.Page}  page     Current Page
 * @param  {string}          selector Selector
 * @return {Promise<string>}          Return text string
 */
export function getText(page: puppeteer.Page, selector: string): Promise<string> {
    /* istanbul ignore next */
    return page.$eval(selector, (el) => el.textContent);
}

/**
 * Set file input's "files" value
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-elementhandleuploadfilefilepaths
 * @param  {puppeteer.Page} page      Current Page
 * @param  {string}         selector  Selector
 * @param  {string[]}       filesPath File path list
 * @return {Promise<void>}            Nothing will return
 */
export function setInputFiles(page: puppeteer.Page, selector: string, filesPath: string[]): Promise<void> {
    return page.$(selector)
        .then((input) => {
            return input.uploadFile(...filesPath);
        });
}
