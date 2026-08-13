import I from '../types.ts';

const onHover: I['onHover'] = async function (action) {
    const iconNode = this.parent.current!.querySelector<HTMLElement>('.button__icon i');

    if (!iconNode) {
        return;
    }

    if (this.timers.animate) {
        clearTimeout(this.timers.animate);
    }

    if (action === 'enter') {
        iconNode.style.transition = '.2s ease-in-out';
        iconNode.classList.add('_first');

        this.timers.animate = setTimeout(() => {
            iconNode.style.transition = '.1s cubic-bezier(.06,.45,.62,1.8)';
            // iconNode.classList.remove('_first');
            iconNode.classList.add('_last');
        }, 400);
    }

    if (action === 'leave') {
        iconNode.classList.remove('_first');
        iconNode.classList.remove('_last');
    }
};

export default onHover;
