import changePage from './methods/changePage';
import getCurrentPage from './methods/getCurrentPage';
import getNotPopupPage from './methods/getNotPopupPage';
import getPageInfo from './methods/getPageInfo';
import getPageLevel from './methods/getPageLevel';
import getPageLink from './methods/getPageLink';
import getShowPages from './methods/getShowPages';
import getStartUrl from './methods/getStartUrl';
import init from './methods/init';

import pages from './static/pages';
import RouterI from './types';

export default class Router implements RouterI {
    pagesIndexes: RouterI['pagesIndexes'];

    constructor() {
        this.pagesIndexes = {
            levels: {},
            parents: {},
        };

        this.init();
    }

    pages: RouterI['pages'] = pages;

    getCurrentPage = getCurrentPage;
    getNotPopupPage = getNotPopupPage;
    getPageLevel = getPageLevel;
    getPageInfo = getPageInfo;
    getPageLink = getPageLink;
    getStartUrl = getStartUrl;
    getShowPages = getShowPages;
    changePage = changePage;

    init = init;
}
