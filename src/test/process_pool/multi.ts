import * as assert from 'assert';

import * as CONST from '../common/const';

import {MessageType} from '../../source/types/common';
import {TaskMessage} from '../../source/types/task';

import BotphusServerRunner from '../../source/';
import {getTaskNoByTaskName} from '../../source/lib/common';

const serverRunner: BotphusServerRunner = new BotphusServerRunner({
    cachePath: CONST.CACHE_PATH
});

const serverRunner2: BotphusServerRunner = new BotphusServerRunner({
    cachePath: CONST.CACHE_PATH
});

export default function() {
    describe('Process Pool#multi instance', function() {
        this.timeout(20000);
        it('startTask with two server runners', () => {
            // Runner end status
            let serverRunnerEnd: boolean = false;
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
                                serverRunnerEnd = true;
                                return resolve();
                            }
                            return reject(new Error('Error exit'));
                        });
                    });
                })
                .then(() => {
                    return serverRunner2.startTask(getTaskNoByTaskName(CONST.TASK_REACT_NAME), CONST.REACT_PAGE_PATH, {
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
                                        // Check previous runner's end status
                                        assert(serverRunnerEnd === true, 'Check server runner status');
                                        serverRunnerEnd = true;
                                        return resolve();
                                    }
                                    return reject(new Error('Error exit'));
                                });
                            });
                        });
                });
        });
    });
}
