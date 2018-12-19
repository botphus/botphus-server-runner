/**
 * Set Task function
 * @index   {{rule.index}}
 * @type    {{rule.type}}
 * @subType {{rule.subType}}
 */
.then(function() {
    if(excludeOption['{{rule.index}}']) return Promise.resolve();
    totalCase++;
    curOrder++;
    // Rule exec start notice
    sendProcessMessage([null, {
        type: MessageType.TASK_UNIT_EXEC_START,
        index: '{{rule.index}}',
        order: curOrder,
        sendTime: new Date().getTime()
    }]);
    {{!-- Start task unit --}}
    {{!-- TYPE_DATA --}}
    {{#if (eq rule.type 1)}}
    {{> entry_data rule=this}}
    {{/if}}
    {{!-- TYPE_DOM --}}
    {{#if (eq rule.type 2)}}
    {{> entry_dom rule=this}}
    {{/if}}
    {{!-- TYPE_EVENT --}}
    {{#if (eq rule.type 3)}}
    {{> entry_event rule=this}}
    {{/if}}
    {{!-- TYPE_TIME --}}
    {{#if (eq rule.type 4)}}
    {{> entry_time rule=this}}
    {{/if}}
    {{!-- TYPE_PAGE --}}
    {{#if (eq rule.type 5)}}
    {{> entry_page rule=this}}
    {{/if}}
    {{!-- TYPE_UNION --}}
    {{#if (eq rule.type 6)}}
    {{> entry_union rule=this}}
    {{/if}}
    {{#if rule.assertion}}
    // Set assertion
    .then(function({{#if rule.assertionVarName}}{{rule.assertionVarName}}{{else}}data{{/if}}) {
        {{#each rule.assertion}}
        if(!({{{this}}})) {
            return Promise.reject(commonLib.createErrorMessage(new Error('Assert Failed:{{{replace this "'" "\'"}}}'), MessageType.UNIT_RULE_ASSERT_ERROR));
        }
        {{/each}}
        {{!-- SUB_TYPE_DIALOG --}}
        {{#if (eq rule.subType 303)}}
        return {{#if rule.assertionVarName}}{{rule.assertionVarName}}{{else}}data{{/if}};
        {{/if}}
    })
    {{/if}}
    {{!-- SUB_TYPE_DIALOG --}}
    {{#if (eq rule.subType 303)}}
    .then((dialog) => {
        return dialog.accept('{{#if rule.promptText}}{{{replace rule.promptText "'" "\'"}}}{{else}}confirm{{/if}}');
    })
    {{/if}}
    .then(function() {
        // Rule exec end notice
        sendProcessMessage([null, {
            type: MessageType.TASK_UNIT_EXEC_END,
            index: '{{rule.index}}',
            order: curOrder,
            sendTime: new Date().getTime()
        }]);
    })
    // Set err index
    .catch(function(err) {
        if (!err.index) {
            err.index = '{{rule.index}}';
        }
        return Promise.reject(err);
    });
})