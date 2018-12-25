const path = require('path');
const puppeteer = require(path.join(process.cwd(), '/node_modules/puppeteer/'));
const assert = require('assert');

// message type
const commonType = require(path.join('{{libPath}}', '/dist/source/types/common'));
const MessageType = commonType.MessageType;

// lib
const commonLib = require(path.join('{{libPath}}', '/dist/source/lib/common'));
const taskLib = require(path.join('{{libPath}}', '/dist/source/lib/task'));
const unitLib = require(path.join('{{libPath}}', '/dist/source/lib/unit/')).default;
const mysqlLib = require(path.join('{{libPath}}', '/dist/source/lib/connection/mysql'));
const redisLib = require(path.join('{{libPath}}', '/dist/source/lib/connection/redis'));

module.exports = function(env) {
    // Init process parmas
    const puppeteerLaunchOption = env.startOption.puppeteerLaunchOption || null;
    const mysqlOption = env.startOption.mysqlOption || null;
    const redisOption = env.startOption.redisOption || null;
    const excludeOption = env.startOption.excludeOption || {};
    const startOption = env.startOption.startPageOption || null;

    // Init mysql & redis
    let mysqlConnectionNo = '';
    let redisConnectionNo = '';
    if(mysqlOption) {
        mysqlConnectionNo = mysqlLib.createMysqlConnection(mysqlOption);
    }
    if(redisOption) {
        redisConnectionNo = redisLib.createRedisConnection(redisOption);
    }

    // Cover info
    let totalCase = 0; // Total case count
    let curOrder = 0; // Cur case order

    /**
     * End process
     * @param  {puppteer.browser} browser Puppteer Browser instance
     */
    function endProcess(browser) {
        const promiseList = [];
        if(browser) promiseList.push(browser.close());
        // Throw error message
        if(mysqlConnectionNo) promiseList.push(new Promise(function(resolve) {
            mysqlLib.mysqlConnectionCache[mysqlConnectionNo].end(function() {
                resolve();
            });
        }));
        if(redisConnectionNo) promiseList.push(redisLib.redisConnectionCache[redisConnectionNo].quit()
            // Throw error message
            .catch(function() {
                return Promise.resolve();
            })
        );
        return Promise.all(promiseList);
    }

    taskLib.sendTaskMsg(null, {
        type: MessageType.TASK_START,
        index: 'start',
        puppeteerLaunchOption: puppeteerLaunchOption,
        mysqlOption: mysqlOption,
        redisOption: redisOption,
        excludeOption: excludeOption,
        sendTime: new Date().getTime()
    });

    // Get parent 
    (puppeteerLaunchOption ? puppeteer.launch(puppeteerLaunchOption) : puppeteer.launch())
        .then(function(browser) {
            return browser.newPage()
                .then(function(page) {
                    const startFunc = env.startPage ? 
                        (startOption ? unitLib.page.goto(page, env.startPage, startOption) : unitLib.page.goto(page, env.startPage)) : Promise.resolve();
                    return startFunc
                        {{#each taskRules}}
                        {{> entry rule=this }}
                        {{/each}}
                })
                .then(function() { // Close browser
                    return endProcess(browser);
                })
                .then(function() { // send end message
                    taskLib.sendTaskMsg(null, {
                        type: MessageType.TASK_END,
                        index: 'end',
                        totalCase: totalCase,
                        sendTime: new Date().getTime()
                    });
                })
                .catch(function(err) {
                    return endProcess(browser)
                        .then(function() {
                            if(err.type) {
                                taskLib.sendTaskMsg(err);
                            } else {
                                taskLib.sendTaskMsg(commonLib.createErrorMessage(err, MessageType.UNIT_RULE_EXEC_ERROR));
                            }
                        });
                });
        })
        .catch(function(err) {
            return endProcess()
                .then(function() {
                    return taskLib.sendTaskMsg(commonLib.createErrorMessage(err, MessageType.PUPPTER_INIT_ERROR));
                });
        });
}