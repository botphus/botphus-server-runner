"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const CONST = require("../common/const");
const common_1 = require("../../source/types/common");
const common_2 = require("../../source/lib/common");
const source_1 = require("../../source/");
const botphusCore = new source_1.default({
    cachePath: CONST.CACHE_PATH
});
function default_1() {
    describe('Task#startTask', function () {
        this.timeout(20000);
        it('startTask with fullList', () => {
            let curOrder = 0;
            return botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_FULL_NAME), CONST.NORMAL_PAGE_PATH, {
                mysqlOption: CONST.MYSQL_CONFIG,
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION,
                redisOption: CONST.REDIS_CONFIG,
            })
                .then((event) => {
                return new Promise((resolve, reject) => {
                    event.on('message', ([error, messageData]) => {
                        // If process has error message
                        if (error) {
                            return assert(!error.stack);
                        }
                        assert(/^\d{13}$/.test(messageData.sendTime.toString()));
                        // Task start
                        if (messageData.type === common_1.MessageType.TASK_START) {
                            assert(messageData.index === 'start');
                        }
                        // Task unit start & end
                        if (messageData.type === common_1.MessageType.TASK_UNIT_EXEC_START) {
                            curOrder++;
                        }
                        if (messageData.type === common_1.MessageType.TASK_UNIT_EXEC_START || messageData.type === common_1.MessageType.TASK_UNIT_EXEC_END) {
                            assert(/^(\d+-)*\d+$/.test(messageData.index));
                            assert(messageData.order === curOrder);
                        }
                        if (messageData.type === common_1.MessageType.TASK_UNIT_EXEC_DATA_RECEIVE) {
                            assert(messageData.data);
                        }
                        // Task End
                        if (messageData.type === common_1.MessageType.TASK_END) {
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
        it('startTask with excludeOption', () => {
            const excludeOption = {
                0: true,
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true
            };
            return botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_FULL_NAME), '', {
                excludeOption,
                puppeteerLaunchOption: CONST.PUPPETEER_LAUNCH_OPTION
            })
                .then((event) => {
                return new Promise((resolve, reject) => {
                    event.on('message', ([error, messageData]) => {
                        // If process has error message
                        if (error) {
                            return assert(!error.stack);
                        }
                        // Task End
                        if (messageData.type === common_1.MessageType.TASK_END) {
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
            return botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_REACT_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((event) => {
                return new Promise((resolve, reject) => {
                    event.on('message', ([error, messageData]) => {
                        // If process has error message
                        if (error) {
                            return assert(!error.stack);
                        }
                        // Task End
                        if (messageData.type === common_1.MessageType.TASK_END) {
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
            return botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_UNION_BLOCK_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((event) => {
                return new Promise((resolve, reject) => {
                    event.on('message', ([error, messageData]) => {
                        // If process has error message
                        if (error) {
                            assert(error.type === common_1.MessageType.UNIT_RULE_EXEC_ERROR);
                            assert(error.index === 'union-error');
                            return;
                        }
                        // Task End
                        if (messageData.type === common_1.MessageType.TASK_END) {
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
            return botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_UNION_NON_BLOCK_NAME), CONST.REACT_PAGE_PATH, {
                puppeteerLaunchOption: CONST.PUPPETEER_REACT_LAUNCH_OPTION,
                startPageOption: {
                    waitUntil: 'networkidle0'
                }
            })
                .then((event) => {
                return new Promise((resolve, reject) => {
                    event.on('message', ([error, messageData]) => {
                        // If process has error message
                        if (error) {
                            // Check error message data
                            assert(error.type === common_1.MessageType.UNIT_RULE_EXEC_SKIP_ERROR);
                            assert(error.index === 'union-error');
                            return;
                        }
                        // Task End
                        if (messageData.type === common_1.MessageType.TASK_END) {
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
            botphusCore.startTask(common_2.getTaskNoByTaskName(CONST.TASK_FULL_NAME) + '1', '')
                .then(() => {
                done(new Error('Invalid expectation'));
            })
                .catch(() => done());
        });
    });
}
exports.default = default_1;
