import removeTransition from '@utils/removeTransition.ts';

import I from '../types.ts';

const searchListItems: I['searchListItems'] = async function ({ query }) {
    if (!this.getListItems) {
        return;
    }

    this.listCurrentStep = 0;

    const resultQuery = [...(query || []), ...this.getListQuery()];

    clearTimeout(this.listSearchTimerId);
    clearTimeout(this.listSearchPreTimerId);

    await this.asyncSetState({ isListSearchLoading: true });

    this.listSearchPreTimerId = setTimeout(async () => {
        await this.setListItems({ items: [], isLimit: false, count: this.state.listCount! });

        const { items, isLimit, count } = await this.getListItems!({ query: resultQuery });

        await this.setListItems({ items, isLimit, count });

        if (this.listSearchItemClass) {
            removeTransition({ item: this.listSearchItemClass });
        }
        await this.asyncSetState({ isListSearchLoading: false });
    }, 300);

    // this.listSearchTimerId = setTimeout(async () => {
    //     const { items, isLimit, count } = await this.getListItems!({ query: resultQuery });

    //     await this.setListItems({ items, isLimit, count });
    //     await this.asyncSetState({ isListSearchLoading: false });
    // }, 600);
};

export default searchListItems;
