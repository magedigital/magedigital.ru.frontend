import I from '../types.ts';

import { appStore } from '../../../store/store.tsx';
import removeTransition from '../../../utils/removeTransition.ts';

window.mediaM = 700;

const resizeHandler: I['resizeHandler'] = async function (force) {
    window.widthValue = document.documentElement.clientWidth;
    window.heightValue = document.documentElement.clientHeight;

    document.body.style.setProperty('--wwidth', `${window.widthValue}px`);
    document.body.style.setProperty('--wheight', `${window.heightValue}px`);

    if (force) {
        if (document.documentElement.clientWidth <= window.mediaM) {
            appStore.getState().setDevice('mobile');
        } else {
            appStore.getState().setDevice('desktop');
        }
    }

    if (!force) {
        if (window.widthPrevValue >= window.mediaM && window.widthValue < window.mediaM) {
            appStore.getState().setDevice('mobile');
        }
        if (window.widthPrevValue < window.mediaM && window.widthValue >= window.mediaM) {
            appStore.getState().setDevice('desktop');
        }
    }

    if (window.widthPrevValue !== window.widthValue) {
        document.dispatchEvent(new CustomEvent('changeWidthWindow'));

        removeTransition({});
    }

    if (window.heightPrevValue !== window.heightValue) {
        document.dispatchEvent(new CustomEvent('changeHeightWindow'));

        const domInner = document.querySelector('.body__inner') as HTMLElement;

        if (domInner) {
            domInner.style.height = `${window.heightValue}px`;
        }

        removeTransition({ item: '._PAGE', isCurrent: true });
    }

    window.widthPrevValue = window.widthValue;
    window.heightPrevValue = window.heightValue;
};

export default resizeHandler;
