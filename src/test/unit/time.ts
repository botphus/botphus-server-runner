import * as assert from 'power-assert';
import * as puppeteer from 'puppeteer';

import botphusUnit from '../../source/lib/unit/';

import * as CONST from '../common/const';

export default function() {
    describe('Unit#Time', () => {
        it('Time#sleep', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return page.goto(CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    const curTime = new Date().getTime();
                                    return botphusUnit.time.sleep(CONST.SLEEP_TIME)
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
