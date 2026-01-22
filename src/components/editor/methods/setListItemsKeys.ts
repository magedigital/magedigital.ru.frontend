import I from '../types';

const setListItemsKeys: I['setListItemsKeys'] = async function (items) {
    const resultItems = items || this.state.listItems || [];

    const renderKey = resultItems
        .map(
            (item) =>
                `${item._id}${this.listRenderKeys.map((key) => this.getDeepValue(item, key) || '')}`,
        )
        .join('');
    const updateKey =
        resultItems
            .map(
                (item) =>
                    `${item._id}${this.listUpdateKeys.map((key) => this.getDeepValue(item, key) || '')}`,
            )
            .join('') + (this.listForceUpdateKey || '');

    await this.asyncSetState({ listRenderKey: renderKey, listUpdateKey: updateKey });
};

export default setListItemsKeys;
