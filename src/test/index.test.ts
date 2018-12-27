// Set BOTPHUS_CORE_NUMBER
process.env.BOTPHUS_CORE_NUMBER = '1';

import method from './method/';
import task from './task/';
import unit from './unit/';

import {destoryPool} from '../source/';

describe('Parse', () => {
    // public method
    method();
    // Test Unit
    unit();
    // Test Task
    task();
    after('Stop runner', function() {
        this.timeout(10000);
        return destoryPool();
    });
});
