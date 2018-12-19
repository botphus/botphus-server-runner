import * as Redis from 'ioredis';
import {createHash} from '../common';

export const redisConnectionCache: {
    [propName: string]: Redis.Redis
} = {};

/**
 * Create redis connection
 * @param  {Redis.RedisOptions | Redis.ClusterNode[]} config Redis Config
 * @param  {Redis.ClusterOptions}                     option Redis Cluster Options
 * @return {string}                                          Connection No
 */
export function createRedisConnection(config: Redis.RedisOptions | Redis.ClusterNode[], option?: Redis.ClusterOptions): string {
    const redisNo: string = createHash(JSON.stringify(config));
    if (redisConnectionCache[redisNo]) {
        return redisNo;
    }
    // for redis cluster config
    // for local & travis test, close cluster test
    /* istanbul ignore next */
    if (Array.isArray(config)) {
        redisConnectionCache[redisNo] = new Redis.Cluster(config, option);
        return redisNo;
    }
    // for redis config
    redisConnectionCache[redisNo] = new Redis(config);
    return redisNo;
}
