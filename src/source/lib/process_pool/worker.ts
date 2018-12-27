import * as requireReload from 'require-reload';

const reload = requireReload(require);

import {IProcessPoolWorkData} from '../../interfaces/process_pool';
import {MessageType} from '../../types/common';

import {createErrorMessage} from '../common';
import {sendTaskMsg} from '../task/';

// Handle message linsten
process.on('message', (msg: IProcessPoolWorkData) => {
    switch (msg.workType) {
        case 'runTask': // Check run task
            try {
                // reload module & run
                reload(msg.cacheFilePath)(msg);
            } catch (e) {
                sendTaskMsg(createErrorMessage(e, MessageType.INIT_ERROR));
            }
            break;
    }
});
