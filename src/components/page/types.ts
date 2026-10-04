import DefaultI from '@/src/components/default/types';
import { StoreT } from '@/src/store/store';

type PropsT = {
    currentPopup: StoreT['currentPopup'];
};

type StateT = {
    isMobMenuShow?: boolean;
};

interface PageI<P = {}, S = {}> extends DefaultI<PropsT & P, StateT & S> {
    name: string;
    fixTopBarIsShow?: boolean;
    animateId?: number;
    currentPopup?: string;

    onPageInit?: () => Promise<void>;

    renderPage(
        this: PageI,
        d: {
            render: () => React.ReactNode;
        },
    ): React.ReactNode;
}

export default PageI;
