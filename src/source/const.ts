import * as os from 'os';
import * as path from 'path';

// Botphus lib path
export const BOTPHUS_LIB_PATH = path.join(__dirname, '../../');
// Botphus temporary dir
export const BOTPHUS_TMP_PATH = path.join(os.tmpdir(), '/botphus/');
// CPU core number
export const CPU_CORE_NUMBER = os.cpus().length;
