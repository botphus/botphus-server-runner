"use strict";
/* Tips:
 * due to this issue https://github.com/GoogleChrome/puppeteer/issues/1054
 * the istanbul (coverage reporter) will cause error inside page.evaluate throwing exception.
 * the following function's "istanbul ignore next" comment allows istanbul to succeed
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Click with selector
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageclickselector-options
 * @param  {puppeteer.Page} page       Current Page
 * @param  {string}         selector   Selector
 * @param  {boolean}        humanClick Simulate human click or not
 * @return {Promise<void>}             Nothing will return
 */
function click(page, selector, humanClick = true) {
    if (humanClick) {
        return page.click(selector);
    }
    // Don't use page click, it will cause wrong click when the selector is covered by other dom
    /* istanbul ignore next */
    return page.$eval(selector, (el) => el.click());
}
exports.click = click;
/**
 * Input some text
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-keyboardtypetext-options
 * @param  {puppeteer.Page} page     Current Page
 * @param  {string}         selector Selector
 * @param  {string}         text     Text String
 * @return {Promise<void>}           Nothing will return
 */
function keyboard(page, selector, text) {
    return page.type(selector, text);
}
exports.keyboard = keyboard;
/**
 * Get selector's attribute value
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageevalselector-pagefunction-args-1
 * @param  {puppeteer.Page}  page     Current Page
 * @param  {string}          selector Selector
 * @param  {string}          attrName Attribute Name
 * @return {Promise<any>}             Return attribute value
 */
function getAttr(page, selector, attrName) {
    /* istanbul ignore next */
    return page.$eval(selector, (el, evalAttrName) => el[evalAttrName], attrName);
}
exports.getAttr = getAttr;
/**
 * Set selector's attribute value
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageevalselector-pagefunction-args-1
 * @param  {puppeteer.Page} page      Current Page
 * @param  {string}         selector  Selector
 * @param  {string}         attrName  Attribute Name
 * @param  {string}         attrValue Attribute Value
 * @return {Promise<void>}            Nothing will return
 */
function setAttr(page, selector, attrName, attrValue) {
    /* istanbul ignore next */
    return page.$eval(selector, (el, evalAttrName, evalAttrValue) => {
        el[evalAttrName] = evalAttrValue;
    }, attrName, attrValue);
}
exports.setAttr = setAttr;
/**
 * Get selector's HTML content
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageevalselector-pagefunction-args-1
 * @param  {puppeteer.Page}  page     Current Page
 * @param  {string}          selector Selector
 * @return {Promise<string>}          Return HTML string
 */
function getHtml(page, selector) {
    /* istanbul ignore next */
    return page.$eval(selector, (el) => el.innerHTML);
}
exports.getHtml = getHtml;
/**
 * Get selector's text content
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pageevalselector-pagefunction-args-1
 * @param  {puppeteer.Page}  page     Current Page
 * @param  {string}          selector Selector
 * @return {Promise<string>}          Return text string
 */
function getText(page, selector) {
    /* istanbul ignore next */
    return page.$eval(selector, (el) => el.textContent);
}
exports.getText = getText;
/**
 * Set file input's "files" value
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-elementhandleuploadfilefilepaths
 * @param  {puppeteer.Page} page      Current Page
 * @param  {string}         selector  Selector
 * @param  {string[]}       filesPath File path list
 * @return {Promise<void>}            Nothing will return
 */
function setInputFiles(page, selector, filesPath) {
    return page.$(selector)
        .then((input) => {
        return input.uploadFile(...filesPath);
    });
}
exports.setInputFiles = setInputFiles;
