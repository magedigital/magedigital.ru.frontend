import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const inputKeysHandler: I['inputKeysHandler'] = async function (e) {
    const device = appStore.getState().device;

    if (device === 'desktop') {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
        }
    }
};

export default inputKeysHandler;
