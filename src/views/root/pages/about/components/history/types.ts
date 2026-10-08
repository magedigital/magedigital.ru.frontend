import DefaultI from '@/src/components/default/types';

import { AboutPageContentT } from '../../types';

type PropsT = {
    content: AboutPageContentT;
};

type StateT = {};

interface HistoryI extends DefaultI<PropsT, StateT> {
    animates: Partial<{ top: boolean; bottom: boolean }>;
}

export default HistoryI;
