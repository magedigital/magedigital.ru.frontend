import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    this.timers.init = setTimeout(() => {
        this.setState({ isInit: true });
    }, 10);
};

export default init;
