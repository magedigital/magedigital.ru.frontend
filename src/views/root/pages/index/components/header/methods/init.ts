import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');
    const boxNode = this.parent.current!.querySelector<HTMLElement>('.indexHeader__box');
    const colorNode = this.parent.current!.querySelector<HTMLElement>('.indexHeader__boxColor');
    const frameNode = this.parent.current!.querySelector<HTMLElement>('.indexHeader__boxFrame');

    if (!pageNode || !boxNode || !colorNode || !frameNode) {
        return;
    }

    const onScroll = () => {
        let percent = (boxNode.offsetTop - boxNode.getBoundingClientRect().y) / boxNode.offsetTop;
        const maxHeight = 950;
        const minHeight = 150;

        percent -= 0.05;

        if (percent < 0) {
            percent = 0;
        }
        if (percent > 1) {
            percent = 1;
        }

        // console.log(percent);

        const height = +((minHeight + (maxHeight - minHeight) * percent) * window.sizeK).toFixed(0);
        colorNode.style.height = `${height}px`;

        const frameScale = 0.285 + percent * (1 - 0.285);
        const frameLeft = (-22 + percent * 22) * window.sizeK;
        const frameTop = (-356 + percent * 356) * window.sizeK;
        const frameHeight = (660 + 250 - 250 * percent) * window.sizeK;
        const frameRadius = (24 + 60 - 60 * percent) * window.sizeK;

        frameNode.style.borderRadius = `${frameRadius}px`;
        frameNode.style.height = `${frameHeight}px`;
        frameNode.style.transform = `translate(${frameLeft}px,${frameTop}px) scale(${frameScale})`;
    };

    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        pageNode.removeEventListener('scroll', onScroll);
    };

    onScroll();

    this.timers.animate = setTimeout(async () => {
        await this.asyncSetState({ titleIsAnimated: true });
        this.timers.animate = setTimeout(async () => {
            await this.asyncSetState({ textIsAnimated: true });
            this.timers.animate = setTimeout(async () => {
                await this.asyncSetState({ buttonIsAnimated: true });
                this.timers.animate = setTimeout(async () => {
                    await this.asyncSetState({ frameIsAnimated: true });
                }, 100);
            }, 100);
        }, 100);
    }, 300);
};

export default init;
