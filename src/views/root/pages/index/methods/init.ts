import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    await this.startProjectsAnimate();
};

export default init;
