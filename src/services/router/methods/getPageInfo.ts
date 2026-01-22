import I from '../types.ts';

import { PageNamesT } from '../static/pages.ts';

const getPageInfo: I['getPageInfo'] = function ({ name }) {
    const page = this.pages[name];

    let nearChilds: PageNamesT[] = [];
    let childs: PageNamesT[] = [];
    let nearParent: PageNamesT | undefined;
    let parent: PageNamesT | undefined;
    const parents: PageNamesT[] = [];

    if (page) {
        const level = this.getPageLevel(page);

        nearChilds = this.pagesIndexes.parents[name]?.[level + 1] || [];

        if (level) {
            nearParent = page.parentName!;
        }

        let currentChilds = [...nearChilds];
        childs = [...nearChilds];

        while (currentChilds.length !== 0) {
            const thisChilds: PageNamesT[] = [];

            currentChilds.forEach((childName) => {
                const { childs: nextChilds } = this.getPageInfo({ name: childName });

                thisChilds.push(...nextChilds);
            });

            childs.push(...thisChilds);

            currentChilds = thisChilds;
        }

        if (level) {
            const { parentName } = page;
            let parentPage = this.pages[parentName!];
            let thisParentName = parentName;

            parents.push(parentName!);

            while (parentPage.parentName) {
                parentPage = this.pages[parentPage.parentName];

                thisParentName = parentPage.parentName;

                parents.push(parentPage.parentName!);
            }

            parent = thisParentName;
        }
    }

    return {
        nearChilds,
        childs,
        nearParent,
        parent,
        parents,
    };
};

export default getPageInfo;
