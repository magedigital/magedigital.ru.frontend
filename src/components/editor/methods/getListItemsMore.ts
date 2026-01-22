import setAsyncTimer from '@utils/setAsyncTimer.ts';

import I from '../types.ts';

const getListItemsMore: I['getListItemsMore'] = async function () {
    if (!this.getListItems) {
        return;
    }

    await this.asyncSetState({ isListLoading: true });

    this.listCurrentStep += this.listStep;

    const query = this.getListQuery();

    try {
        const { items, isLimit, count } = await this.getListItems({ query });

        await this.setListItems({ items, isLimit, count, concat: true });
    } catch (error) {}

    await setAsyncTimer(300);
    await this.asyncSetState({ isListLoading: false });

    this.listProcess = false;

    if (this.listScrollTargetNode) {
        this.listScrollTargetNode.dispatchEvent(new Event('scroll'));
    }
};

export default getListItemsMore;
