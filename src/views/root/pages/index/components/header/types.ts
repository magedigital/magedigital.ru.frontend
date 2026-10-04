import DefaultI from '@/src/components/default/types';

import { HomePageContentT } from '../../types';

type PropsT = {
    content: HomePageContentT;
};

type StateT = {
    titleIsAnimated?: boolean;
    textIsAnimated?: boolean;
    buttonIsAnimated?: boolean;
    frameIsAnimated?: boolean;
};

interface HeaderI extends DefaultI<PropsT, StateT> {}

export default HeaderI;
