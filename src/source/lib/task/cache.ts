import {TaskRuleTypeItem} from '@botphus/rule';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import {js} from 'js-beautify';

import {MessageType} from '../../types/common';

import {createErrorMessage} from '../common';
import {template} from '../handlebars';

import {BOTPHUS_LIB_PATH} from '../../const';

/**
 * Get cache by file path
 * @param  {string}            cacheFilePath Cache File Path
 * @return {Promise<fs.Stats>}               Promise, if existed, return file stats
 */
export function getCache(cacheFilePath: string): Promise<fs.Stats> {
    // Check if cache file exist
    return new Promise((resolve) => {
        fs.stat(cacheFilePath, (err, stats) => {
            // if inexistence, continue with empty stats
            if (err) {
                return resolve();
            }
            // else continue with stats
            return resolve(stats);
        });
    });
}

/**
 * check if cache file exist
 * @param  {string}          cacheFilePath Cache File Path
 * @param  {string}          taskNo        Task No
 * @param  {number}          mtime         Modify Time, a 13 digit Unix Timestamp
 * @return {Promise<string>}               Promise, if existed, return taskNo
 */
export function checkCache(cacheFilePath: string, taskNo: string, mtime: number): Promise<string> {
    return getCache(cacheFilePath)
    // check file mtime
    .then((stats) => {
        // check if stats inexistence, continue with empty
        if (!stats) {
            return '';
        }
        // check file mtime is later or equal than mtime, continue with taskNo
        if (new Date(stats.mtime).getTime() >= mtime) {
            return taskNo;
        }
    });
}

/**
 * Create a cache file
 * @param  {string}          cacheFilePath Cache File Path
 * @param  {string}          taskNo        Task No
 * @param  {TaskRuleTypeItem[]}  taskRules     Task Rules
 * @return {Promise<string>}               Promise, if success, return taskNo;
 */
export function createCache(cacheFilePath: string, taskNo: string, taskRules: TaskRuleTypeItem[]): Promise<string> {
    return template()
        .then((templateFunc) => {
            const content = templateFunc({
                libPath: BOTPHUS_LIB_PATH.replace(/\\/g, '\\\\'),
                taskRules
            });
            return fse.outputFile(cacheFilePath, js(content));
        })
        .then(() => taskNo)
        // Unreachable code in test
        .catch(/* istanbul ignore next */(err) => {
            /* istanbul ignore next */
            return Promise.reject(createErrorMessage(err, MessageType.TASK_RULES_RENDER_ERROR));
        });
}
