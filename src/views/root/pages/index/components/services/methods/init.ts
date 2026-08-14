import { appStore } from '@/src/store/store.tsx';

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

        if (appStore.getState().device === 'mobile') {
            if (backHeight < 150) {
                backHeight = 150;
            }
            if (backHeight > 530) {
                backHeight = 530;
            }
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

        let offset = 60 * window.sizeK;
        let servicesH = 130 * window.sizeK;
        let br = 150;

        if (appStore.getState().device === 'mobile') {
            offset = 24 * window.sizeK;
            servicesH = 64 * window.sizeK;
            br = 220;
        }

        let contentDiff = window.heightValue - servicesH - contentTop;

        const min = 150 * window.sizeK;
        let totalTop = 0;

        if (contentDiff < -min) {
            contentDiff = -min;
        }

        const step = 1 / services.length;
        // let firstPercent = 0;

        services.forEach((s, i) => {
            const tMin = i * step;
            const percent =
                (contentDiff + (60 * window.sizeK + offset) * i) /
                (contentNode.offsetHeight - servicesH);

            let tPercent = (percent - tMin) / step;
            let thisTop = contentDiff + i * offset;

            if (i === 1) {
                if (tPercent > -0.75 && tPercent < 0) {
                    thisTop -= -(-0.75 - tPercent) * br;
                }
                if (tPercent >= 0 && tPercent < 0.75) {
                    thisTop -= br * 2 * 0.75 + (-0.75 - tPercent) * br;
                }
            }

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
    document.addEventListener('customResize', onScroll);

    this.unmountHandlers.all = () => {
        document.removeEventListener('customResize', onScroll);
        pageNode.removeEventListener('scroll', onScroll);
    };

    this.timers.start = setTimeout(() => {
        onScroll();
    }, 10);
};

export default init;
