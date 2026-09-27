import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const close: I['close'] = function (this: I) {
    if (this.closeCallback) {
        this.closeCallback();
    }

    appStore.getState().closePopup({ name: this.name });
    // window.history.back();
};

export default close;
