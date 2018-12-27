import * as EventEmitter from 'events';

import {IProcessPoolWorkEvent} from '../../interfaces/process_pool';

// Init pool
export {addWork, destory, register} from './dispatcher';

/**
 * Create process pool event
 * @return {IProcessPoolWorkEvent} Process pool work
 */
export function createEvent<T>(): IProcessPoolWorkEvent<T> {
    return new EventEmitter();
}
