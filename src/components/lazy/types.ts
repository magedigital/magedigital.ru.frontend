import DefaultI from '@/src/components/default/types';

type PropsT = {
    render: () => React.ReactNode;
    getScrollNode: () => HTMLElement | undefined | null;
};

type StateT = {
    isVisible?: boolean;
};

interface LazyI extends DefaultI<PropsT, StateT> {}

export default LazyI;
