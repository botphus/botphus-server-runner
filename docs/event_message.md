# 通知
在测试任务执行过程中,我们会通过`process.send`发送执行消息.你可以通过'message'事件监听进程消息. 

**示例**
```
event.on('message', ([error, messageData]: TaskMessage) => {
    if (error) {
        global.console.log(error.stack);
    }
    global.console.log(messageData);
});
```

<a name="error"></a>
## error
当执行发送错误时,会自动发送一个error信息,并触发`exit`事件, 如下error部分.

注: `error`对象是一个复制的`Error`实例属性的`object`对象,但不是一个`Error`实例.所以,你如果需要打印错误的堆栈信息,请直接打印`error.stack`;

<a name="messageData"></a>
## messageData

当执行测试时,每触发一个进度, 会发送一个`messageData`的`object`信息.用于过程提醒.

字段名 | 类型 | 描述 
--- | --- | ---
type | `enum` | [消息类型](#messageType) 
index | `string` | 规则数组索引,`TASK_START`为`start`,`TASK_END`为`end`,其他为`任务单元索引序号`(由数组下标组成,子任务以`-`连接.如`0-0`)
sendTime | `number` | 发送消息时间,13位时间戳
context | `object` | 当前上下文
totalCase<sup>[注1](#messageData_tip)<sup> | `number` | 总测试用例数量
order<sup>[注2](#messageData_tip)<sup> | `number` | 测试单元序列号
data<sup>[注3](#messageData_tip)<sup> | `any` | 测试单元触发数据


<a name="messageData_tip"></a>
* 注1: 该字段只在`TASK_END`时存在
* 注2: 该字段只在非`TASK_START`和`TASK_END`时存在
* 注3: 该字段只在`TASK_UNIT_EXEC_DATA_RECEIVE`时存在

<a name="messageType"></a>
### 消息类型
- MessageType
    - TASK_START: 测试任务开始
    - TASK_END: 测试任务结束
    - TASK_UNIT_EXEC_START: 测试单元开始
    - TASK_UNIT_EXEC_END: 测试单元结束
    - TASK_UNIT_EXEC_DATA_RECEIVE: 接收到测试单元数据(部分测试单元子类型触发)