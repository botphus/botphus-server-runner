"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const puppeteer = require("puppeteer");
const unit_1 = require("../../source/lib/unit/");
const CONST = require("../common/const");
function default_1() {
    describe('Unit#Time', () => {
        it('Time#sleep', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        const curTime = new Date().getTime();
                        return unit_1.default.time.sleep(CONST.SLEEP_TIME)
                            .then(() => {
                            assert(curTime + CONST.SLEEP_TIME <= new Date().getTime());
                        });
                    })
                        .then(() => {
                        browser.close();
                        done();
                    })
                        .catch((err) => {
                        browser.close();
                        done(err);
                    });
                });
            });
        });
    });
}
exports.default = default_1;
