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
    const flashNode = this.parent.current!.querySelector<HTMLElement>('.footer__flash');
    const ringNode = this.parent.current!.querySelector<HTMLElement>('.footer__ring');
    const contentNode = this.parent.current!.querySelector<HTMLElement>('.footer__content');

    if (!bannerNode || !bubbleNode || !contentNode || !glassNode || !flashNode || !ringNode) {
        return;
    }

    const onScroll = () => {
        if (appStore.getState().device === 'mobile') {
            bubbleNode.style.transform = '';

            return;
        }

        const percent =
            (window.heightValue / 1.3 - bannerNode.getBoundingClientRect().y) /
            bannerNode.offsetHeight;

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

    let gravitation = 1.01;
    let bound = 0;
    let loop = 0;
    let boundGravitation = 0.99;
    let scale = 0.2;
    let tick = performance.now();

    const glassAnimate = () => {
        if (appStore.getState().device === 'mobile') {
            glassNode.style.transform = `scale(1)`;
            glassNode.style.filter = `blur(4px)`;

            // this.animateId = requestAnimationFrame(glassAnimate);

            return;
        }

        let tickDiff = Math.round((performance.now() - tick) / 8);

        const tickAnimate = () => {
            scale += 0.01 * gravitation;
            scale -= 0.01 * bound;
            gravitation *= 1.0005;

            if (bound > 0) {
                bound *= boundGravitation;
            } else {
                bound = 0;
            }

            if (scale >= 1) {
                scale = 1;
                gravitation = 1.01;

                if (loop === 0) {
                    bound = 2.2;
                } else if (loop === 1) {
                    bound = 1.8;
                } else if (loop === 2) {
                    bound = 1.6;
                } else if (loop === 3) {
                    bound = 1.4;
                }

                boundGravitation = 0.992;
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

        // this.animateId = requestAnimationFrame(glassAnimate);
    };

    if (0) {
        glassAnimate();
    }

    const easeInOutSine = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;
    const easeInCubic = (x: number) => x * x * x;

    let last = performance.now();

    const s = {
        t: 0,
        acc: 0,
        sp: 1.01,
        l: 0,
        o: 0,
        c: 0.99,
        u: 0.2,
        ph: 'fall',
        bu: 0.65,
        bv: 0,
        tp: 0,
    };

    const animate = (now: number) => {
        const blurK = glassNode.offsetWidth / 1100;
        const k = 1;
        const TAU = Math.PI * 2;
        const dtMs = Math.min(50, now - last) / k;
        last = now;
        const dt = dtMs / 1000;
        s.t += dt;
        const t = s.t;
        let u = 1;
        const c = t % 5.4;
        let fl = 0;
        let rs = 0;
        let ro = 0;

        if (c < 1) u = 0.65 + 0.35 * easeInCubic(c);
        else if (c < 2.6) {
            const r = c - 1;
            u = 1 - 0.09 * Math.sin((TAU * r) / 0.8) * Math.exp(-r / 0.35);
            fl = 0.75 * Math.exp(-r / 0.15);
            if (r < 0.8) {
                rs = 0.8 + 0.9 * (r / 0.8);
                ro = 0.85 * (1 - r / 0.8);
            }
        } else if (c < 4.8) u = 1 - 0.35 * easeInOutSine((c - 2.6) / 2.2);
        else u = 0.65;

        flashNode.style.opacity = `${fl}`;
        ringNode.style.opacity = `${ro}`;
        ringNode.style.transform = `scale(${rs || 0.8})`;

        glassNode.style.transform = `scale(${u})`;
        glassNode.style.filter = `blur(${Math.max(0, 23 * (1 - u) * blurK)}px)`;

        this.animateId = requestAnimationFrame(animate);
    };

    this.animateId = requestAnimationFrame(animate);

    this.unmountHandlers.all = () => {
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };
};

export default init;
