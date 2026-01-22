import { StoreT } from '../../store/store.tsx';
import pages from './static/pages.tsx';

type PropsT = {
    isRootInit: StoreT['isRootInit'];
};

type StateT = {};

interface RootI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    pages: typeof pages;

    resizeHandler(this: RootI, force?: boolean): Promise<void>;
    init(this: RootI): Promise<void>;
}

export default RootI;
