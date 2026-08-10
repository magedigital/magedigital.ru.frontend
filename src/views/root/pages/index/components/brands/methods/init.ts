import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const lines = this.parent.current!.querySelectorAll<HTMLElement>('.indexBrands__line');
    let move = 0;
    let max = 0;
    let time = new Date().getTime();

    const animate = () => {
        const delta = new Date().getTime() - time;
        move -= delta * 0.1;

        if (move < -max) {
            move += max;
        }

        lines.forEach((line, i) => {
            const moveNode = line.querySelector<HTMLElement>('.indexBrands__lineMove');
            const itemsNode = line.querySelector<HTMLElement>('.indexBrands__lineItems');
            const dir = i % 2 === 0 ? 1 : -1;

            if (itemsNode) {
                max = itemsNode.offsetWidth;
            }

            if (moveNode) {
                moveNode.style.transform = `translate(${move * dir}px,0)`;
            }
        });

        time = new Date().getTime();

        this.animateId = requestAnimationFrame(animate);
    };

    this.animateId = requestAnimationFrame(animate);

    this.unmountHandlers.all = () => {
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };
};

export default init;
