import I from '../types.ts';

const wheelScrollHandler: I['wheelScrollHandler'] = function (e) {
    if (!this.wheelScrollNodeClass || e.ctrlKey) {
        return;
    }

    e.preventDefault();

    const scrollNode = this.parent.current!.querySelector(this.wheelScrollNodeClass) as HTMLElement;

    if (!scrollNode) {
        return;
    }

    scrollNode.scrollTop += e.deltaY;
    scrollNode.scrollLeft += e.deltaX;

    scrollNode.dispatchEvent(new Event('scroll'));
};

export default wheelScrollHandler;
