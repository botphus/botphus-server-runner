import * as mysql from 'mysql';
import {createHash} from '../common';

export const mysqlConnectionCache: {
    [propName: string]: mysql.Connection
} = {};

/**
 * Create mysql connection
 * @param  {mysql.ConnectionConfig} config Connection Config
 * @return {string}                        Connection No
 */
export function createMysqlConnection(config: mysql.ConnectionConfig): string {
    const connectionNo: string = createHash(JSON.stringify(config));
    if (mysqlConnectionCache[connectionNo]) {
        return connectionNo;
    }
    mysqlConnectionCache[connectionNo] = mysql.createConnection(config);
    return connectionNo;
}
