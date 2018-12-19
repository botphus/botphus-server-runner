import {mysqlConnectionCache} from '../connection/mysql';
import {redisConnectionCache} from '../connection/redis';

/**
 * Exec sql
 * @reference https://github.com/mysqljs/mysql
 * @param  {string}       connectionNo Mysql Connection No
 * @param  {string}       sqlQuery     Mysql Query String
 * @return {Promise<any>}              Promise with return data
 */
export function execSql(connectionNo: string, sqlQuery: string): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!mysqlConnectionCache[connectionNo]) {
            return reject(new Error(`MySql connection No "${connectionNo}" is not exist`));
        }
        mysqlConnectionCache[connectionNo].query(sqlQuery, (error, results) => {
            // Unreachable code in test
            /* istanbul ignore next */
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

/**
 * Exec redis
 * @reference https://github.com/luin/ioredis#transaction
 * @param  {string}       connectionNo Redis Connection No
 * @param  {string[][]}   commands     Redis Commands
 * @return {Promise<any>}              Promise with return data
 */
export function execRedis(connectionNo: string, commands: string[][]): Promise<any> {
    if (!redisConnectionCache[connectionNo]) {
        return Promise.reject(new Error(`Redis connection No "${connectionNo}" is not exist`));
    }
    return redisConnectionCache[connectionNo].multi(commands).exec();
}
