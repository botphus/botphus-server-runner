import * as assert from 'power-assert';
import * as puppeteer from 'puppeteer';

import botphusUnit from '../../source/lib/unit/';

import * as CONST from '../common/const';

export default function() {
    describe('Normal', () => {
        it('Dom#click', (done) => {
            puppeteer.launch(CONST.PUPPETEER_LAUNCH_OPTION)
                .then((browser) => {
                    return browser.newPage()
                        .then((page) => {
                            return page.goto(CONST.NORMAL_PAGE_PATH)
                                .then(() => {
                                    return botphusUnit.dom.click(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR);
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
                                    return botphusUnit.event.console(page, CONST.EVENT_TIMEOUT, () => {
                                        return botphusUnit.dom.click(page, CONST.NORMAL_PAGE_CONSOLE_COVER_SELECTOR, false);
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
                                    return botphusUnit.dom.keyboard(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.SEARCH_SELECTOR_VALUE);
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
                                    return botphusUnit.dom.keyboard(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.SEARCH_SELECTOR_VALUE);
                                })
                                .then(() => {
                                    return botphusUnit.dom.getAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.NORMAL_PAGE_SEARCH_SELECTOR_FIELD);
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
                                    return botphusUnit.dom.setAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.NORMAL_PAGE_SEARCH_SELECTOR_FIELD, CONST.SEARCH_SELECTOR_VALUE);
                                })
                                .then(() => {
                                    return botphusUnit.dom.getAttr(page, CONST.NORMAL_PAGE_SEARCH_SELECTOR, CONST.NORMAL_PAGE_SEARCH_SELECTOR_FIELD);
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
                                    return botphusUnit.dom.getHtml(page, CONST.NORMAL_PAGE_PARENT_SEARCH_SELECTOR);
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
                                    return botphusUnit.dom.getText(page, CONST.NORMAL_PAGE_PARENT_SEARCH_SELECTOR);
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
                                    return botphusUnit.dom.setInputFiles(page, CONST.NORMAL_PAGE_FILE_SELECTOR, [CONST.RESOURCE_IMAGE_PATH]);
                                })
                                .then(() => {
                                    return botphusUnit.dom.getAttr(page, CONST.NORMAL_PAGE_FILE_SELECTOR, CONST.NORMAL_PAGE_FILE_SELECTOR_FIELD);
                                })
                                .then((files) => {
                                    assert(typeof files === 'object');
                                    assert(Object.keys(files).length === 1);
                                    return botphusUnit.dom.getAttr(page, CONST.NORMAL_PAGE_FILE_SELECTOR, CONST.NORMAL_PAGE_SEARCH_SELECTOR_FIELD);
                                })
                                .then((file) => {
                                    assert(file.indexOf(CONST.RESOURCE_IMAGE_PATH.replace(CONST.RESOURCE_FILE_NAME_REG, '$1')));
                                })
                                .then(() => {
                                    return botphusUnit.dom.setInputFiles(page, CONST.NORMAL_PAGE_FILE_MULTI_SELECTOR, [CONST.RESOURCE_IMAGE_PATH, CONST.RESOURCE_PDF_PATH]);
                                })
                                .then(() => {
                                    return botphusUnit.dom.getAttr(page, CONST.NORMAL_PAGE_FILE_MULTI_SELECTOR, CONST.NORMAL_PAGE_FILE_SELECTOR_FIELD);
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
