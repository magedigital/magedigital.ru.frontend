import { ItemT } from '@components/list/types.ts';

import I from '../types.ts';

const updateListItems: I['updateListItems'] = async function ({ items, isFull, isAdd, prop }) {
    const resultProp = prop || '_id';
    let resultItems = [...(this.state.listItems || [])];
    const indexes: Record<string, number> = {};

    resultItems.forEach((item, index) => {
        indexes[item[resultProp] as string] = index;
    });

    items.forEach((item) => {
        const index = indexes[item[resultProp] as string] ?? -1;

        if (index !== -1) {
            if (isFull) {
                resultItems[index] = item as ItemT;
            } else {
                Object.keys(item).forEach((key) => {
                    resultItems[index][key] = item[key];
                });
            }
        } else if (isAdd) {
            resultItems.push(item as ItemT);
        }
    });

    if (this.sortListItems) {
        resultItems = this.sortListItems(resultItems);
    }

    if (this.modifySetListItems) {
        resultItems = this.modifySetListItems(resultItems);
    }

    this.listForceUpdateKey = new Date().getTime().toString();

    await this.asyncSetState({ listItems: resultItems, ...this.setListItemsKeys(resultItems) });

    if (this.listName && window.lists[this.listName]) {
        window.lists[this.listName].items = resultItems;
    }
};

export default updateListItems;
