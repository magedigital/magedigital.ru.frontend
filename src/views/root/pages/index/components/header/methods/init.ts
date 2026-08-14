import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

// function cubicBezier(t: number, x1: number, y1: number, x2: number, y2: number): [number, number] {
//     t = Math.max(0, Math.min(1, t));
//     const x = cubicInterpolate(t, 0, x1, x2, 1);
//     const y = cubicInterpolate(t, 0, y1, y2, 1);
//     return [x, y];
// }

// function cubicInterpolate(t: number, p0: number, p1: number, p2: number, p3: number) {
//     const t2 = t * t;
//     const t3 = t2 * t;
//     const oneMinusT = 1 - t;
//     const oneMinusT2 = oneMinusT * oneMinusT;
//     const oneMinusT3 = oneMinusT2 * oneMinusT;

//     return p0 * oneMinusT3 + p1 * 3 * t * oneMinusT2 + p2 * 3 * t2 * oneMinusT + p3 * t3;
// }

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');
    const boxNode = this.parent.current!.querySelector<HTMLElement>('.indexHeader__box');
    const colorNode = this.parent.current!.querySelector<HTMLElement>('.indexHeader__boxColor');
    const frameNode = this.parent.current!.querySelector<HTMLElement>('.indexHeader__boxFrame');
    const frameInnerNode = this.parent.current!.querySelector<HTMLElement>(
        '.indexHeader__boxFrameInner',
    );

    if (!pageNode || !boxNode || !colorNode || !frameNode || !frameInnerNode) {
        return;
    }

    const onScroll = () => {
        if (appStore.getState().device === 'mobile') {
            colorNode.style.height = '';
            colorNode.style.transform = '';
            frameInnerNode.style.borderRadius = '';
            frameNode.style.height = '';
            frameNode.style.transform = '';

            return;
        }

        let percent = (boxNode.offsetTop - boxNode.getBoundingClientRect().y) / boxNode.offsetTop;

        if (percent < 0) {
            percent = 0;
        }
        if (percent > 1) {
            percent = 1;
        }

        // const c = cubicBezier(percent, 0.84, -0.7, 0.2, 1.59);

        let colorTop = boxNode.offsetTop - boxNode.getBoundingClientRect().y;
        let colorHeight = (160 + (950 - 160) * percent) * window.sizeK;

        if (colorHeight > 950 * window.sizeK) {
            colorHeight = 950 * window.sizeK;
        }

        const colorMaxTop =
            this.parent.current!.offsetHeight -
            boxNode.offsetHeight -
            boxNode.offsetTop -
            colorHeight;

        if (colorTop > colorMaxTop) {
            colorTop = colorMaxTop;
        }

        colorNode.style.height = `${colorHeight}px`;
        colorNode.style.transform = `translate(0px,${colorTop}px)`;

        const frameScale = 0.285 + percent * (1 - 0.285);
        const frameLeft = (-10 + percent * 10) * window.sizeK;
        const frameTop = (-356 + percent * 356) * window.sizeK;
        const frameHeight = (660 + 250 - 250 * percent) * window.sizeK;
        const frameRadius = (24 + 60 - 60 * percent) * window.sizeK;

        frameInnerNode.style.borderRadius = `${frameRadius}px`;
        frameNode.style.height = `${frameHeight}px`;
        frameNode.style.transform = `translate(${frameLeft}px,${frameTop}px) scale(${frameScale})`;
    };

    document.addEventListener('customResize', onScroll);
    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        document.removeEventListener('customResize', onScroll);
        pageNode.removeEventListener('scroll', onScroll);
    };

    this.timers.animate = setTimeout(async () => {
        await this.asyncSetState({ titleIsAnimated: true });
        this.timers.animate = setTimeout(async () => {
            await this.asyncSetState({ textIsAnimated: true });
            this.timers.animate = setTimeout(async () => {
                await this.asyncSetState({ buttonIsAnimated: true });
                this.timers.animate = setTimeout(async () => {
                    await this.asyncSetState({ frameIsAnimated: true });
                    onScroll();
                }, 50);
            }, 50);
        }, 50);
    }, 300);
};

export default init;
