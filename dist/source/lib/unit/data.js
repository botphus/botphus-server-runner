"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("../connection/mysql");
const redis_1 = require("../connection/redis");
/**
 * Exec sql
 * @reference https://github.com/mysqljs/mysql
 * @param  {string}       connectionNo Mysql Connection No
 * @param  {string}       sqlQuery     Mysql Query String
 * @return {Promise<any>}              Promise with return data
 */
function execSql(connectionNo, sqlQuery) {
    return new Promise((resolve, reject) => {
        if (!mysql_1.mysqlConnectionCache[connectionNo]) {
            return reject(new Error(`MySql connection No "${connectionNo}" is not exist`));
        }
        mysql_1.mysqlConnectionCache[connectionNo].query(sqlQuery, (error, results) => {
            // Unreachable code in test
            /* istanbul ignore next */
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}
exports.execSql = execSql;
/**
 * Exec redis
 * @reference https://github.com/luin/ioredis#transaction
 * @param  {string}       connectionNo Redis Connection No
 * @param  {string[][]}   commands     Redis Commands
 * @return {Promise<any>}              Promise with return data
 */
function execRedis(connectionNo, commands) {
    if (!redis_1.redisConnectionCache[connectionNo]) {
        return Promise.reject(new Error(`Redis connection No "${connectionNo}" is not exist`));
    }
    return redis_1.redisConnectionCache[connectionNo].multi(commands).exec();
}
exports.execRedis = execRedis;
