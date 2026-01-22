import I from '../types.ts';

const onlineHandler: I['onlineHandler'] = function () {
    if (!this.onlineCb) {
        return;
    }

    this.isOnline = window.navigator.onLine;

    this.onlineCb(window.navigator.onLine);
};

export default onlineHandler;
