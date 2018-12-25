"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
// Init pool
var dispatcher_1 = require("./dispatcher");
exports.addWork = dispatcher_1.addWork;
exports.destory = dispatcher_1.destory;
exports.register = dispatcher_1.register;
/**
 * Create process pool event
 * @return {IProcessPoolWorkEvent} Process pool work
 */
function createEvent() {
    return new EventEmitter();
}
exports.createEvent = createEvent;
