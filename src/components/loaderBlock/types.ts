import DefaultI from '@components/default/types';

type PropsT = {
    className: string;
    itemClassName?: string;
    loaderClassName?: string;
    isShow: boolean;
    isScroll?: boolean;
    isReverse?: boolean;
};

type StateT = {};

interface LoaderBlockI extends DefaultI<PropsT, StateT> {}

export default LoaderBlockI;
