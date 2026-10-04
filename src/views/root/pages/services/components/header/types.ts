import DefaultI from '@/src/components/default/types';

import { ServicesPageContentT } from '../../types';

type PropsT = {
    content: ServicesPageContentT;
};

type StateT = {
    titleIsAnimated?: boolean;
    textIsAnimated?: boolean;
    decorIsAnimated?: boolean;
};

interface HeaderI extends DefaultI<PropsT, StateT> {}

export default HeaderI;
