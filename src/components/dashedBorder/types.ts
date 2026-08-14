import DefaultI from '@/src/components/default/types';

type PropsT = Partial<{
    isFull: boolean;
}>;

type StateT = {
    width?: number;
    height?: number;
    isInit?: boolean;
};

interface DashedBorderI extends DefaultI<PropsT, StateT> {}

export default DashedBorderI;
