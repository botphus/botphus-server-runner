{{!-- SUB_TYPE_SET_SLEEP --}}
{{#if (eq rule.subType 400)}}
return unitLib.time.sleep({{rule.arguments.[0]}})
{{/if}}