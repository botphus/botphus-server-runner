const path = require('path');
const puppeteer = require(path.join('puppeteer'));

// message type
const commonType = require(path.join('{{libPath}}', '/dist/source/types/common'));
const MessageType = commonType.MessageType;

// lib
const commonLib = require(path.join('{{libPath}}', '/dist/source/lib/common'));
const unitLib = require(path.join('{{libPath}}', '/dist/source/lib/unit/')).default;
const mysqlLib = require(path.join('{{libPath}}', '/dist/source/lib/connection/mysql'));
const redisLib = require(path.join('{{libPath}}', '/dist/source/lib/connection/redis'));

// Init process parmas
const puppeteerLaunchOption = process.env.PUPPETEER_LAUNCH_OPTION ? JSON.parse(process.env.PUPPETEER_LAUNCH_OPTION) : null;
const mysqlOption = process.env.MYSQL_OPTION ? JSON.parse(process.env.MYSQL_OPTION) : null;
const redisOption = process.env.REDIS_OPTION ? JSON.parse(process.env.REDIS_OPTION) : null;
const excludeOption = process.env.EXCLUDE_OPTION ? JSON.parse(process.env.EXCLUDE_OPTION) : {};
const startOption = process.env.START_PAGE_OPTION ? JSON.parse(process.env.START_PAGE_OPTION) : null;

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
 * Send Process message
 * @param  {Array|Error}  message message info
 */
function sendProcessMessage(message) {
    const err = message[0];
    if(process.send) {
        // Rebuild error message for parent process
        if(err) {
            message[0] = {
                type: err.type, // error type
                name: err.name, // error name
                index: err.index, // Task unit index
                message: err.message, // error message
                stack: err.stack // error stack info
            }
        }
        return process.send(message);
    }
    if(err) {
        return console.error(err);
    }
    console.log(message);
}

/**
 * End process
 * @param  {puppteer.browser} browser Puppteer Browser instance
 */
function endProcess(browser) {
    if(browser) browser.close();
    if(mysqlConnectionNo) mysqlLib.mysqlConnectionCache[mysqlConnectionNo].end();
    if(redisConnectionNo) redisLib.redisConnectionCache[redisConnectionNo].quit();
}

sendProcessMessage([null, {
    type: MessageType.TASK_START,
    index: 'start',
    puppeteerLaunchOption: puppeteerLaunchOption,
    mysqlOption: mysqlOption,
    redisOption: redisOption,
    excludeOption: excludeOption,
    sendTime: new Date().getTime()
}]);

// Get parent 
(puppeteerLaunchOption ? puppeteer.launch(puppeteerLaunchOption) : puppeteer.launch())
    .then(function(browser) {
        return browser.newPage()
            .then(function(page) {
                const startFunc = process.env.START_PAGE ? 
                    (startOption ? unitLib.page.goto(page, process.env.START_PAGE, startOption) : unitLib.page.goto(page, process.env.START_PAGE)) : Promise.resolve();
                return startFunc
                    {{#each taskRules}}
                    {{> entry rule=this }}
                    {{/each}}
            })
            .then(function() {
                // Close browser & send end message
                endProcess(browser);
                sendProcessMessage([null, {
                    type: MessageType.TASK_END,
                    index: 'end',
                    totalCase: totalCase,
                    sendTime: new Date().getTime()
                }]);
            })
            .catch(function(err) {
                if(err.type) {
                    sendProcessMessage([err]);
                } else {
                    sendProcessMessage([commonLib.createErrorMessage(err, MessageType.UNIT_RULE_EXEC_ERROR)]);
                }
                endProcess(browser);
            });
    })
    .catch(function(err) {
        sendProcessMessage([commonLib.createErrorMessage(err, MessageType.PUPPTER_INIT_ERROR)]);
        endProcess();
    });