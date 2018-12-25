"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const puppeteer = require("puppeteer");
const unit_1 = require("../../source/lib/unit/");
const CONST = require("../common/const");
function default_1() {
    describe('Unit#Event', () => {
        it('Event#dialog', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.event.dialog(page, CONST.EVENT_TIMEOUT, () => {
                            return unit_1.default.dom.click(page, CONST.NORMAL_PAGE_DIALOG_SELECTOR);
                        })
                            .then((dialog) => {
                            assert(dialog.message() === CONST.DIALOG_VALUE);
                            assert(dialog.type() === 'alert');
                            return dialog.accept();
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
        it('Event#console', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.event.console(page, CONST.EVENT_TIMEOUT, () => {
                            return unit_1.default.dom.click(page, CONST.NORMAL_PAGE_CONSOLE_SELECTOR);
                        })
                            .then((consoleMessage) => {
                            assert(consoleMessage.type() === 'log');
                            assert(consoleMessage.args().length === 1);
                            assert(consoleMessage.text() === CONST.CONSOLE_VALUE);
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
        it('Event#request & response', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return Promise.all([unit_1.default.event.request(page, CONST.EVENT_TIMEOUT, () => {
                                return Promise.resolve();
                            }, (request) => {
                                return request.url() === CONST.REQUEST_PATH;
                            }), unit_1.default.event.response(page, CONST.EVENT_TIMEOUT, () => {
                                // trigger request
                                return unit_1.default.dom.click(page, CONST.NORMAL_PAGE_REQUEST_SELECTOR);
                            }, (response) => {
                                return response.url() === CONST.REQUEST_PATH;
                            })])
                            .then(([request, response]) => {
                            assert(request.method() === 'GET');
                            return response.json();
                        })
                            .then((resData) => {
                            assert(resData);
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
        it('Event#response with Error checkFunc', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.event.request(page, 100, () => {
                            // trigger request
                            return unit_1.default.dom.click(page, CONST.NORMAL_PAGE_REQUEST_SELECTOR);
                        }, (request) => {
                            return request.url() !== CONST.REQUEST_PATH;
                        });
                    })
                        .then(() => {
                        browser.close();
                        done(new Error('Invalid expectation'));
                    })
                        .catch(() => {
                        browser.close();
                        done();
                    });
                });
            });
        });
        it('Event#response with timeout', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.event.response(page, 0, () => {
                            // trigger request
                            return unit_1.default.dom.click(page, CONST.NORMAL_PAGE_REQUEST_SELECTOR);
                        }, (response) => {
                            return response.url() === CONST.REQUEST_PATH;
                        });
                    })
                        .then(() => {
                        browser.close();
                        done(new Error('Invalid expectation'));
                    })
                        .catch(() => {
                        browser.close();
                        done();
                    });
                });
            });
        });
    });
}
exports.default = default_1;
