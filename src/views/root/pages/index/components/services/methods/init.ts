import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');
    const topNode = this.parent.current!.querySelector<HTMLElement>('.indexServices__top');
    const topBackNode = this.parent.current!.querySelector<HTMLElement>('.indexServices__topBack');
    const contentNode = this.parent.current!.querySelector<HTMLElement>('.indexServices__content');

    if (!pageNode || !topNode || !topBackNode || !contentNode) {
        return;
    }

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

        topBackNode.style.background = `rgba(82,39,255,${backPercent})`;

        if (backHeight < 150) {
            backHeight = 150;
        }
        if (backHeight > 800) {
            backHeight = 800;
        }

        backHeight *= window.sizeK;

        topBackNode.style.height = `${backHeight}px`;

        const services = this.parent.current!.querySelectorAll<HTMLElement>(
            '.indexServices__contentService',
        );

        let contentTop = contentNode.getBoundingClientRect().y;

        if (contentTop < -(contentNode.offsetHeight - window.heightValue)) {
            contentTop = -(contentNode.offsetHeight - window.heightValue);
        }

        const offset = 42;
        const servicesH = window.heightValue / 10;

        let contentDiff = window.heightValue - servicesH - contentTop;

        const min = 150;
        let totalTop = 0;

        if (contentDiff < -min) {
            contentDiff = -min;
        }

        const step = 1 / services.length;

        services.forEach((s, i) => {
            const tMin = i * step;
            const percent =
                (contentDiff + (60 * window.sizeK + offset) * i) /
                (contentNode.offsetHeight - servicesH);

            let tPercent = (percent - tMin) / step;

            if (tPercent < 0) {
                tPercent = 0;
            }

            let scale = 0.8 + i * 0.1 + (0.2 - i * 0.1) * (0.4 + percent);

            if (i === services.length - 1) {
                scale = 1;
            }

            if (scale > 1) {
                scale = 1;
            }

            let thisTop = contentDiff + i * offset;

            if (tPercent) {
                thisTop -= s.offsetHeight * tPercent;
            }

            thisTop -= offset * window.sizeK;

            s.style.transform = `translate(0,${thisTop}px) scale(${scale})`;
            totalTop = thisTop + s.offsetHeight;
        });

        this.parent.current!.style.height = `${totalTop + topNode.offsetHeight}px`;
    };

    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        pageNode.removeEventListener('scroll', onScroll);
    };

    setTimeout(() => {
        onScroll();
    }, 10);
};

export default init;
