import I from '../types.ts';

const listScrollHandler: I['listScrollHandler'] = async function (e) {
    const { listLimit } = this.state;

    const target = e.target as HTMLElement;
    const scrollSize =
        target[this.listDir === 'vertical' ? 'scrollHeight' : 'scrollWidth'] -
        target[this.listDir === 'vertical' ? 'offsetHeight' : 'offsetWidth'];
    const scrollVal =
        target[this.listDir === 'vertical' ? 'scrollTop' : 'scrollLeft'] *
        (this.listReverse ? -1 : 1);
    const offset = 20;

    if (this.listName && window.lists[this.listName]) {
        window.lists[this.listName].scrollTop = scrollVal;
        window.lists[this.listName].date = new Date().getTime();
    }

    if (listLimit) {
        return;
    }

    if (!this.listProcess && scrollVal + offset >= scrollSize) {
        this.listProcess = true;

        this.getListItemsMore();
    }
};

export default listScrollHandler;
