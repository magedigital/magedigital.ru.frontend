import I from '../types.ts';

import { appStore } from '../../../store/store.tsx';

const getPageLink: I['getPageLink'] = function ({ name, storePages, ids = {} }) {
    const page = this.pages[name];

    if (!storePages) {
        storePages = appStore.getState().pages;
    }

    if (page) {
        const pageInfo = this.getPageInfo({ name });
        const link =
            page.links.find((loopLink) => !['', undefined].includes(loopLink)) ||
            page.links.find((loopLink) => loopLink !== undefined);
        let resultLink = link;

        if (resultLink === undefined) {
            resultLink = ids[this.getPageLevel(page)] ?? storePages?.[name]?.id;
        }

        let nearParent = pageInfo.nearParent;

        while (nearParent) {
            const nearParentPage = this.pages[nearParent];

            let parentLink =
                nearParentPage.links.find((thisLink) => !['', undefined].includes(thisLink)) ||
                nearParentPage.links.find((thisLink) => thisLink !== undefined);

            if (parentLink === undefined) {
                parentLink = ids[this.getPageLevel(nearParent)] ?? storePages?.[nearParent]?.id;
            }

            resultLink = `${parentLink}/${resultLink}`;

            nearParent = this.getPageInfo({ name: nearParent }).nearParent;
        }

        return resultLink;
    }

    return '';
};

export default getPageLink;
