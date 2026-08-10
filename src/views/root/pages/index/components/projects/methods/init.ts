import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    const pageNode = this.parent.current!.closest<HTMLElement>('.page__scroll');

    if (!pageNode) {
        return;
    }

    const cards = this.parent.current!.querySelectorAll<HTMLElement>('.indexProjects__card');

    const onScroll = () => {
        cards.forEach((card) => {
            if (
                card.getBoundingClientRect().y < window.heightValue / 2 &&
                !card.getAttribute('data-animate')
            ) {
                card.setAttribute('data-animate', 't');
            }
        });
    };

    pageNode.addEventListener('scroll', onScroll);

    this.unmountHandlers.all = () => {
        pageNode.removeEventListener('scroll', onScroll);
    };

    setTimeout(() => {
        onScroll();
    }, 10);
};

export default init;
