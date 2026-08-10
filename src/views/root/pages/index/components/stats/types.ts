import DefaultI from '@/src/components/default/types';

type PropsT = {};

type StateT = {
    isInit?: boolean;
};

interface StatsI extends DefaultI<PropsT, StateT> {
    currentStat: number;
    animateId?: number;
}

export default StatsI;
