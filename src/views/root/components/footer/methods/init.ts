import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');

    if (!pageNode) {
        return;
    }

    const bannerNode = this.parent.current!.querySelector<HTMLElement>('.footer__banner');
    const bubbleNode = this.parent.current!.querySelector<HTMLElement>('.footer__bannerBubble');
    const glassNode = this.parent.current!.querySelector<HTMLElement>('.footer__glass');
    const contentNode = this.parent.current!.querySelector<HTMLElement>('.footer__content');

    if (!bannerNode || !bubbleNode || !contentNode || !glassNode) {
        return;
    }

    const onScroll = () => {
        if (appStore.getState().device === 'mobile') {
            return;
        }

        const percent =
            (window.heightValue / 2 - bannerNode.getBoundingClientRect().y) /
            bannerNode.offsetHeight /
            2;

        bubbleNode.style.transform = `translate(0,${-200 * percent}px)`;
    };

    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        pageNode.removeEventListener('scroll', onScroll);
    };

    let gravitation = 1.03;
    let bound = 0;
    let boundGravitation = 0.99;
    let scale = 0.2;
    let tick = performance.now();

    const glassAnimate = () => {
        if (appStore.getState().device === 'mobile') {
            glassNode.style.transform = `scale(1)`;
            glassNode.style.filter = `blur(4px)`;

            return;
        }

        let tickDiff = Math.round((performance.now() - tick) / 8);

        const tickAnimate = () => {
            scale += 0.01 * gravitation;
            scale -= 0.01 * bound;
            gravitation *= 1.0025;

            if (bound > 0) {
                bound *= boundGravitation;
            } else {
                bound = 0;
            }

            if (scale >= 1) {
                scale = 1;
                gravitation = 1.02 + Math.random() * 0.25;
                bound = 1.5 + Math.random() * 1.5;
                boundGravitation = 0.984 + ((3 - bound) * 0.01) / 1.5;
            }
        };

        if (tickDiff > 10) {
            tickDiff = 10;
        }

        while (tickDiff) {
            tickAnimate();
            tickDiff -= 1;
        }

        glassNode.style.transform = `scale(${scale})`;
        glassNode.style.filter = `blur(${(1 - scale) * 23}px)`;

        tick = performance.now();

        this.animateId = requestAnimationFrame(glassAnimate);
    };

    this.animateId = requestAnimationFrame(glassAnimate);

    this.unmountHandlers.all = () => {
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };
};

export default init;
