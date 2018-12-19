{{!-- SUB_TYPE_MYSQL --}}
{{#if (eq rule.subType 100)}}
if(!mysqlConnectionNo) return Promise.reject(new Error('"mysqlOption" is required when you use execSql'));
return unitLib.data.execSql(mysqlConnectionNo, `{{{replace rule.arguments.[0] "'" "\'"}}}`)
{{/if}}
{{!-- SUB_TYPE_REDIS --}}
{{#if (eq rule.subType 101)}}
if(!redisConnectionNo) return Promise.reject(new Error('"redisOption" is required when you use execRedis'));
return unitLib.data.execRedis(redisConnectionNo, {{{JSONstringify rule.arguments.[0]}}})
{{/if}}
{{> data_send rule=this}}