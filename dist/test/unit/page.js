"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const puppeteer = require("puppeteer");
const unit_1 = require("../../source/lib/unit/");
const CONST = require("../common/const");
function default_1() {
    describe('Unit#Page', () => {
        it('Page#reload', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.setAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, 'value', CONST.SEARCH_SELECTOR_VALUE);
                    })
                        .then(() => {
                        return unit_1.default.page.reload(page);
                    })
                        .then(() => {
                        return unit_1.default.dom.getAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, 'value');
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
                        return unit_1.default.page.setCookie(page, [
                            {
                                name: CONST.COOKIE_NAME,
                                url: CONST.COOKIE_URL,
                                value: CONST.COOKIE_VALUE
                            }
                        ]);
                    })
                        .then(() => {
                        return unit_1.default.page.reload(page);
                    })
                        .then(() => {
                        return unit_1.default.page.getCookie(page, [CONST.COOKIE_URL]);
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
                        return unit_1.default.page.setCookie(page, [
                            {
                                name: CONST.COOKIE_NAME,
                                url: CONST.COOKIE_URL,
                                value: CONST.COOKIE_VALUE
                            }
                        ]);
                    })
                        .then(() => {
                        return unit_1.default.page.reload(page);
                    })
                        .then(() => {
                        return unit_1.default.page.getCookie(page, [CONST.COOKIE_URL]);
                    })
                        .then((cookies) => {
                        assert(cookies.length === 1);
                        assert(cookies[0].domain === CONST.COOKIE_DOMAIN);
                        assert(cookies[0].name === CONST.COOKIE_NAME);
                        assert(cookies[0].value === CONST.COOKIE_VALUE);
                    })
                        .then(() => {
                        return unit_1.default.page.deleteCookie(page, [
                            {
                                name: CONST.COOKIE_NAME,
                                url: CONST.COOKIE_URL
                            }
                        ]);
                    })
                        .then(() => {
                        return unit_1.default.page.getCookie(page, [CONST.COOKIE_URL]);
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
                    return unit_1.default.page.goto(page, CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.setAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, 'value', CONST.SEARCH_SELECTOR_VALUE);
                    })
                        .then(() => {
                        return unit_1.default.dom.getAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, 'value');
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
                    return unit_1.default.page.goto(page, CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.page.screenShot(page);
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
exports.default = default_1;
