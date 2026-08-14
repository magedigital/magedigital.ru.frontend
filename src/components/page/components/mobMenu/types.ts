import DefaultI from '@/src/components/default/types';

type PropsT = {
    onShowState: (s?: boolean) => Promise<void>;
};

type StateT = {};

interface MobMenuI extends DefaultI<PropsT, StateT> {}

export default MobMenuI;
