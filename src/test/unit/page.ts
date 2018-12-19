import * as assert from 'power-assert';
import * as puppeteer from 'puppeteer';

import botphusUnit from '../../source/lib/unit/';

import * as CONST from '../common/const';

export default function() {
    describe('Unit#Page', () => {
        it('Page#reload', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return page.goto(CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.dom.setAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, 'value', CONST.SEARCH_SELECTOR_VALUE);
                                })
                                .then(() => {
                                    return botphusUnit.page.reload(page);
                                })
                                .then(() => {
                                    return botphusUnit.dom.getAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, 'value');
                                })
                                .then((value) => {
                                    assert(value !== CONST.SEARCH_SELECTOR_VALUE);
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
                })
                .catch(done);
        });
        it('Page#setCookie & getCookie', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return page.goto(CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.page.setCookie(page, [
                                        {
                                            name: CONST.COOKIE_NAME,
                                            url: CONST.COOKIE_URL,
                                            value: CONST.COOKIE_VALUE
                                        }
                                    ]);
                                })
                                .then(() => {
                                    return botphusUnit.page.reload(page);
                                })
                                .then(() => {
                                    return botphusUnit.page.getCookie(page, [CONST.COOKIE_URL]);
                                })
                                .then((cookies) => {
                                    assert(cookies.length === 1);
                                    assert(cookies[0].domain === CONST.COOKIE_DOMAIN);
                                    assert(cookies[0].name === CONST.COOKIE_NAME);
                                    assert(cookies[0].value === CONST.COOKIE_VALUE);
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
                })
                .catch(done);
        });
        it('Page#deleteCookie', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return page.goto(CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.page.setCookie(page, [
                                        {
                                            name: CONST.COOKIE_NAME,
                                            url: CONST.COOKIE_URL,
                                            value: CONST.COOKIE_VALUE
                                        }
                                    ]);
                                })
                                .then(() => {
                                    return botphusUnit.page.reload(page);
                                })
                                .then(() => {
                                    return botphusUnit.page.getCookie(page, [CONST.COOKIE_URL]);
                                })
                                .then((cookies) => {
                                    assert(cookies.length === 1);
                                    assert(cookies[0].domain === CONST.COOKIE_DOMAIN);
                                    assert(cookies[0].name === CONST.COOKIE_NAME);
                                    assert(cookies[0].value === CONST.COOKIE_VALUE);
                                })
                                .then(() => {
                                    return botphusUnit.page.deleteCookie(page, [
                                        {
                                            name: CONST.COOKIE_NAME,
                                            url: CONST.COOKIE_URL
                                        }
                                    ]);
                                })
                                .then(() => {
                                    return botphusUnit.page.getCookie(page, [CONST.COOKIE_URL]);
                                })
                                .then((cookies) => {
                                    assert(cookies.length === 0);
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
                })
                .catch(done);
        });
        it('Page#goto', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return botphusUnit.page.goto(page, CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.dom.setAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, 'value', CONST.SEARCH_SELECTOR_VALUE);
                                })
                                .then(() => {
                                    return botphusUnit.dom.getAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, 'value');
                                })
                                .then((value) => {
                                    assert(value === CONST.SEARCH_SELECTOR_VALUE);
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
                })
                .catch(done);
        });
        it('Page#screenShot', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return botphusUnit.page.goto(page, CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.page.screenShot(page);
                                })
                                .then((value) => {
                                    assert(value instanceof Buffer);
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
                })
                .catch(done);
        });
    });
}
