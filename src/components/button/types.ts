import DefaultI from '@/src/components/default/types';

import { IconT } from '../icon/types';

type PropsT = {
    icon?: IconT;
};

type StateT = {};

interface ButtonI extends DefaultI<PropsT, StateT> {
    onHover(this: ButtonI, a: 'enter' | 'leave'): Promise<void>;
}

export default ButtonI;
