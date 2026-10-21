import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    await this.loadPlugins();

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
            const cardServicesNode = s.querySelector<HTMLElement>('.servicesLayers__cardServices');
            const cardServicesNodes = s!.querySelectorAll<HTMLElement>(
                '.servicesLayers__cardService',
            );
            const cardDecorNode = s.querySelector<HTMLElement>('.servicesLayers__cardDecor');
            const cardDecorFigureNode = cardDecorNode?.querySelector<HTMLElement>(
                '.servicesLayers__cardDecorFigure',
            );
            const cardNumberNode = s.querySelector<HTMLElement>('.servicesLayers__cardDecorNumber');
            const cardNumberInnerNode = s.querySelector<HTMLElement>(
                '.servicesLayers__cardDecorNumberInner',
            );
            const cardNumberFirstNode = s.querySelector<HTMLElement>(
                '.servicesLayers__cardDecorNumberInner div',
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

            const cardDecorTop =
                servicesArrowProgress *
                (cardServicesNode!.offsetHeight -
                    cardDecorFigureNode!.getBoundingClientRect().height * 0.5);

            const servicesStep = 1 / cardServicesNodes.length;

            cardServicesNodes.forEach((n, ni) => {
                const isCurrent =
                    servicesArrowProgress >= servicesStep * ni &&
                    servicesArrowProgress <= servicesStep * (ni + 1);

                if (isCurrent) {
                    this.cardAnimates[i]!.animate({ index: ni });
                    n.setAttribute('data-current', 't');

                    if (cardNumberNode && cardNumberInnerNode && cardNumberFirstNode) {
                        cardNumberNode.style.height = `${cardNumberFirstNode.offsetHeight / window.sizeK}rem`;
                        cardNumberInnerNode.style.transform = `translate(0,${-cardNumberFirstNode.offsetHeight * ni}px)`;
                    }
                } else {
                    n.removeAttribute('data-current');
                }
            });

            if (cardDecorNode) {
                const thisTop =
                    appStore.getState().device === 'desktop'
                        ? cardContentNode!.offsetHeight + 96
                        : cardContentNode!.offsetHeight + 10;

                cardDecorNode.style.top = `${thisTop}px`;
                cardDecorNode.style.transform = `translate(0,${cardDecorTop}px)`;
            }

            if (cardTop < 0) {
                cardTop = 0;
            }

            cardContentNode!.style.transform = `translate(0,${-contentTopPercent * cardContentTop * window.sizeK}px)`;
            s.style.transform = `translate(0,${-cardTop}px)`;
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
