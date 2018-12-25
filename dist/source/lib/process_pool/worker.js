"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireReload = require("require-reload");
const reload = requireReload(require);
const common_1 = require("../../types/common");
const common_2 = require("../common");
const task_1 = require("../task/");
// Handle message linsten
process.on('message', (msg) => {
    switch (msg.workType) {
        case 'runTask': // Check run task
            try {
                // reload module & run
                reload(msg.cacheFilePath)(msg);
            }
            catch (e) {
                task_1.sendTaskMsg(common_2.createErrorMessage(e, common_1.MessageType.INIT_ERROR));
            }
            break;
    }
});
