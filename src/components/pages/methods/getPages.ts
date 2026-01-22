import I from '../types.ts';

import { AppRouter } from '../../../index.tsx';

const getPages: I['getPages'] = function (all) {
    const { pages } = this.state;
    const { storePages } = this.props;

    return pages
        .filter((pageName) => all || storePages[pageName].isShow)
        .map((pageName) => ({ _id: pageName, ...AppRouter.pages[pageName] }));
};

export default getPages;
