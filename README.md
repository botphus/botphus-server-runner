# botphus-core
> `botphusCore`是`botphus`的核心测试程序,通过底层使用[puppeteer](https://github.com/GoogleChrome/puppeteer)提供web测试单元任务配置和执行.

[![build status][travis-image]][travis-url]
[![codecov.io][codecov-image]][codecov-url]
[![node version][node-image]][node-url]

[travis-image]: https://img.shields.io/travis/botphus/botphus-core/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/botphus/botphus-core
[codecov-image]: https://img.shields.io/codecov/c/github/botphus/botphus-core/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/botphus/botphus-core?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_6-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

## 功能特性
- 使用任务单元组成的测试任务,可以按需执行特定部分.如:
    - 执行Web页面测试
    - 连接数据库/Redis缓存进行数据验证
    - Web页面事件捕获
- 服务端和PC客户端均可使用

## 索引
- [API文档](docs/API.md)
- [测试单元配置](docs/unit.md)
- [进程通知](docs/process_message.md)
- [常见问题](docs/troubleshooting.md)

## 快速使用

### 安装
```shell
npm install botphus-core --save
```

### 构建
```shell
npm run build
```

### 使用
```javascript
import BotphusCore, {TaskMessage, TaskType, TaskTypeDomSubType} from 'botphus-core';
const botphusCore = new BotphusCore();
(async () => {
    // Create task cache file
    const taskNo = await botphusCore.createTask('Test task', new Date().getTime(), [
        {
            argments: ['div'],
            assertion: ['data === "wrong assertion rule"'],
            subType: TaskTypeDomSubType.SUB_TYPE_GET_TEXT,
            type: TaskType.TYPE_DOM
        }
    ]);
    // Start task & listen child process message
    const subProcess = await botphusCore.startTask(taskNo, 'https://bing.com/');
    // Get task exec message info
    subProcess.on('message', ([error, messageData]: TaskMessage) => {
        if (error) {
            global.console.log(error.stack);
        }
        global.console.log(messageData);
    });
    // Process close
    subProcess.on('close', (code) => {
        global.console.log('done:', code);
    });
})();
```