"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const dom_1 = require("./dom");
const event_1 = require("./event");
const page_1 = require("./page");
const react_dom_1 = require("./react_dom");
const time_1 = require("./time");
function default_1() {
    describe('Unit', function () {
        this.timeout(10000);
        describe('Unit#Dom', () => {
            dom_1.default();
            react_dom_1.default();
        });
        event_1.default();
        time_1.default();
        page_1.default();
        data_1.default();
    });
}
exports.default = default_1;
