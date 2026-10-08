import DefaultI from '@/src/components/default/types';

import { AboutPageContentT } from '../../types';

type PropsT = {
    content: AboutPageContentT;
};

type StateT = {};

interface InfoI extends DefaultI<PropsT, StateT> {}

export default InfoI;
