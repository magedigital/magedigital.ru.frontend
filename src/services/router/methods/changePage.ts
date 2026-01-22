import I from '../types.ts';

import { StoreT, appStore } from '../../../store/store.tsx';
import removeTransition from '../../../utils/removeTransition.ts';
import { PageNamesT } from '../static/pages.ts';

const changePage: I['changePage'] = async function ({
    href,
    pageName,
    isPopstate = false,
    storePages,
    changeIsHard,
    start,
    pageData,
    forceChangePage,
}) {
    if (pageName) {
        href = this.getPageLink({ name: pageName, storePages });
    }

    if (href === '/') {
        href = '';
    }

    let levels = (href as string).split('/');
    const [firstLevel] = levels;

    let thisPageName =
        (Object.keys(this.pages) as (keyof typeof this.pages)[]).find(
            (name) => !this.pages[name].level && this.pages[name].links.includes(firstLevel),
        ) ||
        (Object.keys(this.pages) as (keyof typeof this.pages)[]).find(
            (name) => !this.pages[name].level && this.pages[name].links.length === 0,
        );

    let page = thisPageName ? this.pages[thisPageName] : undefined;

    if (!page) {
        page = this.pages.index;
        thisPageName = 'index';
    }

    const resultStorePages = (storePages ||
        JSON.parse(JSON.stringify(appStore.getState().pages))) as StoreT['pages'];
    const pagesIds = (
        storePages ? {} : JSON.parse(JSON.stringify(appStore.getState().pagesIds))
    ) as StoreT['pagesIds'];

    let findNotPopupPage;
    let replaceUrl;

    if (page && typeof page.getCond === 'function') {
        const { condition } = page.getCond(appStore.getState());

        if (!condition) {
            const redirectName = (page.getRedirect?.(appStore.getState()).name ||
                'index') as PageNamesT;

            href = this.getPageLink({ name: redirectName });

            page = this.pages[redirectName];
            thisPageName = redirectName;

            levels = href.split('/');

            replaceUrl = href;
        }
    }

    if (page?.isPopup) {
        findNotPopupPage = (
            Object.keys(resultStorePages) as (keyof typeof resultStorePages)[]
        ).find(
            (pageKey) =>
                !this.pages[pageKey].level &&
                !this.pages[pageKey].isPopup &&
                resultStorePages[pageKey].isShow,
        );

        if (!findNotPopupPage) {
            findNotPopupPage = ((typeof page.mainPage === 'function'
                ? page.mainPage(appStore.getState())
                : page.mainPage) || 'index') as PageNamesT;

            this.getPageInfo({ name: findNotPopupPage }).parents.forEach((parent) => {
                resultStorePages[parent].isShow = true;
            });

            resultStorePages[findNotPopupPage].isShow = true;

            const { nearChilds } = this.getPageInfo({ name: findNotPopupPage });

            const withIndexPageChild = nearChilds.find((child) =>
                this.pages[child].links.includes(undefined),
            );

            if (withIndexPageChild) {
                resultStorePages[withIndexPageChild].isShow = true;
            }
        }
    }

    const infoShowPages = this.getShowPages({ name: thisPageName, pagesIds, levels });
    let { showPages } = infoShowPages;
    const { popup } = infoShowPages;

    // console.log(infoShowPages);

    // console.log(popup);

    const hidePagesNames = (
        Object.keys(resultStorePages) as (keyof typeof resultStorePages)[]
    ).filter(
        (pageKey) =>
            resultStorePages[pageKey].isShow &&
            (!popup ||
                this.getPageInfo({ name: pageKey }).parents.includes(popup) ||
                this.getPageLevel(pageKey) < this.getPageLevel(popup)),
    );

    hidePagesNames.forEach((nameHidePage) => {
        resultStorePages[nameHidePage].isShow = false;
    });

    let findInnerRedirect: PageNamesT | undefined;

    showPages.forEach(({ name: nameShowPage }) => {
        if (!findInnerRedirect) {
            const showPage = this.pages[nameShowPage];

            if (typeof showPage.getCond === 'function') {
                const { condition } = showPage.getCond(appStore.getState());

                if (!condition) {
                    const redirectName = (showPage.getRedirect?.(appStore.getState()).name ||
                        'index') as PageNamesT;

                    findInnerRedirect = redirectName;

                    href = this.getPageLink({ name: redirectName });

                    levels = href.split('/');

                    replaceUrl = href;
                }
            }
        }
    });

    if (findInnerRedirect) {
        const { showPages: innerShowPages } = this.getShowPages({
            name: findInnerRedirect,
            pagesIds,
            levels,
        });

        showPages = innerShowPages;
    }

    let findPopupPage: string | undefined;

    if (start) {
        showPages.forEach(({ name }) => {
            const innerPage = this.pages[name];

            if (innerPage.isPopup && !findPopupPage) {
                findPopupPage = name;

                const mainPage = (
                    typeof innerPage.mainPage === 'function'
                        ? innerPage.mainPage(appStore.getState())
                        : innerPage.mainPage
                ) as PageNamesT;
                const mainLevels = this.getPageLink({ name: mainPage }).split('/');
                const { showPages: innerShowPages } = this.getShowPages({
                    name: mainPage,
                    pagesIds,
                    levels: mainLevels,
                });

                showPages.push(...innerShowPages);
            }
        });
    }

    showPages.forEach(({ name, id }) => {
        resultStorePages[name].isShow = true;

        if (id) {
            resultStorePages[name].id = id;
        }

        if (name === pageName && pageData) {
            resultStorePages[name].data = pageData;
        }
    });

    const resultHidePagesNames = hidePagesNames.filter(
        (hidePageName) => !showPages.find((showPage) => showPage.name === hidePageName),
    );

    if (storePages) {
        if (replaceUrl !== undefined) {
            window.history.pushState(null, '', `/${replaceUrl}`);
        }

        return { storePages: resultStorePages, levels, pagesIds };
    }

    document.dispatchEvent(
        new CustomEvent('changePage', {
            detail: {
                showPages: showPages.map(({ name: showPageName }) => this.pages[showPageName]),
                hidePages: resultHidePagesNames.map((hidePageName) => this.pages[hidePageName]),
                changeIsHard,
            },
        }),
    );

    if (forceChangePage) {
        removeTransition({ item: forceChangePage });
    }

    if (!isPopstate) {
        let historyHref = `/${
            href === '' || (href as string)[(href as string).length - 1] === '/' ? href : `${href}/`
        }`;

        if (historyHref[0] === '/' && historyHref[1] === '/') {
            historyHref = historyHref.slice(1);
        }

        window.history.pushState(null, '', historyHref);
    }

    appStore.getState().setLevels(levels);
    appStore.getState().setPagesIds(pagesIds);
    appStore.getState().setPages(resultStorePages);

    return {};
};

export default changePage;
