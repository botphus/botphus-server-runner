# 程序API

## Class
- [BotphusServerRunner](#BotphusServerRunner)

<a name="BotphusServerRunner"></a>
### BotphusServerRunner

- [new BotphusServerRunner(customConfig?: IBotphusRunnerConfig)](#new_botphus_server_runner)
- instance
    - [createTask(taskName: string, mtime: number, taskRules: TaskRuleTypeItem[])](#create_task): `Promise<string>`
    - [removeTask(taskNo: string)](#remove_task): `Promise<void>`
    - [clearTask()](#clear_task): `Promise<void>`
    - [startTask(taskNo: string, startPage: string, startOption: ITaskStartOption = {})](#start_task): [`Promise<IProcessPoolWorkEvent>`](../src/source/interfaces/process_pool.ts)
- [destoryPool(): Promise<void>](#destory_pool)
<a name="new_botphus_server_runner"></a>
#### new BotphusServerRunner(customConfig?: IBotphusRunnerConfig)

创建一个`BotphusServerRunner`实例

参数 | 类型 | 默认值 | 描述 
--- | --- | --- | ---
[cachePath] | `string` | `join(tmpdir(), '/botphus/')` | 缓存文件存储目录,默认为当前系统缓存目录下的`botphus`目录

**示例**
```javascript
import BotphusServerRunner from '@botphus/server-core';
import * as path from 'path';
const botphusServerRunner = new BotphusServerRunner();
const botpuusServerRunnerWithNewCachePath = new BotphusServerRunner({
    cachePath: path.join('/botphus/')
});
```

<a name="create_task"></a>
#### createTask(taskName: string, mtime: number, taskRules: TaskRuleTypeItem[]): `Promise<string>`

创建一个任务缓存并返回`任务编号`

参数 | 类型 | 默认值 | 描述 
--- | --- | --- | ---
taskName | `string` | null | 任务名称,系统会根据任务名称生成一个`任务编号`并返回,**相同任务名称会覆盖生成**
mtime | `number` | null | 任务更新时间,当缓存文件更新时间比任务更新时间早时,会重新生成缓存任务
taskRules | `TaskRuleTypeItem[]` | null | 任务测试单元规则数据,详见[测试单元配置](unit.md)

<a name="remove_task"></a>
#### removeTask(taskNo: string): `Promise<void>`

删除一个指定`任务编号`的任务缓存文件

参数 | 类型 | 默认值 | 描述 
--- | --- | --- | ---
taskNo | `string` | null | 任务编号

<a name="clear_task"></a>
#### clearTask(): `Promise<void>`

清空所有任务缓存文件

<a name="start_task"></a>
#### startTask(taskNo: string, startPage: string, startOption: ITaskStartOption = {}): [`Promise<IProcessPoolWorkEvent>`](../src/source/interfaces/process_pool.ts)

执行一个任务并通过返回的监听事件监听任务进度,详见[进程通知](process_message.md)

参数 | 类型 | 默认值 | 描述 
--- | --- | --- | ---
taskNo | `string` | null | 任务编号
startPage | `string` | null | 默认着陆页,如果为空,则默认不跳转页面
[startOption] | `object` | {} | 启动配置
[startOption.puppeteerLaunchOption] | `object` | null | puppeteer启动配置,详见[puppeteer.launch](https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-puppeteerlaunchoptions)
[startOption.mysqlOption] | `object` | null | mysql连接配置,详见[mysql](https://github.com/mysqljs/mysql#introduction)
[startOption.redisOption] | `object`/`array` | null | redis连接配置,详见[ioredis:new Redis](https://github.com/luin/ioredis/blob/master/API.md#new_Redis_new)或[ioredis:new Cluster](https://github.com/luin/ioredis/blob/master/API.md#new_Cluster_new)
[startOption.excludeOption] | `object` | {} | 过滤`任务单元索引序号`,key由数组下标组成,子任务以`-`连接.如`{'0-0': true}`
[startOption.startPageOption] | `object` | {'waitUntil': 'domcontentloaded'} | 启动页配置,详见[page.goto](https://pptr.dev/#?product=Puppeteer&version=v1.8.0&show=api-pagegotourl-options)

<a name="destory_pool"></a>
#### [destoryPool(): Promise<void>](#destory_pool)

销毁所有进程池的进程