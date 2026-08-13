import DefaultI from '@/src/components/default/types';
import { StoreT } from '@/src/store/store';

type PropsT = {
    mode: 'default' | 'fix';
    device: StoreT['device'];
};

type StateT = {
    activeLink?: string;
    isMenuActive?: boolean;
    isMenuReadyLinks?: boolean;
};

interface TopBarI extends DefaultI<PropsT, StateT> {
    setActive(this: TopBarI, name: string | undefined): Promise<void>;

    onContactsHover(this: TopBarI, a: 'enter' | 'leave'): Promise<void>;
}

export default TopBarI;
