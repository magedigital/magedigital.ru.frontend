import DefaultI from '@/src/components/default/types';

type PropsT = {};

type StateT = {
    isAnimate?: boolean;
};

interface LayersI extends DefaultI<PropsT, StateT> {
    animateId?: number;
}

export default LayersI;
