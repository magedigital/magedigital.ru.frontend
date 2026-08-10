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
        if (backHeight > 800) {
            backHeight = 800;
        }

        backHeight *= window.sizeK;

        topBackNode.style.height = `${backHeight}px`;

        const cards = this.parent.current!.querySelectorAll<HTMLElement>(
            '.indexAdvantages__contentCard',
        );

        let contentTop = contentNode.getBoundingClientRect().y;

        if (contentTop < -(contentNode.offsetHeight - window.heightValue)) {
            contentTop = -(contentNode.offsetHeight - window.heightValue);
        }

        const offset = 42;
        const servicesH = window.heightValue / 7;

        let contentDiff = window.heightValue - servicesH - contentTop;

        const min = 150;

        if (contentDiff < -min) {
            contentDiff = -min;
        }

        let totalTop = 0;

        const step = 1 / cards.length;

        cards.forEach((s, i) => {
            const tMin = i * step;
            const percent =
                (contentDiff + (60 * window.sizeK + offset) * i) /
                (contentNode.offsetHeight - servicesH);
            const countNode = s.querySelector<HTMLElement>('.indexAdvantages__cardCount');

            let tPercent = (percent - tMin) / step;

            if (tPercent < 0) {
                tPercent = 0;
            }

            let countPercent = tPercent;

            if (countPercent > 1) {
                countPercent = 1;
            }

            countPercent = 1 - countPercent;

            if (countNode && !countNode.getAttribute('data-end')) {
                countNode.style.transform = `translate(${-50 * countPercent}px,0) rotate(${-10 * countPercent}deg) scale(${1 + 0.3 * countPercent})`;
                countNode.style.opacity = `${1 - countPercent}`;

                if (countPercent === 0) {
                    countNode.setAttribute('data-end', 't');
                }
            }

            let thisTop = contentDiff + i * offset;

            if (tPercent) {
                thisTop -= (contentNode.offsetHeight / cards.length) * tPercent;
            }

            thisTop -= offset * window.sizeK;

            s.style.transform = `translate(0,${thisTop}px)`;

            totalTop = thisTop + s.offsetHeight;
        });

        this.parent.current!.style.height = `${totalTop + topNode.offsetHeight}px`;
    };

    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        pageNode.removeEventListener('scroll', onScroll);
    };

    setTimeout(()=>{
        onScroll();
    },10)
};

export default init;
