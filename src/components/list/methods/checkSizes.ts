import I from '../types.ts';

const checkSizes: I['checkSizes'] = async function () {
    this.updateItems({
        isRender: true,
        isUpdate: false,
    });
};

export default checkSizes;
