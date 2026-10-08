import DefaultI from '@/src/components/default/types';

import { ServicesPageContentT } from '../../types';

type PropsT = {
    content: ServicesPageContentT;
};

type StateT = {
    currentType: number;
    hoverCard?: number;
    updatedKey?: string;
};

interface AdvantagesI extends DefaultI<PropsT, StateT> {
    setType(this: AdvantagesI, d: { type: StateT['currentType']; card?: number }): Promise<void>;

    renderCard(this: AdvantagesI, d: { index: number }): React.ReactNode;
}

export default AdvantagesI;
