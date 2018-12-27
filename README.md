# @botphus/server-runner
> `@botphus/server-runner`是`botphus`的服务器核心测试程序,通过底层使用[puppeteer](https://github.com/GoogleChrome/puppeteer)提供web测试单元任务配置和执行.

[![build status][travis-image]][travis-url]
[![codecov.io][codecov-image]][codecov-url]
[![node version][node-image]][node-url]

[travis-image]: https://img.shields.io/travis/botphus/botphus-server-runner/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/botphus/botphus-server-runner
[codecov-image]: https://img.shields.io/codecov/c/github/botphus/botphus-server-runner/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/botphus/botphus-server-runner?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_6-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

## 功能特性
- 使用任务单元组成的测试任务,可以按需执行特定部分.如:
    - 执行Web页面测试
    - 连接数据库/Redis缓存进行数据验证
    - Web页面事件捕获
- 服务端和PC客户端均可使用
- 独立的任务环境上下文
- 进程池应用

## 索引
- [API文档](docs/API.md)
- [测试单元配置](docs/unit.md)
- [环境变量](docs/environment.md)
- [通知](docs/event_message.md)
- [常见问题](docs/troubleshooting.md)

## 快速使用

### 安装
```shell
npm install @botphus/server-runner --save
```

### 使用
```typescript
import {TaskType, TaskTypeDomSubType} from '@botphus/rule';
import BotphusServerRunner, {destoryPool, TaskMessage} from '@botphus/server-runner';

const runner = new BotphusServerRunner();
(async () => {
    // Create task cache file
    const taskNo = await runner.createTask('Test task', new Date().getTime(), [
        {
            arguments: ['div'],
            assertion: ['data === "wrong assertion rule"'],
            subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
            type: TaskType.TYPE_DOM
        }
    ]);
    // Start task & listen child process message
    const myTaskEvent = await runner.startTask(taskNo, 'https://bing.com/');
    await new Promise((resolve, reject) => {
        // Get task exec message info
        myTaskEvent.on('message', ([error, messageData]: TaskMessage) => {
            if (error) {
                global.console.log(error.stack);
            }
            global.console.log(messageData);
        });
        // Event close
        myTaskEvent.on('exit', (code) => {
            global.console.log('done:', code);
            if (code === 1) {
                return reject(new Error('Event exit error'));
            }
            resolve();
        });
    });
})() // Current botphus is using process pool to manage task, if you want to stop main process, please destory cluster pool
    .then(() => {
        destoryPool();
    })
    .catch((err) => {
        global.console.log(err);
        destoryPool();
    });
```