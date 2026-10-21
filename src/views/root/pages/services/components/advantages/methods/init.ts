import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    await this.setType({ type: this.state.currentType });

    this.unmountHandlers.all = () => {
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
        }
    };
};

export default init;
