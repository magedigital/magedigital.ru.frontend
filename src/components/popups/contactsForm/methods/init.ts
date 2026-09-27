import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    await this.initTarget({ data: { types: [] }, targetName: 'form' });
};

export default init;
