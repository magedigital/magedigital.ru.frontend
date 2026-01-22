import I from '../types.ts';

const initScrollList: I['initScrollList'] = async function (target) {
    const { withListSave } = this.props;
    const targetNode =
        typeof target === 'string'
            ? target === 'parent'
                ? this.parent.current!
                : this.parent.current!.querySelector(target)
            : target;

    if (!targetNode) {
        return;
    }

    this.listScrollTargetNode = targetNode as HTMLElement;

    this.listScrollTargetNode.addEventListener('scroll', this.listScrollHandler);

    // if (this.listFilterName) {
    //     const filterQuery = getLocalFilter({ name: this.listFilterName, id });

    //     await this.asyncSetState({ filterQuery });
    // }

    if (this.getListItems) {
        const query = this.getListQuery();

        if (this.listName && window.lists[this.listName] && withListSave !== false) {
            const list = window.lists[this.listName];

            setTimeout(async () => {
                const { items, count, isLimit, scrollTop } = list;

                await this.setListItems({ items, isLimit, count });

                if (typeof scrollTop === 'number') {
                    setTimeout(() => {
                        this.listScrollTargetNode!.scrollTop = scrollTop;
                    }, 20);
                }

                const { items: resultItems } = await this.getListItems!({
                    query: items.map((i) => ({ name: 'id', value: i._id })),
                });

                await this.updateListItems({ items: resultItems, isFull: true });
            }, 10);
        } else {
            const { items, isLimit, count } = await this.getListItems({ query });

            await this.setListItems({ items, isLimit, count });
        }
    }

    this.unmountHandlers.scroll = () =>
        this.listScrollTargetNode!.removeEventListener('scroll', this.listScrollHandler);
};

export default initScrollList;
