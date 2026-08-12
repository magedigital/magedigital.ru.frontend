import { StoreT } from '../../store/store.tsx';
import pages from './static/pages.tsx';

type PropsT = {
    isRootInit: StoreT['isRootInit'];
    isAcceptCookies: StoreT['isAcceptCookies'];
    isContactFormShow: StoreT['isContactFormShow'];
};

type StateT = {};

interface RootI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    pages: typeof pages;

    resizeHandler(this: RootI, force?: boolean): Promise<void>;
    init(this: RootI): Promise<void>;

    renderCookies(this: RootI): React.ReactNode;
    renderContactForm(this: RootI): React.ReactNode;
}

export default RootI;
