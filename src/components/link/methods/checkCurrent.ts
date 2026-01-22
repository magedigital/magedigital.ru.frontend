import LinkI from '../types.ts';

import { AppRouter } from '../../../index.tsx';

const checkCurrent: LinkI['checkCurrent'] = function () {
    const { storePages, pageName, levels, ids } = this.props;

    let isCurrent = pageName ? !!storePages[pageName!]?.isShow : false;
    const page = pageName ? AppRouter.pages[pageName] : undefined;

    if (page && page.links.length === 0 && typeof page.level === 'number' && ids) {
        isCurrent = levels[page.level] === ids[page.level];
    }

    return isCurrent || null;
};

export default checkCurrent;
