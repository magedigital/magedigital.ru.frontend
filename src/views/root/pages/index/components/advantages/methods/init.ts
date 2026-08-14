import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');
    const topNode = this.parent.current!.querySelector<HTMLElement>('.indexAdvantages__top');
    const topBackNode = this.parent.current!.querySelector<HTMLElement>(
        '.indexAdvantages__topBack',
    );
    const contentNode = this.parent.current!.querySelector<HTMLElement>(
        '.indexAdvantages__content',
    );

    if (!pageNode || !topNode || !topBackNode || !contentNode) {
        return;
    }

    // const parentHeight = this.parent.current!.offsetHeight;

    const onScroll = () => {
        let backHeight =
            window.heightValue - topNode.getBoundingClientRect().y + 200 / window.sizeK;
        let backPercent =
            (window.heightValue - topNode.getBoundingClientRect().y) / (window.heightValue / 2);

        if (backPercent < 0) {
            backPercent = 0;
        }
        if (backPercent > 1) {
            backPercent = 1;
        }

        topBackNode.style.background = `rgba(0,0,0,${backPercent})`;

        if (backHeight < 150) {
            backHeight = 150;
        }
        if (backHeight > 1000) {
            backHeight = 1000;
        }

        if (appStore.getState().device === 'mobile') {
            if (backHeight < 150) {
                backHeight = 150;
            }
            if (backHeight > 578) {
                backHeight = 578;
            }
        }

        backHeight *= window.sizeK;

        topBackNode.style.height = `${backHeight}px`;

        const cards = this.parent.current!.querySelectorAll<HTMLElement>(
            '.indexAdvantages__contentCard',
        );

        let offset = 120 * window.sizeK;
        let cardContentTop = 68;
        let contentOffset = 168 * window.sizeK;

        if (appStore.getState().device === 'mobile') {
            offset = 64 * window.sizeK;
            cardContentTop = 19;
            contentOffset = -60 * window.sizeK;
        }

        let contentTop = contentNode.getBoundingClientRect().y;

        if (contentTop < -(contentNode.offsetHeight - window.heightValue)) {
            contentTop = -(contentNode.offsetHeight - window.heightValue);
        }

        let contentDiff = window.heightValue - contentTop;

        const min = 300 * window.sizeK;

        if (contentDiff < min) {
            contentDiff = min;
        }

        cards.forEach((s, i) => {
            const cardContentNode = s.querySelector<HTMLElement>('.indexAdvantages__cardContent');

            const thisOffset = offset * (cards.length - i);

            let cardTop = s.offsetTop - contentDiff + thisOffset;

            // if (i === 1) {
            //     cardTop = (s.offsetTop - contentDiff) * 1 + thisOffset;
            // }

            let contentTopPercent = cardTop >= contentOffset ? 0 : -(cardTop - contentOffset) / 100;

            if (contentTopPercent > 1) {
                contentTopPercent = 1;
            }

            contentTopPercent = 1 - contentTopPercent;

            if (cardTop < contentOffset) {
                cardTop = contentOffset;
            }

            cardContentNode!.style.transform = `translate(0,${-contentTopPercent * cardContentTop * window.sizeK}px)`;

            s.style.transform = `translate(0,${-cardTop}px)`;
        });
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
};

export default init;
