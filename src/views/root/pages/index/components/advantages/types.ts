import DefaultI from '@/src/components/default/types';

import { HomePageContentT } from '../../types';

type PropsT = {
    content: HomePageContentT;
};

type StateT = {};

interface AdvantagesI extends DefaultI<PropsT, StateT> {}

export default AdvantagesI;
