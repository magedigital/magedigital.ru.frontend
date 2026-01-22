import { MouseEvent } from 'react';

import DefaultI from '@components/default/types';

import { PageNamesT } from '../../services/router/static/pages';
import { StoreT } from '../../store/store';

type PropsT = {
    href?: string;
    pageName?: PageNamesT;
    children?: React.ReactElement | string | React.ReactNode;
    className?: string;
    callback?: () => void;
    isCurrent?: boolean;
    storePages: StoreT['pages'];
    prevActions?: () => void;
    prevPromise?: () => Promise<void>;
    levels: StoreT['levels'];
    forceChangePage?: string;
    onClick?: (e: MouseEvent) => void;
    ids?: IdsT;
    tag?: string;
    isStopPropagation?: boolean;
    renderKey?: string;
};

type StateT = {
    href?: string;
};

type IdsT = Record<number, string>;

interface LinkI extends DefaultI<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    renderKey?: string;

    getHref(this: LinkI, href: string | undefined | null): string;
    setHref(this: LinkI): void;
    checkCurrent(this: LinkI): boolean | null;
    checkChange(this: LinkI, start?: boolean): void;
    clickHandler(this: LinkI, e: MouseEvent): void;
}

export default LinkI;
