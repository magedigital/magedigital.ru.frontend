import DefaultI from '@/src/components/default/types';
import { StoreT } from '@/src/store/store';

type PropsT = {
    mode: 'default' | 'fix';
    device: StoreT['device'];
    onMobMenu?: (s?: boolean) => Promise<void>;
    isMobMenuShow?: boolean;
};

type StateT = {
    activeLink?: string;
    isMenuActive?: boolean;
    isMenuReadyLinks?: boolean;
};

interface TopBarI extends DefaultI<PropsT, StateT> {
    isMobMenuShow?: boolean;

    setActive(this: TopBarI, name: string | undefined): Promise<void>;

    onContactsHover(this: TopBarI, a: 'enter' | 'leave'): Promise<void>;
}

export default TopBarI;
