import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');

    if (!pageNode) {
        return;
    }

    const setStart = () => {
        const cardsNodes = this.parent.current!.querySelectorAll<HTMLElement>(
            '.aboutHistory__galeryCard',
        );

        cardsNodes.forEach((card, i) => {
            const parendBound = this.parent.current!.getBoundingClientRect();
            const cardBound = card.getBoundingClientRect();

            const x =
                parendBound.x + parendBound.width / 2 - (cardBound.left + cardBound.width / 2);
            const y =
                parendBound.y + parendBound.height / 2 - (cardBound.top + cardBound.height / 2);

            card.style.transform = `translate(${x}px,${y}px)`;
            card.style.transition = '.4s ease-out';
            card.style.transitionDelay = `${i * 60}ms`;
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

            const k = dir === 'top' ? 2 / 3 : 1;

            if (cardBound.y < window.heightValue * k) {
                cardsNode
                    .querySelectorAll<HTMLElement>('.aboutHistory__galeryCard')
                    .forEach((c) => {
                        c.setAttribute('data-animate', 't');
                        c.style.transform = '';
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
