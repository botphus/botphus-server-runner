"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Message type list
 */
var MessageType;
(function (MessageType) {
    // Task Rule message
    MessageType["TASK_RULES_VALID_ERROR"] = "TASK_RULES_VALID_ERROR";
    MessageType["TASK_RULES_RENDER_ERROR"] = "TASK_RULES_RENDER_ERROR";
    MessageType["TASK_RULES_CACHE_ERROR"] = "TASK_RULES_CACHE_ERROR";
    // Unit Rule message
    MessageType["UNIT_RULE_EXEC_ERROR"] = "UNIT_RULE_EXEC_ERROR";
    MessageType["UNIT_RULE_EXEC_SKIP_ERROR"] = "UNIT_RULE_EXEC_SKIP_ERROR";
    MessageType["UNIT_RULE_ASSERT_ERROR"] = "UNIT_RULE_ASSERT_ERROR";
    MessageType["INIT_ERROR"] = "INIT_ERROR";
    // Puppter error
    MessageType["PUPPTER_INIT_ERROR"] = "PUPPTER_INIT_ERROR";
    // Task message
    MessageType["TASK_START"] = "TASK_START";
    MessageType["TASK_END"] = "TASK_END";
    MessageType["TASK_UNIT_EXEC_START"] = "TASK_UNIT_EXEC_START";
    MessageType["TASK_UNIT_EXEC_DATA_RECEIVE"] = "TASK_UNIT_EXEC_DATA_RECEIVE";
    MessageType["TASK_UNIT_EXEC_END"] = "TASK_UNIT_EXEC_END";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
