import I from '../types.ts';

import { s } from '../../../utils/seo.ts';

const init: I['init'] = function () {
    (Object.keys(this.pages) as (keyof typeof this.pages)[]).forEach((name) => {
        const page = this.pages[name];
        const level = this.getPageLevel(page);

        if (!this.pagesIndexes.levels[level]) {
            this.pagesIndexes.levels[level] = [];
        }

        this.pagesIndexes.levels[level].push(name);

        if (page.parentName) {
            if (!this.pagesIndexes.parents[page.parentName]) {
                this.pagesIndexes.parents[page.parentName] = {};
            }

            if (!this.pagesIndexes.parents[page.parentName][level]) {
                this.pagesIndexes.parents[page.parentName][level] = [];
            }

            this.pagesIndexes.parents[page.parentName][level].push(name);
        }
    });

    if (!s()) {
        window.onpopstate = async (e) => {
            e.preventDefault();

            const href = this.getStartUrl(window.location.pathname.slice(1));

            await this.changePage({ href, isPopstate: true });
        };
    }
};

export default init;
