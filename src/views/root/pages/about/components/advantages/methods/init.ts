import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');
    const parentNode = this.parent.current!;
    const cardsNode = parentNode.querySelector<HTMLElement>('.aboutAdvantages__cards');
    const cardNode = parentNode.querySelector<HTMLElement>('.aboutAdvantages__card');
    const cardsNodes = parentNode.querySelectorAll<HTMLElement>('.aboutAdvantages__card');
    const cardsTops: Record<number, number> = {};

    if (!pageNode || !cardsNode || !cardNode) {
        return;
    }

    cardsNodes.forEach((n, i) => {
        cardsTops[i] = n.offsetTop - cardsNode.offsetTop - 80 * i * window.sizeK;
    });

    const getTop = (c: HTMLElement, i: number): number => {
        let thisTop =
            pageNode.scrollTop - parentNode.offsetTop - cardsTops[i] - cardsNode.offsetTop + 100;

        if (thisTop < 0) {
            thisTop = 0;
        }

        let max =
            cardsNode.offsetHeight +
            cardsNode.offsetTop -
            c.offsetTop -
            c.offsetHeight -
            (cardsNodes.length - i - 1) * 80 * window.sizeK;

        if (max < 0) {
            max = 0;
        }

        if (thisTop > max) {
            thisTop = max;
        }

        return thisTop;
    };

    const onScroll = () => {
        let progress =
            (pageNode.scrollTop - parentNode.offsetTop) /
            (cardsNode.offsetHeight -
                (cardNode.offsetHeight + 80 * (cardsNodes.length - 1) * window.sizeK));

        if (progress < 0) {
            progress = 0;
        }
        if (progress > 1) {
            progress = 1;
        }

        cardsNodes.forEach((card, i) => {
            const thisTop = +getTop(card, i).toFixed(0);
            const prevTop = i === 0 ? undefined : getTop(cardsNodes[i - 1], i - 1);

            let cardProgress = 0;

            if (prevTop !== undefined) {
                cardProgress = prevTop / (card.offsetHeight - 80 * window.sizeK);

                if (cardProgress > 1) {
                    cardProgress = 1;
                }

                cardProgress = 1 - cardProgress;
            }

            card.style.transform = `translate(${-cardProgress * 40 * i * window.sizeK}px,${thisTop}px) rotate(${cardProgress * 10}deg)`;
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
