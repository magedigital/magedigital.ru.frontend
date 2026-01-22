import I from '../types.ts';

const setListItems: I['setListItems'] = async function ({ items, isLimit, count, concat }) {
    const { setCount, withListSave } = this.props;
    let resultItems = concat ? [...(this.state.listItems || [])] : items;

    if (concat) {
        const indexes: Record<string, boolean> = {};

        this.state.listItems?.forEach((listItem) => {
            indexes[listItem._id] = true;
        });

        items.forEach((item) => {
            if (!indexes[item._id]) {
                resultItems.push(item);
            }
        });
    }

    if (this.sortListItems) {
        resultItems = this.sortListItems(resultItems);
    }

    await this.asyncSetState({
        listItems: resultItems,
        listLimit: isLimit,
        listCount: count,
        listInit: true,
        ...this.setListItemsKeys(resultItems),
    });

    if (this.listName && withListSave !== false) {
        window.lists[this.listName] = {
            items: JSON.parse(JSON.stringify(resultItems)),
            count,
            currentStep: this.listCurrentStep,
            isLimit: !!isLimit,
            scrollTop: this.listScrollTargetNode?.scrollTop,
            date: new Date().getTime(),
        };
    }

    if (setCount) {
        await setCount(count);
    }

    if (this.afterSetListItems) {
        await this.afterSetListItems();
    }
};

export default setListItems;
