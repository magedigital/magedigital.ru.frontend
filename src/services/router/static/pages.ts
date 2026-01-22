import { StoreT } from '../../../store/store';

const pages = {
    index: {
        links: ['', undefined],
    },
};

type PageT = {
    links: readonly (string | undefined)[];
    level?: number;
    parentName?: PageNamesT;
    isPopup?: boolean;
    content?: string;
    group?: string;
    className?: string;
    mainPage?: string | ((data: StoreT) => string);
    getCond?: (data: StoreT) => { condition: boolean | undefined };
    getRedirect?: (data: StoreT) => { name: string };
};

type PageNamesT = keyof typeof pages;

export default pages;

export type { PageT, PageNamesT };
