import * as assert from 'assert';

import * as CONST from '../common/const';

import {ITaskExcludeUnit} from '../../source/interfaces/task';
import {MessageType} from '../../source/types/common';
import {TaskMessage} from '../../source/types/task';

import {getTaskNoByTaskName} from '../../source/lib/common';

import BotphusServerRunner from '../../source/';
const serverRunner = new BotphusServerRunner({
    cachePath: CONST.CACHE_PATH
});

export default function() {
    describe('Task#startTask', function() {
        this.timeout(20000);
        it('startTask with fullList', () => {
            let curOrder = 0;
            return serverRunner.startTask(getTaskNoByTaskName(CONST.TASK_FULL_NAME), CONST.NORMAL_PAGE_PATH, {
                mysqlOption: CONST.MYSQL_CONFIG,
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION,
                redisOption: CONST.REDIS_CONFIG,
            })
                .then((event) => {
                    return new Promise((resolve, reject) => {
                        event.on('message', ([error, messageData]: TaskMessage) => {
                            // If process has error message
                            if (error) {
                                return assert(!error.stack);
                            }
                            assert(typeof messageData.context === 'object');
                            assert.deepStrictEqual(messageData.context, {});
                            assert(/^\d{13}$/.test(messageData.sendTime.toString()));
                            // Task start
                            if (messageData.type === MessageType.TASK_START) {
                                assert(messageData.index === 'start');
                            }
                            // Task unit start & end
                            if (messageData.type === MessageType.TASK_UNIT_EXEC_START) {
                                curOrder++;
                            }
                            if (messageData.type === MessageType.TASK_UNIT_EXEC_START || messageData.type === MessageType.TASK_UNIT_EXEC_END) {
                                assert(/^(\d+-)*\d+$/.test(messageData.index));
                                assert(messageData.order === curOrder);
                            }
                            if (messageData.type === MessageType.TASK_UNIT_EXEC_DATA_RECEIVE) {
                                assert(messageData.data);
                            }
                            // Task End
                            if (messageData.type === MessageType.TASK_END) {
                                assert(messageData.index === 'end');
                                assert(messageData.totalCase === CONST.TASK_FULL_LIST_CASE_COUNT);
                            }
                        });
                        // Listen exit event
                        event.on('exit', (code) => {
                            if (code === 0) {
                                return resolve();
                            }
                            return reject(new Error('Error exit'));
                        });
                    });
                });
        });
        it('startTask with context list', () => {
            let curOrder = 0;
            return serverRunner.startTask(getTaskNoByTaskName(CONST.TASK_CONTEXT_NAME), CONST.NORMAL_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION,
            })
                .then((event) => {
                    return new Promise((resolve, reject) => {
                        event.on('message', ([error, messageData]: TaskMessage) => {
                            // If process has error message
                            if (error) {
                                return assert(!error.stack);
                            }
                            assert(typeof messageData.context === 'object');
                            if (messageData.index === '0' && messageData.type === MessageType.TASK_START) {
                                assert.deepStrictEqual(messageData.context, {});
                            }
                            if (messageData.index === '1') {
                                assert.notDeepStrictEqual(messageData.context, {});
                            }
                            assert(/^\d{13}$/.test(messageData.sendTime.toString()));
                            // Task start
                            if (messageData.type === MessageType.TASK_START) {
                                assert(messageData.index === 'start');
                            }
                            // Task unit start & end
                            if (messageData.type === MessageType.TASK_UNIT_EXEC_START) {
                                curOrder++;
                            }
                            if (messageData.type === MessageType.TASK_UNIT_EXEC_START || messageData.type === MessageType.TASK_UNIT_EXEC_END) {
                                assert(/^(\d+-)*\d+$/.test(messageData.index));
                                assert(messageData.order === curOrder);
                            }
                            if (messageData.type === MessageType.TASK_UNIT_EXEC_DATA_RECEIVE) {
                                assert(messageData.data);
                            }
                            // Task End
                            if (messageData.type === MessageType.TASK_END) {
                                assert(messageData.index === 'end');
                                assert(messageData.totalCase === CONST.TASK_CONTEXT_CASE_COUNT);
                            }
                        });
                        // Listen exit event
                        event.on('exit', (code) => {
                            if (code === 0) {
                                return resolve();
                            }
                            return reject(new Error('Error exit'));
                        });
                    });
                });
        });
        it('startTask with excludeOption', () => {
            const excludeOption: ITaskExcludeUnit = {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true
            };
            return serverRunner.startTask(getTaskNoByTaskName(CONST.TASK_FULL_NAME), '', {
                excludeOption,
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION
            })
                .then((event) => {
                    return new Promise((resolve, reject) => {
                        event.on('message', ([error, messageData]: TaskMessage) => {
                            // If process has error message
                            if (error) {
                                return assert(!error.stack);
                            }
                            // Task End
                            if (messageData.type === MessageType.TASK_END) {
                                assert(messageData.index === 'end');
                                assert(messageData.totalCase === (CONST.TASK_FULL_LIST_CASE_COUNT - Object.keys(excludeOption).length));
                            }
                        });
                        // Listen exit event
                        event.on('exit', (code) => {
                            if (code === 0) {
                                return resolve();
                            }
                            return reject(new Error('Error exit'));
                        });
                    });
                });
        });
        it('startTask with react rules', () => {
            return serverRunner.startTask(getTaskNoByTaskName(CONST.TASK_REACT_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((event) => {
                    return new Promise((resolve, reject) => {
                        event.on('message', ([error, messageData]: TaskMessage) => {
                            // If process has error message
                            if (error) {
                                return assert(!error.stack);
                            }
                            // Task End
                            if (messageData.type === MessageType.TASK_END) {
                                assert(messageData.index === 'end');
                                assert(messageData.totalCase === (CONST.TASK_REACT_LIST_CASE_COUNT));
                            }
                        });
                        // Listen exit event
                        event.on('exit', (code) => {
                            if (code === 0) {
                                return resolve();
                            }
                            return reject(new Error('Error exit'));
                        });
                    });
                });
        });
        it('startTask with union block rules', () => {
            return serverRunner.startTask(getTaskNoByTaskName(CONST.TASK_UNION_BLOCK_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((event) => {
                    return new Promise((resolve, reject) => {
                        event.on('message', ([error, messageData]: TaskMessage) => {
                            // If process has error message
                            if (error) {
                                assert(error.type === MessageType.UNIT_RULE_EXEC_ERROR);
                                assert(error.index === 'union-error');
                                return;
                            }
                            // Task End
                            if (messageData.type === MessageType.TASK_END) {
                                return assert(!'Invalid expectation');
                            }
                        });
                        // Listen exit event
                        event.on('exit', (code) => {
                            if (code === 0) {
                                return reject(new Error('Error exit'));
                            }
                            return resolve();
                        });
                    });
                });
        });
        it('startTask with union non-block rules', () => {
            return serverRunner.startTask(getTaskNoByTaskName(CONST.TASK_UNION_NON_BLOCK_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((event) => {
                    return new Promise((resolve, reject) => {
                        event.on('message', ([error, messageData]: TaskMessage) => {
                            // If process has error message
                            if (error) {
                                // Check error message data
                                assert(error.type === MessageType.UNIT_RULE_EXEC_SKIP_ERROR);
                                assert(error.index === 'union-error');
                                return;
                            }
                            // Task End
                            if (messageData.type === MessageType.TASK_END) {
                                assert(messageData.index === 'end');
                                assert(messageData.totalCase === (CONST.TASK_UNION_NON_BLOCK_CASE_COUNT));
                            }
                        });
                        // Listen exit event
                        event.on('exit', (code) => {
                            if (code === 0) {
                                return resolve();
                            }
                            return reject(new Error('Error exit'));
                        });
                    });
                });
        });
        it('startTask with wrong number', (done) => {
            serverRunner.startTask(getTaskNoByTaskName(CONST.TASK_FULL_NAME) + '1', '')
                .then(() => {
                    done(new Error('Invalid expectation'));
                })
                .catch(() => done());
        });
    });
}
