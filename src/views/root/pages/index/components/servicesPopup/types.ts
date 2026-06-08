import DefaultI from '@components/default/types';

type PropsT = {
    setState: (s: boolean) => Promise<void>;
};

type StateT = {};

interface ServicesPopupI extends DefaultI<PropsT, StateT> {}

export default ServicesPopupI;
