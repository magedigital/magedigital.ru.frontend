import DefaultI from '@/src/components/default/types';

type PropsT = {};

type StateT = {};

interface HistoryI extends DefaultI<PropsT, StateT> {
    animates: Partial<{ top: boolean; bottom: boolean }>;
}

export default HistoryI;
