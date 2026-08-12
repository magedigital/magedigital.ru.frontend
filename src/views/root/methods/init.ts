import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function () {
    this.resizeHandler(true);

    document.body.style.setProperty('--mediaM', `${window.mediaM}px`);

    window.addEventListener('resize', () => {
        this.resizeHandler();
    });

    setTimeout(() => {
        appStore.getState().showCookies();
    }, 1_000);
};

export default init;
