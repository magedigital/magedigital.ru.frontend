import DefaultI from '@/src/components/default/types';

import { ServicesPageContentT } from '../../types';

type PropsT = {
    content: ServicesPageContentT;
};

type StateT = {
    hoverCard?: number;
};

interface RoadI extends DefaultI<PropsT, StateT> {}

export default RoadI;
