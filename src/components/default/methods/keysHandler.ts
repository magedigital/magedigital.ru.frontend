import I, { KeysT } from '../types.ts';

const keysHandler: I['keysHandler'] = async function (this: I, e) {
    if (typeof this.keysCallback !== 'function') {
        return;
    }

    const code = e.code as KeysT;

    if (code === 'Enter' && e.shiftKey === true) {
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
