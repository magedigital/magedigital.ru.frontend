import DefaultI from '@/src/components/default/types';

import { servicesAdvantagesTypes } from './static/types';

type PropsT = {};

type StateT = {
    currentType: keyof typeof servicesAdvantagesTypes;
    hoverCard?: number;
    updatedKey?: string;
};

interface AdvantagesI extends DefaultI<PropsT, StateT> {
    setType(this: AdvantagesI, d: { type: StateT['currentType']; card?: number }): Promise<void>;

    renderCards(this: AdvantagesI, d: { type: StateT['currentType'] }): React.ReactNode;
}

export default AdvantagesI;
