"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const common_1 = require("../common");
exports.mysqlConnectionCache = {};
/**
 * Create mysql connection
 * @param  {mysql.ConnectionConfig} config Connection Config
 * @return {string}                        Connection No
 */
function createMysqlConnection(config) {
    const connectionNo = common_1.createHash(JSON.stringify(config));
    if (exports.mysqlConnectionCache[connectionNo]) {
        return connectionNo;
    }
    exports.mysqlConnectionCache[connectionNo] = mysql.createConnection(config);
    return connectionNo;
}
exports.createMysqlConnection = createMysqlConnection;
