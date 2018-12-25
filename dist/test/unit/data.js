"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const mysql_1 = require("../../source/lib/connection/mysql");
const redis_1 = require("../../source/lib/connection/redis");
const unit_1 = require("../../source/lib/unit/");
const CONST = require("../common/const");
function default_1() {
    describe('Unit#Data', () => {
        describe('MySql', () => {
            let connectionNo = '';
            describe('Connection#Mysql', () => {
                it('Create', () => {
                    connectionNo = mysql_1.createMysqlConnection(CONST.MYSQL_CONFIG);
                });
                it('Create with same config', () => {
                    assert(connectionNo === mysql_1.createMysqlConnection(CONST.MYSQL_CONFIG));
                });
            });
            describe('Data#execSql', () => {
                it('Create Table', (done) => {
                    unit_1.default.data.execSql(connectionNo, CONST.MYSQL_CREATE_TABLE)
                        .then(() => done())
                        .catch(done);
                });
                it('Inset Data', (done) => {
                    unit_1.default.data.execSql(connectionNo, CONST.MYSQL_INSERT_DATA)
                        .then(() => {
                        return unit_1.default.data.execSql(connectionNo, CONST.MYSQL_SELECT_DATA);
                    })
                        .then((data) => {
                        assert(data.length === 1);
                        assert(data[0].id === 1);
                        assert(data[0][CONST.MYSQL_FIELD_NAME] === CONST.MYSQL_FIELD_VALUE);
                        done();
                    })
                        .catch(done);
                });
                it('Drop Table', (done) => {
                    unit_1.default.data.execSql(connectionNo, CONST.MYSQL_DROP_TABLE)
                        .then(() => {
                        return unit_1.default.data.execSql(connectionNo, `SHOW TABLES LIKE "${CONST.MYSQL_TABLE_NAME}"`);
                    })
                        .then((data) => {
                        assert(data.length === 0);
                        done();
                    })
                        .catch(done);
                });
                it('Exec with wrong connectionNo', (done) => {
                    unit_1.default.data.execSql(connectionNo + '1', CONST.MYSQL_CREATE_TABLE)
                        .then(() => done(new Error('Invalid expectation')))
                        .catch(() => done());
                });
                after(() => {
                    mysql_1.mysqlConnectionCache[connectionNo].end();
                });
            });
        });
        describe('Redis', () => {
            let connectionNo = '';
            describe('Connection#Redis', () => {
                it('Create', () => {
                    connectionNo = redis_1.createRedisConnection(CONST.REDIS_CONFIG);
                });
                it('Create with same config', () => {
                    assert(connectionNo === redis_1.createRedisConnection(CONST.REDIS_CONFIG));
                });
            });
            describe('Data#execRedis', () => {
                it('Set key', (done) => {
                    unit_1.default.data.execRedis(connectionNo, [['set', CONST.REDIS_KEY_NAME, CONST.REDIS_KEY_VALUE]])
                        .then(() => done())
                        .catch(done);
                });
                it('Get key', (done) => {
                    unit_1.default.data.execRedis(connectionNo, [['get', CONST.REDIS_KEY_NAME]])
                        .then((datas) => {
                        assert(datas.length === 1);
                        assert(datas[0][1] === CONST.REDIS_KEY_VALUE);
                        done();
                    })
                        .catch(done);
                });
                it('Del key', (done) => {
                    unit_1.default.data.execRedis(connectionNo, [['del', CONST.REDIS_KEY_NAME]])
                        .then(() => done())
                        .catch(done);
                });
                it('Exec with wrong connectionNo', (done) => {
                    unit_1.default.data.execRedis(connectionNo + '1', [['del', CONST.REDIS_KEY_NAME]])
                        .then(() => done(new Error('Invalid expectation')))
                        .catch(() => done());
                });
                after(() => {
                    redis_1.redisConnectionCache[connectionNo].quit();
                });
            });
        });
    });
}
exports.default = default_1;
