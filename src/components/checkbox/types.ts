import DefaultI from '@/src/components/default/types';

type PropsT = {
    value: boolean;
    onChange: (d: { value: boolean }) => Promise<void>;
};

type StateT = {};

interface CheckboxI extends DefaultI<PropsT, StateT> {}

export default CheckboxI;
