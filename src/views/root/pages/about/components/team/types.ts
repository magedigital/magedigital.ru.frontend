import DefaultI from '@/src/components/default/types';

type PropsT = {};

type StateT = {
    activePerson: number;
};

interface TeamI extends DefaultI<PropsT, StateT> {
    animateId?: number;
}

export default TeamI;
