"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const common_1 = require("../../source/types/common");
const common_2 = require("../../source/lib/common");
function default_1() {
    describe('Public Method', () => {
        it('Function#getTaskNoByTaskName', () => {
            const tokenNo = common_2.getTaskNoByTaskName('test name');
            assert(tokenNo);
            assert(/[\da-z]{32}/.test(tokenNo));
        });
        it('Function#createErrorMessage', () => {
            const err = common_2.createErrorMessage(new Error('test message'), common_1.MessageType.TASK_RULES_CACHE_ERROR);
            assert(err instanceof Error);
            assert(err.message === 'test message');
            assert(err.type === common_1.MessageType.TASK_RULES_CACHE_ERROR);
        });
        it('Class#ErrorMessage', () => {
            const err = new common_2.ErrorMessage('test message', common_1.MessageType.TASK_RULES_CACHE_ERROR);
            assert(err instanceof Error);
            assert(err.message === 'test message');
            assert(err.type === common_1.MessageType.TASK_RULES_CACHE_ERROR);
        });
    });
}
exports.default = default_1;
