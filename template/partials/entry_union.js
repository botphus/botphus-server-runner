{{!-- SUB_TYPE_UNION_NON_BLOCK --}}
return new Promise(function(resolve, reject) {
        Promise.resolve()
        {{#each rule.children}}
        {{> entry rule=this}}
        {{/each}}
        .then(() => {
            resolve();
        })
    {{!-- SUB_TYPE_UNION_BLOCK --}}
    {{#if (eq rule.subType 600)}}
        .catch(reject);
    {{/if}}
    {{!-- SUB_TYPE_UNION_NON_BLOCK --}}
    {{#if (eq rule.subType 601)}}
        .catch((err) => {
            if (!err.index) {
                err.index = '{{rule.index}}';
            }
            // Send error & don't reject
            sendProcessMessage([commonLib.createErrorMessage(err, MessageType.UNIT_RULE_EXEC_ERROR)]);
            resolve();
        });
    {{/if}}
})