import I from '../types.ts';

import { PageNamesT } from '../static/pages.ts';

const getShowPages: I['getShowPages'] = function ({ name, pagesIds, levels }) {
    const showPages: { name: PageNamesT; id?: string }[] = [];

    let checkEmptyNextPage = false;
    let popup: PageNamesT | undefined;
    let pageName = name;

    while (pageName) {
        const page = this.pages[pageName];
        const pageInfo = this.getPageInfo({ name: pageName });
        const level = this.getPageLevel(pageName);
        const { nearChilds } = pageInfo;
        let findPage = false;

        const newPage: { name: PageNamesT; id?: string } = { name: pageName };

        if (page.links.length === 0) {
            pagesIds[pageName] = levels[level];

            newPage.id = levels[level];
        }

        if (popup === undefined && page.isPopup) {
            popup = pageName;
        }

        showPages.push(newPage);

        if (!findPage) {
            nearChilds.forEach((nearChild) => {
                const nearChildPage = this.pages[nearChild];
                const childLevel = this.getPageLevel(nearChild);
                const currentLevel = levels[childLevel];

                if (nearChildPage.links.includes(currentLevel)) {
                    pageName = nearChild;
                    findPage = true;
                }
            });
        }

        if (!findPage) {
            nearChilds.forEach((nearChild) => {
                const nearChildPage = this.pages[nearChild];

                if (nearChildPage.links.length === 0 && levels[nearChildPage.level as number]) {
                    pageName = nearChild;
                    findPage = true;
                }
            });
        }

        if (!findPage) {
            pageName = undefined;
        }

        if (!page && !checkEmptyNextPage) {
            const lastPageName = showPages[showPages.length - 1];
            const { nearChilds: nextPageNearChilds } = this.getPageInfo({
                name: lastPageName.name,
            });

            nextPageNearChilds.forEach((nextPageName) => {
                const nextPage = this.pages[nextPageName];

                if (nextPage.links.find((link) => ['', undefined].includes(link))) {
                    showPages.push({ name: nextPageName });
                }
            });

            checkEmptyNextPage = true;
        }
    }

    return { showPages, popup };
};

export default getShowPages;
