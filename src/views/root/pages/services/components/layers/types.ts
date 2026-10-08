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
}

export default LayersI;
