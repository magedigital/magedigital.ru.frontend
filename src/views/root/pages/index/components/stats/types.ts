import DefaultI from '@/src/components/default/types';

import { HomePageContentT } from '../../types';

type PropsT = {
    content: HomePageContentT;
};

type StateT = {
    isInit?: boolean;
};

interface StatsI extends DefaultI<PropsT, StateT> {
    currentStat: number;
    animateId?: number;
}

export default StatsI;
