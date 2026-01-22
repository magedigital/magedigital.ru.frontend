import LinkI from '../types.ts';

import { AppRouter } from '../../../index.tsx';

const clickHandler: LinkI['clickHandler'] = function (e) {
    const {
        isStopPropagation,
        onClick,
        prevActions,
        prevPromise = async () => true,
        forceChangePage,
        callback,
    } = this.props;
    const href = this.getHref(this.props.href ?? this.state.href);

    if (isStopPropagation) {
        e.stopPropagation();
    }

    if (typeof onClick === 'function') {
        onClick(e);
    } else {
        if (prevActions) {
            prevActions();
        }

        prevPromise().then(
            () => {
                AppRouter.changePage({ href, forceChangePage }).then(() => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            },
            () => null,
        );
    }
};

export default clickHandler;
