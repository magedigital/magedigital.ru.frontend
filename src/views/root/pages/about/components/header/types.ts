import DefaultI from '@/src/components/default/types';

type PropsT = {};

type StateT = {
    titleIsAnimated?: boolean;
    textIsAnimated?: boolean;
    decorIsAnimated?: boolean;
};

interface HeaderI extends DefaultI<PropsT, StateT> {}

export default HeaderI;
