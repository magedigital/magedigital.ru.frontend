import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');

    if (!pageNode) {
        return;
    }

    const setStart = () => {
        const cardsNodes = this.parent.current!.querySelectorAll<HTMLElement>(
            '.aboutHistory__galeryCards',
        );

        const device = appStore.getState().device;

        cardsNodes.forEach((c) => {
            const thisCards = c.querySelectorAll<HTMLElement>('.aboutHistory__galeryCard');
            const cardsBound = c.getBoundingClientRect();

            thisCards.forEach((card, i) => {
                const parendBound = this.parent.current!.getBoundingClientRect();

                const cardBound = card.getBoundingClientRect();
                const delayIndex = Math.abs(2 - i);

                const x =
                    device === 'desktop'
                        ? parendBound.x +
                          parendBound.width / 2 -
                          (cardBound.left + cardBound.width / 2)
                        : 0;
                const y =
                    device === 'desktop'
                        ? 0
                        : cardsBound.y +
                          cardsBound.height / 2 -
                          (cardBound.top + cardBound.height / 2);

                card.style.zIndex = `${cardsNodes.length - delayIndex}`;
                card.style.transform = `translate(${x}px,${y}px) rotate(0deg)`;
                card.style.transition = '.4s ease-out';
                card.style.transitionDelay = `${delayIndex * 60 + 250}ms`;
            });
        });
    };

    setStart();

    const onScroll = () => {
        (['top', 'bottom'] as const).forEach((dir) => {
            if (this.animates[dir]) {
                return;
            }

            const cardsNode = this.parent.current!.querySelector<HTMLElement>(
                `.aboutHistory__galeryCards._${dir}`,
            );

            if (!cardsNode) {
                return;
            }

            const cardBound = cardsNode.getBoundingClientRect();

            let k = dir === 'top' ? 2 / 3 : 1;

            if (appStore.getState().device === 'mobile') {
                k = 1 / 4;
            }

            if (cardBound.y < window.heightValue * k) {
                cardsNode.setAttribute('data-animate', 't');
                cardsNode
                    .querySelectorAll<HTMLElement>('.aboutHistory__galeryCard')
                    .forEach((c, i) => {
                        // const thisThumbNode = c.querySelector('.aboutHistory__galeryCardThumb') as HTMLElement
                        c.setAttribute('data-animate', 't');
                        c.style.transform = `translate(0,0) rotate(${i % 2 === 1 ? 15 : -15}deg)`;
                    });

                this.animates[dir] = true;
            }
        });
    };

    onScroll();

    document.addEventListener('customResize', onScroll);
    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        document.removeEventListener('customResize', onScroll);
        pageNode.removeEventListener('scroll', onScroll);
    };
};

export default init;
