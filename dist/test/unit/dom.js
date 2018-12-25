"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const puppeteer = require("puppeteer");
const unit_1 = require("../../source/lib/unit/");
const CONST = require("../common/const");
function default_1() {
    describe('Normal', () => {
        it('Dom#click', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.click(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR);
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
            })
                .catch(done);
        });
        it('Dom#click with cover dom', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.event.console(page, CONST.EVENT_TIMEOUT, () => {
                            return unit_1.default.dom.click(page, CONST.NORMAL_PAGE_CONSOLE_COVER_SELECTOR, false);
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
        it('Dom#keyboard', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.keyboard(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.SEARCH_SELECTOR_VALUE);
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
            })
                .catch(done);
        });
        it('Dom#getAttr', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.keyboard(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.SEARCH_SELECTOR_VALUE);
                    })
                        .then(() => {
                        return unit_1.default.dom.getAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.NORMAL_PAGE_SEARCH_SELECTOR_FIELD);
                    })
                        .then((value) => {
                        assert(value === CONST.SEARCH_SELECTOR_VALUE);
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
            })
                .catch(done);
        });
        it('Dom#setAttr', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.setAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.NORMAL_PAGE_SEARCH_SELECTOR_FIELD, CONST.SEARCH_SELECTOR_VALUE);
                    })
                        .then(() => {
                        return unit_1.default.dom.getAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.NORMAL_PAGE_SEARCH_SELECTOR_FIELD);
                    })
                        .then((value) => {
                        assert(value === CONST.SEARCH_SELECTOR_VALUE);
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
            })
                .catch(done);
        });
        it('Dom#getHtml', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.getHtml(page, CONST.NORMAL_PAGE_PARENT_SEARCH_SELECTOR);
                    })
                        .then((html) => {
                        assert(html === CONST.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_HTML);
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
            })
                .catch(done);
        });
        it('Dom#getText', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.getText(page, CONST.NORMAL_PAGE_PARENT_SEARCH_SELECTOR);
                    })
                        .then((html) => {
                        assert(html === CONST.NORMAL_PAGE_PARENT_SEARCH_SELECTOR_TEXT);
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
            })
                .catch(done);
        });
        it('Dom#setInputFiles', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return page.goto(CONST.NORMAL_PAGE_PATH)
                        .then(() => {
                        return unit_1.default.dom.setInputFiles(page, CONST.NORMAL_PAGE_FILE_SELECTOR, [CONST.RESOURCE_IMAGE_PATH]);
                    })
                        .then(() => {
                        return unit_1.default.dom.getAttr(page, CONST.NORMAL_PAGE_FILE_SELECTOR, CONST.NORMAL_PAGE_FILE_SELECTOR_FIELD);
                    })
                        .then((files) => {
                        assert(typeof files === 'object');
                        assert(Object.keys(files).length === 1);
                        return unit_1.default.dom.getAttr(page, CONST.NORMAL_PAGE_FILE_SELECTOR, CONST.NORMAL_PAGE_SEARCH_SELECTOR_FIELD);
                    })
                        .then((file) => {
                        assert(file.indexOf(CONST.RESOURCE_IMAGE_PATH.replace(CONST.RESOURCE_FILE_NAME_REG, '$1')));
                    })
                        .then(() => {
                        return unit_1.default.dom.setInputFiles(page, CONST.NORMAL_PAGE_FILE_MULTI_SELECTOR, [CONST.RESOURCE_IMAGE_PATH, CONST.RESOURCE_PDF_PATH]);
                    })
                        .then(() => {
                        return unit_1.default.dom.getAttr(page, CONST.NORMAL_PAGE_FILE_MULTI_SELECTOR, CONST.NORMAL_PAGE_FILE_SELECTOR_FIELD);
                    })
                        .then((files) => {
                        assert(typeof files === 'object');
                        assert(Object.keys(files).length === 2);
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
            })
                .catch(done);
        });
    });
}
exports.default = default_1;
