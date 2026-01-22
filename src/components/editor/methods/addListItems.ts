import I from '../types.ts';

const addListItems: I['addListItems'] = async function ({ items }) {
    let resultItems = [...(this.state.listItems || [])];
    const indexes: Record<string, boolean> = {};

    resultItems.forEach((item) => {
        indexes[item._id] = true;
    });

    items.forEach((item) => {
        if (!indexes[item._id]) {
            resultItems.push(item);
        }
    });

    if (this.sortListItems) {
        resultItems = this.sortListItems(resultItems);
    }

    if (this.modifySetListItems) {
        resultItems = this.modifySetListItems(resultItems);
    }

    await this.asyncSetState({ listItems: resultItems, ...this.setListItemsKeys(resultItems) });
};

export default addListItems;
