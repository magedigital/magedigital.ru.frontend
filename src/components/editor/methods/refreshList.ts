import I from '../types.ts';

const refreshList: I['refreshList'] = async function ({ detail: { name, ids } }) {
    if (!name || name !== this.listRefreshName || !ids || !this.getListItems) {
        return;
    }

    if (ids[0] === 'all') {
        await this.resetListItems({ isAll: true });

        return;
    }

    const { items } = await this.getListItems({
        query: ids.map((id) => ({ name: 'id', value: id })),
    });

    await this.updateListItems({ items, isFull: true });
};

export default refreshList;
