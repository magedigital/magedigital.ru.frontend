import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');

    if (!pageNode) {
        return;
    }

    const bannerNode = this.parent.current!.querySelector<HTMLElement>('.footer__banner');
    const bubbleNode = this.parent.current!.querySelector<HTMLElement>('.footer__bannerBubble');
    const glassNode = this.parent.current!.querySelector<HTMLElement>('.footer__glass');
    const contentNode = this.parent.current!.querySelector<HTMLElement>('.footer__content');

    if (!bannerNode || !bubbleNode || !contentNode || !glassNode) {
        return;
    }

    const onScroll = () => {
        const percent =
            (window.heightValue / 2 - bannerNode.getBoundingClientRect().y) /
            bannerNode.offsetHeight;

        bubbleNode.style.transform = `translate(0,${-200 * percent}px)`;

        console.log(percent);
    };

    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        pageNode.removeEventListener('scroll', onScroll);
    };

    const contentBound = contentNode.getBoundingClientRect();
    const glassBound = glassNode.getBoundingClientRect();
    const glassTop = glassBound.y - contentBound.y;
    const glassRight = contentBound.x + contentBound.width - (glassBound.x + glassBound.width);
    const glassBottom = contentBound.y + contentBound.height - (glassBound.y + glassBound.height);
    const glassLeft = glassBound.x - contentBound.x;

    let gravitation = 1.03;
    let bound = 0;
    let boundGravitation = 0.99;
    let scale = 0.2;
    let rotate = 0;
    let rotateDir = 1;
    let rotateK = 1;
    let translateX = 0;
    let translateXK = 1;
    let translateXDir = 1;
    let translateY = 0;
    let translateYK = 1;
    let translateYDir = 1;
    let tick = performance.now();

    const glassAnimate = () => {
        let tickDiff = Math.round((performance.now() - tick) / 8);

        const tickAnimate = () => {
            scale += 0.01 * gravitation;
            scale -= 0.01 * bound;
            gravitation *= 1.0025;
            rotate += rotateDir * rotateK;
            translateX += translateXDir * translateXK;
            translateY += translateYDir * translateYK;

            if (bound > 0) {
                bound *= boundGravitation;
            } else {
                bound = 0;
            }

            if (scale >= 1) {
                scale = 1;
                gravitation = 1.05 + Math.random() * 0.25;
                bound = 2 + Math.random() * 1;
                boundGravitation = 0.98 + ((3 - bound) * 0.01) / 1;

                rotateDir = Math.random() > 0.5 ? 1 : -1;
                rotateK = 0.2 * bound;

                translateXDir = Math.random() > 0.5 ? 1 : -1;
                translateYDir = Math.random() > 0.5 ? 1 : -1;

                if (-translateY > glassTop) {
                    translateYDir = 1;
                }
                if (translateY > glassBottom) {
                    translateYDir = -1;
                }
                if (-translateX > glassLeft) {
                    translateXDir = 1;
                }
                if (translateX > glassRight) {
                    translateXDir = -1;
                }

                translateXK = 0.1 * bound;
                translateYK = 0.2 * bound;
            }
        };

        if (tickDiff > 10) {
            tickDiff = 10;
        }

        while (tickDiff) {
            tickAnimate();
            tickDiff -= 1;
        }

        glassNode.style.transform = `translate(${translateX}px,${translateY}px) rotate(${rotate}deg) scale(${scale})`;
        glassNode.style.filter = `blur(${(1 - scale) * 15}px)`;

        tick = performance.now();

        this.animateId = requestAnimationFrame(glassAnimate);
    };

    this.animateId = requestAnimationFrame(glassAnimate);

    this.unmountHandlers.all = () => {
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };
};

export default init;
