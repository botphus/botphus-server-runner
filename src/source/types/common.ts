/**
 * Message type list
 */
export enum MessageType {
    // Task Rule message
    TASK_RULES_VALID_ERROR = 'TASK_RULES_VALID_ERROR', // When valid task rules error
    TASK_RULES_RENDER_ERROR = 'TASK_RULES_RENDER_ERROR', // When task rules cache render error
    TASK_RULES_CACHE_ERROR = 'TASK_RULES_CACHE_ERROR', // When run with task rule cache error
    // Unit Rule message
    UNIT_RULE_EXEC_ERROR = 'UNIT_RULE_EXEC_ERROR', // When unit rule exec failed
    UNIT_RULE_ASSERT_ERROR = 'UNIT_RULE_ASSERT_ERROR', // When assert unit rule's result error
    // Puppter error
    PUPPTER_INIT_ERROR = 'PUPPTER_INIT_ERROR', // When puppter init failed
    // Task message
    TASK_START = 'TASK_START', // When start task
    TASK_END = 'TASK_END', // When end task
    TASK_UNIT_EXEC_START = 'TASK_UNIT_EXEC_START', // When start task unit
    TASK_UNIT_EXEC_DATA_RECEIVE = 'TASK_UNIT_EXEC_DATA_RECEIVE', // When receive task unit data
    TASK_UNIT_EXEC_END = 'TASK_UNIT_EXEC_END', // When end task unit
}
