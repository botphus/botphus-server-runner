import * as assert from 'power-assert';

import {createMysqlConnection, mysqlConnectionCache} from '../../source/lib/connection/mysql';
import {createRedisConnection, redisConnectionCache} from '../../source/lib/connection/redis';
import botphusUnit from '../../source/lib/unit/';

import * as CONST from '../common/const';

export default function() {
    describe('Unit#Data', () => {
        describe('MySql', () => {
            let connectionNo: string = '';
            describe('Connection#Mysql', () => {
                it('Create', () => {
                    connectionNo = createMysqlConnection(CONST.MYSQL_CONFIG);
                });
                it('Create with same config', () => {
                    assert(connectionNo === createMysqlConnection(CONST.MYSQL_CONFIG));
                });
            });
            describe('Data#execSql', () => {
                it('Create Table', (done) => {
                    botphusUnit.data.execSql(connectionNo, CONST.MYSQL_CREATE_TABLE)
                        .then(() => done())
                        .catch(done);
                });
                it('Inset Data', (done) => {
                    botphusUnit.data.execSql(connectionNo, CONST.MYSQL_INSERT_DATA)
                        .then(() => {
                            return botphusUnit.data.execSql(connectionNo, CONST.MYSQL_SELECT_DATA);
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
                    botphusUnit.data.execSql(connectionNo, CONST.MYSQL_DROP_TABLE)
                        .then(() => {
                            return botphusUnit.data.execSql(connectionNo, `SHOW TABLES LIKE "${CONST.MYSQL_TABLE_NAME}"`);
                        })
                        .then((data) => {
                            assert(data.length === 0);
                            done();
                        })
                        .catch(done);
                });
                it('Exec with wrong connectionNo', (done) => {
                    botphusUnit.data.execSql(connectionNo + '1', CONST.MYSQL_CREATE_TABLE)
                        .then(() => done(new Error('Invalid expectation')))
                        .catch(() => done());
                });
                after(() => {
                    mysqlConnectionCache[connectionNo].end();
                });
            });
        });
        describe('Redis', () => {
            let connectionNo: string = '';
            describe('Connection#Redis', () => {
                it('Create', () => {
                    connectionNo = createRedisConnection(CONST.REDIS_CONFIG);
                });
                it('Create with same config', () => {
                    assert(connectionNo === createRedisConnection(CONST.REDIS_CONFIG));
                });
            });
            describe('Data#execRedis', () => {
                it('Set key', (done) => {
                    botphusUnit.data.execRedis(connectionNo, [['set', CONST.REDIS_KEY_NAME, CONST.REDIS_KEY_VALUE]])
                        .then(() => done())
                        .catch(done);
                });
                it('Get key', (done) => {
                    botphusUnit.data.execRedis(connectionNo, [['get', CONST.REDIS_KEY_NAME]])
                        .then((datas) => {
                            assert(datas.length === 1);
                            assert(datas[0][1] === CONST.REDIS_KEY_VALUE);
                            done();
                        })
                        .catch(done);
                });
                it('Del key', (done) => {
                    botphusUnit.data.execRedis(connectionNo, [['del', CONST.REDIS_KEY_NAME]])
                        .then(() => done())
                        .catch(done);
                });
                it('Exec with wrong connectionNo', (done) => {
                    botphusUnit.data.execRedis(connectionNo + '1', [['del', CONST.REDIS_KEY_NAME]])
                        .then(() => done(new Error('Invalid expectation')))
                        .catch(() => done());
                });
                after(() => {
                    redisConnectionCache[connectionNo].quit();
                });
            });
        });
    });
}
