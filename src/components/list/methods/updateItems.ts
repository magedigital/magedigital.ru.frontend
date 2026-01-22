import I, { ItemT } from '../types.ts';

import setAsyncTimer from '../../../utils/setAsyncTimer.ts';

const updateItems: I['updateItems'] = async function ({ isRender, isUpdate }) {
    const { items: propsItems, relative, reverse, parentStyleProps } = this.props;
    const { items: stateItems } = this.state;

    const deletesIds: string[] = [];
    const addesIds: string[] = [];
    let isChangeOrder = false;
    const wasEmpty = stateItems.length === 0;

    const propsItemsIndexes: Record<string, { index: number; item: ItemT }> = {};
    const stateItemsIndexes: Record<string, { index: number; item: ItemT }> = {};

    propsItems.forEach((propsItem, index) => {
        propsItemsIndexes[propsItem._id] = { item: propsItem, index };

        if (
            !relative &&
            this.indexes[propsItem._id] !== undefined &&
            this.indexes[propsItem._id] !== index
        ) {
            isChangeOrder = true;
        }

        this.indexes[propsItem._id] = index;

        if (this.states[propsItem._id] === 0) {
            isChangeOrder = true;
        }
    });

    stateItems.forEach((stateItem, index) => {
        stateItemsIndexes[stateItem._id] = { item: stateItem, index };

        if (!propsItemsIndexes[stateItem._id]) {
            deletesIds.push(stateItem._id);

            this.states[stateItem._id] = 0;
        } else {
            this.states[stateItem._id] = 1;

            // if (this.indexes[stateItem._id] !== index) {
            //     isChangeOrder = true;
            // }
        }
    });

    propsItems.forEach((propsItem) => {
        if (!stateItemsIndexes[propsItem._id]) {
            this.states[propsItem._id] = 1;

            addesIds.push(propsItem._id);
        }
    });

    if (!isChangeOrder && !addesIds.length && !deletesIds.length && !isUpdate && !isRender) {
        if (!relative && !this.initEmptySize && this.state.items.length === 0) {
            this.initEmptySize = true;

            const parent = this.parent.current!;

            if (parentStyleProps.includes('width')) {
                parent.style.height = '0px';
            }

            if (parentStyleProps.includes('height')) {
                parent.style.width = '0px';
            }
        }

        return;
    }

    const resultItems = [
        ...stateItems.map((item) => {
            if (isUpdate) {
                const propsItem = propsItemsIndexes[item._id]?.item || item;

                return { ...JSON.parse(JSON.stringify(propsItem)) };
            }

            return { ...JSON.parse(JSON.stringify(item)) };
        }),
    ];

    if (relative) {
        addesIds.reverse().forEach((id) => {
            const { item, index } = propsItemsIndexes[id];

            const prevItemIndex = index + (reverse ? 1 : -1);
            const prevItem = propsItems[prevItemIndex];
            const stateItemIndex = prevItem
                ? resultItems.findIndex((stateItem) => stateItem._id === prevItem._id)
                : -1;

            if (stateItemIndex !== -1) {
                resultItems.splice(stateItemIndex + 1, 0, { ...JSON.parse(JSON.stringify(item)) });
            } else {
                resultItems[reverse ? 'unshift' : 'push']({ ...JSON.parse(JSON.stringify(item)) });
            }
        });
    } else {
        addesIds.forEach((id) => {
            const { item } = propsItemsIndexes[id];

            resultItems.push({ ...JSON.parse(JSON.stringify(item)) });
        });
    }

    const isEmpty = addesIds.length === 0 && resultItems.length === deletesIds.length;

    await this.asyncSetState.call(this, { items: resultItems, isEmpty });

    await setAsyncTimer(10);

    await this.drawItems({ addesIds, deletesIds, wasEmpty });
};

export default updateItems;
