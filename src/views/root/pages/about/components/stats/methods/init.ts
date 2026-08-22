import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    let move = 0;
    const cardsNode = this.parent.current!.querySelector<HTMLElement>('.aboutStats__cards');
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');
    const logoNode = this.parent.current!.querySelector<HTMLElement>('.aboutStats__logo');
    const armNode = this.parent.current!.querySelector<HTMLElement>('.aboutStats__arm');

    if (!cardsNode || !pageNode || !logoNode || !armNode) {
        return;
    }

    const cardsWidth = cardsNode.offsetWidth / 2;
    let time = performance.now();

    const lineMove = () => {
        move += (performance.now() - time) / 4;

        if (move > cardsWidth) {
            move = cardsWidth - move;
        }

        time = performance.now();

        if (move < 0) {
            move = 0;
        }

        cardsNode.style.transform = `translate(${-move}px,0)`;

        this.animateId = requestAnimationFrame(lineMove);
    };

    const onScroll = () => {
        const top = this.parent.current!.offsetTop;
        let progress =
            pageNode.scrollTop / (top + this.parent.current!.offsetHeight - window.heightValue);

        if (progress < 0) {
            progress = 0;
        }

        if (progress > 1) {
            // progress = 1;
        }

        const logoScale = 0.2 + 0.9 * progress;
        const logoTop = -200 * progress;

        logoNode.style.transform = `translate(-50%,${logoTop}rem) scale(${logoScale})`;

        let armProgress = progress;

        if (progress < 0.75) {
            armProgress = 0.75;
        }

        armProgress = (armProgress - 0.75) * 4;

        if (armProgress > 0.5) {
            armProgress = 0.5 + (armProgress - 0.5) / (armProgress < 1 ? 1 : armProgress);
        }

        const armTop = -(appStore.getState().device === 'desktop' ? 450 : 200) * armProgress;

        armNode.style.transform = `translate(-50%,${armTop}rem)`;
    };

    this.animateId = requestAnimationFrame(lineMove);

    document.addEventListener('customResize', onScroll);
    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        document.removeEventListener('customResize', onScroll);
        pageNode.removeEventListener('scroll', onScroll);

        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };

    this.timers.animate = setTimeout(async () => {
        if (this.parent.current!.getBoundingClientRect().y < window.heightValue * (4 / 5)) {
            await this.asyncSetState({ isAnimate: true });
        } else {
            this.timers.animate = setTimeout(async () => {
                await this.asyncSetState({ isAnimate: true });
            }, 440);
        }
    }, 10);
};

export default init;
