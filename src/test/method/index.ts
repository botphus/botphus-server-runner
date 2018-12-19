import * as assert from 'power-assert';

import {MessageType} from '../../source/types/common';

import {createErrorMessage, ErrorMessage, getTaskNoByTaskName} from '../../source/lib/common';

export default function() {
    describe('Public Method', () => {
        it('Function#getTaskNoByTaskName', () => {
            const tokenNo = getTaskNoByTaskName('test name');
            assert(tokenNo);
            assert(/[\da-z]{32}/.test(tokenNo));
        });
        it('Function#createErrorMessage', () => {
            const err = createErrorMessage(new Error('test message'), MessageType.TASK_RULES_CACHE_ERROR);
            assert(err instanceof Error);
            assert(err.message === 'test message');
            assert(err.type === MessageType.TASK_RULES_CACHE_ERROR);
        });
        it('Class#ErrorMessage', () => {
            const err = new ErrorMessage('test message', MessageType.TASK_RULES_CACHE_ERROR);
            assert(err instanceof Error);
            assert(err.message === 'test message');
            assert(err.type === MessageType.TASK_RULES_CACHE_ERROR);
        });
    });
}
