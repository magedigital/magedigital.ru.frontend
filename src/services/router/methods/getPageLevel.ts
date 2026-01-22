import I from '../types.ts';

const getPageLevel: I['getPageLevel'] = function (page) {
    if (typeof page === 'string') {
        page = this.pages[page];
    }

    return page?.level ?? 0;
};

export default getPageLevel;
