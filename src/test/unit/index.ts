import data from './data';
import dom from './dom';
import event from './event';
import page from './page';
import reactDom from './react_dom';
import time from './time';

export default function() {
    describe('Unit', function() {
        this.timeout(10000);
        describe('Unit#Dom', () => {
            dom();
            reactDom();
        });
        event();
        time();
        page();
        data();
    });
}
