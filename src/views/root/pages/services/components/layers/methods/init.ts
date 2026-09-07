import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');
    const topNode = this.parent.current!.querySelector<HTMLElement>('.servicesLayers__top');
    const topBackNode = this.parent.current!.querySelector<HTMLElement>('.servicesLayers__topBack');
    const contentNode = this.parent.current!.querySelector<HTMLElement>('.servicesLayers__content');

    if (!pageNode || !topNode || !topBackNode || !contentNode) {
        return;
    }

    // const parentHeight = this.parent.current!.offsetHeight;

    const margin = 64 * window.sizeK;

    const onScroll = () => {
        if (!this.parent.current) {
            return;
        }

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

        if (backHeight < 150) {
            backHeight = 150;
        }
        if (backHeight > 840) {
            backHeight = 840;
        }

        if (appStore.getState().device === 'mobile') {
            if (backHeight < 150) {
                backHeight = 150;
            }
            if (backHeight > 680) {
                backHeight = 680;
            }
        }

        backHeight *= window.sizeK;

        topBackNode.style.height = `${backHeight}px`;

        const cards = this.parent.current!.querySelectorAll<HTMLElement>(
            '.servicesLayers__contentCard',
        );

        let offset = 88 * window.sizeK;
        let cardContentTop = 156;

        if (appStore.getState().device === 'mobile') {
            offset = 64 * window.sizeK;
            cardContentTop = 70;
        }

        const contentTop = contentNode.getBoundingClientRect().y;
        let contentDiff = window.heightValue - contentTop;

        const min = offset * cards.length * window.sizeK;

        if (contentDiff < min) {
            contentDiff = min;
        }

        cards.forEach((s, i) => {
            const cardContentNode = s.querySelector<HTMLElement>('.servicesLayers__cardContent');
            const arrowNode = s.querySelector<HTMLElement>('.servicesLayers__cardServicesArrow');
            const cardThumbNode = s.querySelector<HTMLElement>('.servicesLayers__cardThumb');
            const cardServicesNode = s.querySelector<HTMLElement>('.servicesLayers__cardServices');
            const cardServicesNodes = cardContentNode!.querySelectorAll<HTMLElement>(
                '.servicesLayers__cardService',
            );
            const thisOffset = offset * (cards.length - i);

            let cardTop = s.offsetTop - contentDiff + thisOffset;

            let contentTopPercent = cardTop >= 0 ? 0 : -cardTop / 150;

            if (contentTopPercent > 1) {
                contentTopPercent = 1;
            }

            contentTopPercent = 1 - contentTopPercent;

            const thisMargin = i === cards.length - 1 ? 0 : margin;

            const servicesOffset = cardServicesNode!.offsetTop + 200;
            let servicesProgress =
                (-cardTop - servicesOffset) /
                (s.offsetHeight - offset - thisMargin - servicesOffset);

            if (servicesProgress < 0) {
                servicesProgress = 0;
            }
            // if (servicesProgress > 1) {
            //     servicesProgress = 1;
            // }

            const servicesArrowOffset = cardServicesNode!.offsetTop + 300 * window.sizeK;
            let servicesArrowProgress =
                (-cardTop - servicesArrowOffset) /
                (s.offsetHeight - offset - thisMargin - servicesOffset);

            if (servicesArrowProgress < 0) {
                servicesArrowProgress = 0;
            }
            if (servicesArrowProgress > 1) {
                servicesArrowProgress = 1;
            }

            const thumbOffset = cardThumbNode!.offsetHeight + thisMargin + offset;
            let thumbProgress =
                (-cardTop - thumbOffset) / (s.offsetHeight - thumbOffset - offset - thisMargin);

            if (appStore.getState().device === 'mobile') {
                thumbProgress = servicesArrowProgress;
            }

            if (thumbProgress < 0) {
                thumbProgress = 0;
            }
            if (thumbProgress > 1) {
                thumbProgress = 1;
            }

            const servicesArrowTop =
                servicesArrowProgress * (cardServicesNode!.offsetHeight - arrowNode!.offsetHeight);

            const servicesStep = 1 / cardServicesNodes.length;
            // const k = appStore.getState().device === 'desktop' ? 0.3 : 0.5;

            cardServicesNodes.forEach((n, ni) => {
                const optionArrowNode = n.querySelector<HTMLElement>(
                    '.servicesLayers__cardServiceArrow',
                );
                let thisProgress = servicesArrowProgress;
                thisProgress -= ni * servicesStep;
                thisProgress /= servicesStep;

                if (thisProgress > 0.5) {
                    thisProgress = 1 - thisProgress;
                }
                if (thisProgress < 0) {
                    thisProgress = 0;
                }
                if (thisProgress > 1) {
                    thisProgress = 1;
                }

                let colorProgress = servicesArrowProgress;
                colorProgress -= ni * servicesStep;
                colorProgress /= servicesStep;

                let heightProgress = colorProgress;

                if (heightProgress < 0) {
                    heightProgress = 0;
                }

                if (heightProgress > 1) {
                    heightProgress = 1;
                }

                if (appStore.getState().device === 'desktop') {
                    heightProgress = 0;
                }

                const color = colorProgress < 0 || colorProgress > 1 ? '#fff' : '#000';

                if (appStore.getState().device === 'desktop') {
                    n.style.color = color;
                }

                const optionLeft = appStore.getState().device === 'desktop' ? 0 : thisProgress * 50;

                n.style.transform = `translate(${optionLeft}px,${-heightProgress * 200 * window.sizeK}px) scale(${1 + thisProgress * 0.5})`;

                if (optionArrowNode) {
                    optionArrowNode.style.transform = `translate(${(1 - thisProgress * 2) * -30}px,-50%)`;
                }
            });

            arrowNode!.style.transform = `translate(0,${servicesArrowTop}px)`;

            if (cardTop < 0) {
                cardTop = 0;
            }

            cardContentNode!.style.transform = `translate(0,${-contentTopPercent * cardContentTop * window.sizeK}px)`;
            s.style.transform = `translate(0,${-cardTop}px)`;

            if (appStore.getState().device === 'mobile') {
                cardThumbNode!.style.transform = `translate(0,${-(cardServicesNode!.offsetHeight - 0 * window.sizeK) * (1 - thumbProgress)}px)`;
            } else {
                cardThumbNode!.style.transform = `translate(0,${(s.offsetHeight - thumbOffset) * thumbProgress}px)`;
            }
        });
    };

    const scrollHandler = () => {
        this.animateId = requestAnimationFrame(onScroll);
    };

    document.addEventListener('customResize', onScroll);
    pageNode.addEventListener('scroll', scrollHandler);

    this.unmountHandlers.all = () => {
        document.removeEventListener('customResize', onScroll);
        pageNode.removeEventListener('scroll', scrollHandler);

        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };

    this.timers.start = setTimeout(() => {
        onScroll();
    }, 10);

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
