import DefaultI from '@/src/components/default/types';

type PropsT = {
    mode: 'default' | 'fix';
};

type StateT = {
    activeLink?: string;
    isMenuActive?: boolean;
};

interface TopBarI extends DefaultI<PropsT, StateT> {
    setActive(this: TopBarI, name: string | undefined): Promise<void>;
}

export default TopBarI;
