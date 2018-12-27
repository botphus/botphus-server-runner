// trigger data notice
.then(function(data) {
    taskLib.sendTaskMsg(null, {
        type: MessageType.TASK_UNIT_EXEC_DATA_RECEIVE,
        index: '{{rule.index}}',
        context: context,
        order: curOrder,
        sendTime: new Date().getTime(),
        data: data
    });
    return data;
})
