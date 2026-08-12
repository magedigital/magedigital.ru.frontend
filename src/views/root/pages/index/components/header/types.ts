import DefaultI from '@/src/components/default/types';

type PropsT = {};

type StateT = {
    titleIsAnimated?: boolean;
    textIsAnimated?: boolean;
    buttonIsAnimated?: boolean;
    frameIsAnimated?: boolean;
};

interface HeaderI extends DefaultI<PropsT, StateT> {}

export default HeaderI;
