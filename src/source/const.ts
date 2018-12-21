import * as os from 'os';
import * as path from 'path';

// Botphus lib path
export const BOTPHUS_LIB_PATH = path.join(__dirname, '../../');
// Botphus temporary dir
export const BOTPHUS_TMP_PATH = path.join(os.tmpdir(), '/botphus/');
// Process pool size, default is CPU core number, it will be change by process env: BOTPHUS_CORE_NUMBER
// All botphus instance will use same process pool
export const PROCESS_POOL_SIZE = parseInt(process.env.BOTPHUS_CORE_NUMBER, 10) || os.cpus().length;
