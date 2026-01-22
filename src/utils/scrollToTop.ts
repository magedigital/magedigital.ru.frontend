import setAnimate from './setAnimate';

type ParamsT = {
    scrollNode: HTMLElement | undefined | null;
    offset: number;
};

export default function scrollToTop({ scrollNode, offset }: ParamsT): void {
    if (!scrollNode) {
        return;
    }

    const scrollStart = scrollNode.scrollTop;
    let resultOffset = offset - scrollStart;

    if (scrollStart + resultOffset > scrollNode.scrollHeight - scrollNode.offsetHeight) {
        resultOffset = scrollNode.scrollHeight - scrollNode.offsetHeight - scrollStart;
    }

    setAnimate({
        duration: 300,
        draw: (progress) => {
            scrollNode.scrollTop = scrollStart + progress * resultOffset;
        },
    });
}
