"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const common_1 = require("../common");
exports.redisConnectionCache = {};
/**
 * Create redis connection
 * @param  {Redis.RedisOptions | Redis.ClusterNode[]} config Redis Config
 * @param  {Redis.ClusterOptions}                     option Redis Cluster Options
 * @return {string}                                          Connection No
 */
function createRedisConnection(config, option) {
    const redisNo = common_1.createHash(JSON.stringify(config));
    if (exports.redisConnectionCache[redisNo]) {
        return redisNo;
    }
    // for redis cluster config
    // for local & travis test, close cluster test
    /* istanbul ignore next */
    if (Array.isArray(config)) {
        exports.redisConnectionCache[redisNo] = new Redis.Cluster(config, option);
        return redisNo;
    }
    // for redis config
    exports.redisConnectionCache[redisNo] = new Redis(config);
    return redisNo;
}
exports.createRedisConnection = createRedisConnection;
