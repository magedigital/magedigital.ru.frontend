import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const { device } = this.props;

    if (device === 'mobile') {
        return;
    }

    const navNode = this.parent.current!.querySelector<HTMLElement>('.topBar__nav');
    const navBackNode = this.parent.current!.querySelector<HTMLElement>('.topBar__navBack');

    if (!navNode || !navBackNode) {
        return;
    }

    navBackNode.style.height = `${navNode.getBoundingClientRect().height}px`;
    
    const links = this.parent.current!.querySelectorAll<HTMLElement>('.topBar__navLink');

    links.forEach((link) => {
        // const middle = navNode.offsetWidth / 2;
        const left =
            ((navNode.offsetWidth / 2 -
                (link.getBoundingClientRect().x -
                    navNode.getBoundingClientRect().x +
                    link.offsetWidth / 2)) /
                (navNode.offsetWidth / 2)) *
                100 +
            50;

        link.querySelectorAll<HTMLElement>('.topBar__navLinkInner').forEach((inner) => {
            inner.style.transformOrigin = `${left}% 0`;
        });
    });
};

export default init;
