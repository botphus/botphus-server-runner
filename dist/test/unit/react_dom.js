"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const puppeteer = require("puppeteer");
const unit_1 = require("../../source/lib/unit/");
const CONST = require("../common/const");
function default_1() {
    describe('React', () => {
        it('Submit form & assert form log', (done) => {
            puppeteer.launch(CONST.PUPPETEER_REACT_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return unit_1.default.page.goto(page, CONST.REACT_PAGE_PATH, {
                        waitUntil: 'networkidle0'
                    })
                        .then(() => {
                        return unit_1.default.event.console(page, CONST.EVENT_TIMEOUT, () => {
                            return unit_1.default.dom.click(page, CONST.REACT_PAGE_FORM_SELECT1_SELECTOR)
                                .then(() => {
                                return unit_1.default.dom.click(page, CONST.REACT_PAGE_OUTSIDE_SELECT1_DROPDOWN_SELECTOR);
                            })
                                .then(() => {
                                return unit_1.default.dom.click(page, CONST.REACT_PAGE_FORM_SELECT2_SELECTOR);
                            })
                                .then(() => {
                                return unit_1.default.dom.click(page, CONST.REACT_PAGE_OUTSIDE_SELECT2_DROPDOWN_SELECTOR);
                            })
                                .then(() => {
                                return unit_1.default.dom.click(page, CONST.REACT_PAGE_FORM_BUTTON_SUBMIT_SELECTOR);
                            });
                        }, (consoleMessage) => {
                            return consoleMessage.type() === 'log';
                        });
                    })
                        .then((consoleMessage) => {
                        const args = consoleMessage.args();
                        assert(args.length === 2);
                        return Promise.all(args.map((arg) => {
                            return arg.jsonValue();
                        }));
                    })
                        .then((datas) => {
                        assert(datas[0] === CONST.REACT_PAGE_CONSOLE_FORM_MESSAGE);
                        assert(datas[1].select === 'china');
                        assert(datas[1]['select-multiple'].length === 1);
                        assert(datas[1]['select-multiple'][0] === 'red');
                        assert(datas[1]['input-number'] === 3);
                        assert(datas[1].rate === 3.5);
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
        it('Upload file', (done) => {
            puppeteer.launch(CONST.PUPPETEER_REACT_LAUNCH_OPTION)
                .then((browser) => {
                return browser.newPage()
                    .then((page) => {
                    return unit_1.default.page.goto(page, CONST.REACT_PAGE_PATH, {
                        waitUntil: 'networkidle0'
                    })
                        .then(() => {
                        return unit_1.default.event.console(page, CONST.EVENT_TIMEOUT, () => {
                            return unit_1.default.event.request(page, CONST.EVENT_TIMEOUT, () => {
                                return unit_1.default.dom.setInputFiles(page, CONST.REACT_PAGE_FORM_FILE_SELECTOR, [CONST.RESOURCE_IMAGE_PATH]);
                            }, (request) => {
                                return request.url().indexOf(CONST.REACT_PAGE_UPLOAD_PATH) >= 0;
                            });
                        }, (consoleMessage) => {
                            return consoleMessage.type() === 'log';
                        })
                            .then((consoleMessage) => {
                            const args = consoleMessage.args();
                            assert(args.length === 2);
                            return Promise.all(args.map((arg) => {
                                return arg.jsonValue();
                            }));
                        })
                            .then((datas) => {
                            assert(datas[0] === CONST.REACT_PAGE_CONSOLE_FORM_MESSAGE_UPLOAD);
                            assert(datas[1].file.name === CONST.RESOURCE_FILE_NAME);
                        });
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
