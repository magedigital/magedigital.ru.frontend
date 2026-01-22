import scrollToTop from '@utils/scrollToTop.ts';

import I from '../types.ts';

const resetListItems: I['resetListItems'] = async function ({ isScroll = true, isAll }) {
    if (!this.getListItems) {
        return;
    }

    const query = this.getListQuery();

    if (isAll) {
        const querySkip = query.find((i) => i.name === 'skip');
        const queryLimit = query.find((i) => i.name === 'limit');

        if (querySkip) {
            querySkip.value = '0';
        }

        if (queryLimit) {
            queryLimit.value = (this.listCurrentStep + this.listStep).toString();
        }

        const { items, isLimit, count } = await this.getListItems({ query });

        this.listForceUpdateKey = new Date().getTime().toString();

        await this.setListItems({ items, isLimit, count });

        return;
    }

    await this.asyncSetState({ listLimit: false });

    this.listCurrentStep = 0;

    const { items, isLimit, count } = await this.getListItems({ query });

    await this.setListItems({ items, isLimit, count });

    if (this.listScrollTargetNode && isScroll) {
        scrollToTop({ scrollNode: this.listScrollTargetNode, offset: 0 });
    }
};

export default resetListItems;
