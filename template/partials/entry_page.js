{{!-- SUB_TYPE_RELOAD --}}
{{#if (eq rule.subType 500)}}
return unitLib.page.reload(page, {{#if rule.arguments.[0]}}{{{replaceContext (JSONstringify rule.arguments.[0]) '"'}}}{{else}}{}{{/if}})
{{/if}}
{{!-- SUB_TYPE_SET_COOKIE --}}
{{#if (eq rule.subType 501)}}
return unitLib.page.setCookie(page, {{{replaceContext (JSONstringify rule.arguments.[0]) '"'}}})
{{/if}}
{{!-- SUB_TYPE_GET_COOKIE --}}
{{#if (eq rule.subType 502)}}
return unitLib.page.getCookie(page, {{{replaceContext (JSONstringify rule.arguments.[0]) '"'}}})
{{> data_send rule=this}}
{{/if}}
{{!-- SUB_TYPE_DELETE_COOKIE --}}
{{#if (eq rule.subType 503)}}
return unitLib.page.deleteCookie(page, {{{replaceContext (JSONstringify rule.arguments.[0]) '"'}}})
{{/if}}
{{!-- SUB_TYPE_GOTO --}}
{{#if (eq rule.subType 504)}}
return unitLib.page.goto(page, '{{{replaceContext (replace rule.arguments.[0] "'" "\'") '\''}}}', {{#if rule.arguments.[1]}}{{{replaceContext (JSONstringify rule.arguments.[1]) '"'}}}{{else}}{}{{/if}})
{{/if}}
{{!-- SUB_TYPE_SCREENSHOT --}}
{{#if (eq rule.subType 505)}}
return unitLib.page.screenShot(page, {{{replaceContext (JSONstringify rule.arguments.[0]) '"'}}})
{{/if}}