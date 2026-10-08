import DefaultI from '@/src/components/default/types';
import { StoreT } from '@/src/store/store';

type PropsT = {
    contents: StoreT['contents'];
};

type StateT = {};

interface FooterI extends DefaultI<PropsT, StateT> {
    animateId?: number;
}

export default FooterI;
