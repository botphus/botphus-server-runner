"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const path = require("path");
// Botphus lib path
exports.BOTPHUS_LIB_PATH = path.join(__dirname, '../../');
// Botphus temporary dir
exports.BOTPHUS_TMP_PATH = path.join(os.tmpdir(), '/botphus/');
// Process pool size, default is CPU core number, it will be change by process env: BOTPHUS_CORE_NUMBER
// All botphus instance will use same process pool
exports.PROCESS_POOL_SIZE = parseInt(process.env.BOTPHUS_CORE_NUMBER, 10) || os.cpus().length;
