import DefaultI from '@/src/components/default/types';

import { ServicesPageContentT } from '../../types';

type PropsT = {
    content: ServicesPageContentT;
};

type StateT = {
    isAnimate?: boolean;
};

interface LayersI extends DefaultI<PropsT, StateT> {
    animateId?: number;

    cardAnimates: Partial<
        Record<number, { current: number; animate: (d: { index: number }) => void }>
    >;

    loadPlugins(this: LayersI): Promise<void>;
}

export default LayersI;
