import * as assert from 'assert';
import * as fs from 'fs';
import {join} from 'path';
import * as recursive from 'recursive-readdir';

import * as CONST from '../common/const';

import {getTaskNoByTaskName} from '../../source/lib/common';

import BotphusCore from '../../source/';
const botphusCore = new BotphusCore({
    cachePath: CONST.CACHE_PATH
});

export default function() {
    describe('Task#removeTask', () => {
        it('removeTask', (done) => {
            const taskName = 'test task';
            botphusCore.removeTask(getTaskNoByTaskName(taskName))
                .then(() => {
                    fs.readFileSync(join(CONST.CACHE_PATH, '/task-cache/', getTaskNoByTaskName(taskName) + '.js'));
                    done(new Error('Invalid expectation'));
                })
                .catch(() => done());
        });
        it('clearTask', () => {
            return botphusCore.clearTask()
                .then(() => {
                    return new Promise((resolve, reject) => {
                        recursive(CONST.CACHE_PATH, (err, files) => {
                            if (err) {
                                return reject(err);
                            }
                            assert(files.length === 0);
                            resolve();
                        });
                    });
                });
        });
    });
}
