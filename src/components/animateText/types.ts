import DefaultI from '@/src/components/default/types';

type PropsT = {
    delay: number;
    tag?: string;
};

type StateT = {};

interface AnimateTextI extends DefaultI<PropsT, StateT> {}

export default AnimateTextI;
