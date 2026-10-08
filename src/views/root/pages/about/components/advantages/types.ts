import DefaultI from '@/src/components/default/types';

import { AboutPageContentT } from '../../types';

type PropsT = {
    content: AboutPageContentT;
};

type StateT = {};

interface AdvantagesI extends DefaultI<PropsT, StateT> {
    animateId?: number;
}

export default AdvantagesI;
