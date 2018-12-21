import {IProcessPoolWorkData} from '../../interfaces/process_pool';

// Handle message linsten
process.on('message', (msg: IProcessPoolWorkData) => {
    switch (msg.workType) {
        case 'runTask': // Check task
            break;
    }
});
