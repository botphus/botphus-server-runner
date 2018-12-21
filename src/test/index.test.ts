// Reset mocha run
import * as CONST from './common/const';
// import method from './method/';
import task from './task/';
// import unit from './unit/';

import BotphusServerRunner from '../source/';
// Create process pool
const serverRunner: BotphusServerRunner = new BotphusServerRunner({
    cachePath: CONST.CACHE_PATH
});

describe('Parse', () => {
    // public method
    // method();
    // Test Unit
    // unit();
    // Test Task
    task();
    after('Stop runner', () => {
        return serverRunner.destory();
    });
});
