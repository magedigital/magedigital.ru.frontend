import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    await this.initTarget({ data: {}, targetName: 'form' });
};

export default init;
