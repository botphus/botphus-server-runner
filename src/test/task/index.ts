import processPool from '../process_pool';
import createTask from './create';
import removeTask from './remove';
import startTask from './start';

export default function() {
    describe('Task', () => {
        createTask();
        startTask();
        // Process pool
        processPool();
        removeTask();
    });
}
