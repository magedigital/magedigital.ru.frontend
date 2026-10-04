import setAsyncTimer from '@/src/utils/setAsyncTimer.ts';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    await setAsyncTimer(10);

    const { getScrollNode } = this.props;
    const scrollNode = getScrollNode();

    if (!scrollNode) {
        return;
    }

    const checkVisible = async () => {
        const parentNode = this.parent.current;

        if (!parentNode) {
            return;
        }

        const thisBound = parentNode.getBoundingClientRect();

        if (
            thisBound.y < window.heightValue &&
            thisBound.y + thisBound.height > 0 &&
            thisBound.x < window.widthValue &&
            thisBound.x + thisBound.width > 0
        ) {
            scrollNode.removeEventListener('scroll', checkVisible);
            document.removeEventListener('customResize', checkVisible);
            await this.asyncSetState({ isVisible: true });
        }
    };

    checkVisible();

    scrollNode.addEventListener('scroll', checkVisible);
    document.addEventListener('customResize', checkVisible);

    this.unmountHandlers.scroll = () => {
        scrollNode.removeEventListener('scroll', checkVisible);
        document.removeEventListener('customResize', checkVisible);
    };
};

export default init;
