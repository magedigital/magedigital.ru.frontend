import I from '../types.ts';

import { appStore } from '../../../store/store.tsx';

const getNotPopupPage: I['getNotPopupPage'] = function () {
    const { pages: storePages } = appStore.getState();
    let href = '';

    let pageName = (Object.keys(this.pages) as (keyof typeof this.pages)[]).find(
        (name) => !this.pages[name].level && !this.pages[name].isPopup && storePages[name]?.isShow,
    );

    while (pageName) {
        const page = this.pages[pageName];
        let link: string | undefined = page.links.find((thisLink) => thisLink !== undefined);

        if (page.links.length === 0) {
            link = storePages[pageName]?.id;
        }

        href += link;
        href += '/';

        pageName = (Object.keys(this.pages) as (keyof typeof this.pages)[]).find(
            (name) =>
                !this.pages[name].isPopup &&
                this.pages[name].parentName === pageName &&
                storePages[name]?.isShow,
        );
    }

    href = href.slice(0, -1);

    return { href, name: pageName! };
};

export default getNotPopupPage;
