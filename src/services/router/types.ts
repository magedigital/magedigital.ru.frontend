import { StoreT } from '../../store/store';
import { PageNamesT, PageT } from './static/pages';

interface RouterI {
    pages: Record<PageNamesT, PageT>;
    pagesIndexes: {
        levels: Record<number, PageNamesT[]>;
        parents: Record<string, Record<number, PageNamesT[]>>;
    };

    getCurrentPage(
        this: RouterI,
        data: { storePages: StoreT['pages']; filter: (page: PageT) => boolean },
    ): PageNamesT | undefined;
    getNotPopupPage(this: RouterI): { href: string; name: PageNamesT };
    getPageLevel(this: RouterI, page: PageNamesT | PageT): number;
    getPageInfo(
        this: RouterI,
        data: { name: PageNamesT },
    ): {
        nearChilds: PageNamesT[];
        childs: PageNamesT[];
        nearParent: PageNamesT | undefined;
        parent: PageNamesT | undefined;
        parents: PageNamesT[];
    };
    getPageLink(
        this: RouterI,
        data: { name: PageNamesT; storePages?: StoreT['pages']; ids?: Record<number, string> },
    ): string;
    getStartUrl(this: RouterI, path: string): string;
    getShowPages(
        this: RouterI,
        data: {
            name: PageNamesT | undefined;
            pagesIds: Record<string, string | number>;
            levels: string[];
        },
    ): { showPages: { name: PageNamesT; id?: string }[]; popup?: PageNamesT };
    changePage(
        this: RouterI,
        data: {
            href?: string;
            pageName?: PageNamesT;
            isPopstate?: boolean;
            storePages?: StoreT['pages'];
            changeIsHard?: boolean;
            start?: boolean;
            pageData?: ObjT;
            forceChangePage?: string;
        },
    ): Promise<{
        storePages?: StoreT['pages'];
        levels?: string[];
        pagesIds?: StoreT['pagesIds'];
    }>;

    init(this: RouterI): void;
}

export default RouterI;
