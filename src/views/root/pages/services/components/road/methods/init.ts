import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');
    const headNode = this.parent.current!.querySelector<HTMLElement>('.servicesRoad__head');
    const contentNode = this.parent.current!.querySelector<HTMLElement>('.servicesRoad__content');

    if (!pageNode || !headNode || !contentNode) {
        return;
    }

    const layersNodes = this.parent.current!.querySelectorAll<HTMLElement>(
        '.servicesRoad__headLayer',
    );

    const onScroll = () => {
        const topOffset = appStore.getState().device === 'desktop' ? 150 : 120;
        const offset = appStore.getState().device === 'desktop' ? 64 : 40;

        let progress =
            (pageNode.scrollTop + window.heightValue - this.parent.current!.offsetTop) /
            headNode.offsetHeight;

        if (progress < 0) {
            progress = 0;
        }

        if (progress > 1) {
            progress = 1;
        }

        progress = 1 - progress;

        layersNodes.forEach((n, i) => {
            const thisTop =
                -progress * (n.offsetTop + topOffset * window.sizeK - offset * window.sizeK * i);
            n.style.transform = `translate(0,${thisTop}px)`;
        });

        if (
            !contentNode.getAttribute('data-animate') &&
            contentNode.getBoundingClientRect().y < window.heightValue * (2 / 3)
        ) {
            contentNode.setAttribute('data-animate', 't');
        }
    };

    pageNode.addEventListener('scroll', onScroll);
    this.unmountHandlers.all = () => {
        document.removeEventListener('customResize', onScroll);
        pageNode.removeEventListener('scroll', onScroll);
    };

    onScroll();
};

export default init;
