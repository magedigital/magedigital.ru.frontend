import I from '../types.ts';

const setActive: I['setActive'] = async function (name) {
    await this.asyncSetState({ activeLink: name });

    const navNode = this.parent.current!.querySelector<HTMLElement>('.topBar__nav');
    const linkNode = this.parent.current!.querySelector<HTMLElement>(
        `.topBar__navLink[data-key="${name}"]`,
    );
    const navBackNode = this.parent.current!.querySelector<HTMLElement>('.topBar__navBack');

    if (!navNode || !navBackNode) {
        return;
    }

    navBackNode.classList[name ? 'add' : 'remove']('_active');

    if (linkNode) {
        const left = linkNode.getBoundingClientRect().x - navNode.getBoundingClientRect().x;
        navBackNode.style.width = `${linkNode.getBoundingClientRect().width}px`;
        navBackNode.style.height = `${navNode.getBoundingClientRect().height}px`;
        navBackNode.style.transform = `translate(${left}px,0)`;
    }
};

export default setActive;
