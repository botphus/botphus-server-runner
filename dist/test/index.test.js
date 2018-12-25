"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const method_1 = require("./method/");
const task_1 = require("./task/");
const unit_1 = require("./unit/");
const source_1 = require("../source/");
describe('Parse', () => {
    // public method
    method_1.default();
    // Test Unit
    unit_1.default();
    // Test Task
    task_1.default();
    after('Stop runner', function () {
        this.timeout(10000);
        return source_1.destoryPool();
    });
});
