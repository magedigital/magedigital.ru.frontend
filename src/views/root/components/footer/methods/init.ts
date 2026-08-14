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
            bubbleNode.style.transform = '';

            return;
        }

        const percent =
            (window.heightValue / 2 - bannerNode.getBoundingClientRect().y) /
            bannerNode.offsetHeight /
            2;

        bubbleNode.style.transform = `translate(0,${-200 * percent}px)`;
    };

    document.addEventListener('customResize', onScroll);
    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        document.removeEventListener('customResize', onScroll);
        pageNode.removeEventListener('scroll', onScroll);
    };

    this.timers.start = setTimeout(() => {
        onScroll();
    }, 10);

    let gravitation = 1.14;
    let bound = 0;
    let loop = 0;
    let boundGravitation = 0.99;
    let scale = 0.2;
    let tick = performance.now();

    const glassAnimate = () => {
        if (appStore.getState().device === 'mobile') {
            glassNode.style.transform = `scale(1)`;
            glassNode.style.filter = `blur(4px)`;

            this.animateId = requestAnimationFrame(glassAnimate);

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
                gravitation = 1.14;

                if (loop === 0) {
                    bound = 2.8;
                } else if (loop === 1) {
                    bound = 2;
                } else if (loop === 2) {
                    bound = 1.8;
                } else if (loop === 3) {
                    bound = 1.6;
                }

                boundGravitation = 0.984 + ((3 - bound) * 0.01) / 1.5;
                loop += 1;

                if (loop >= 4) {
                    loop = 0;
                }
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
