// trigger data notice
.then(function(data) {
    sendProcessMessage([null, {
        type: MessageType.TASK_UNIT_EXEC_DATA_RECEIVE,
        index: '{{rule.index}}',
        order: curOrder,
        sendTime: new Date().getTime(),
        data: data
    }]);
    return data;
})
