import I from '../types.ts';

const keysHandler: I['keysHandler'] = async function (e) {
    if (!this.keysCallback || !this.keys) {
        return;
    }

    const code = e.code as (typeof this.keys)[number];

    if (!this.keys.includes(code)) {
        return;
    }

    await this.keysCallback({
        e,
        name: code,
        isMeta: e.metaKey,
        isShift: e.shiftKey,
        isCtrl: e.ctrlKey,
    });
};

export default keysHandler;
