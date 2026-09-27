import DefaultI from '@/src/components/default/types.ts';
import { PopupsT } from '@/src/store/popups.ts';

import { StoreT } from '../../store/store.tsx';
import pages from './static/pages.tsx';

type PropsT = {
    isRootInit: StoreT['isRootInit'];
    isAcceptCookies: StoreT['isAcceptCookies'];
    currentPopup: StoreT['currentPopup'];
} & PopupsT;

type StateT = {};

interface RootI extends DefaultI<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    pages: typeof pages;

    popupsHandler(this: RootI, set?: boolean): void;
    resizeHandler(this: RootI, force?: boolean): Promise<void>;
    init(this: RootI): Promise<void>;

    renderCookies(this: RootI): React.ReactNode;
    renderPopups(this: RootI): React.ReactNode;
}

export default RootI;
