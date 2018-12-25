"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const remove_1 = require("./remove");
const start_1 = require("./start");
function default_1() {
    describe('Task', () => {
        create_1.default();
        start_1.default();
        remove_1.default();
    });
}
exports.default = default_1;
