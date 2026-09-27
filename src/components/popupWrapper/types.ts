import DefaultI from '@/src/components/default/types';
import { PopupsT } from '@/src/store/popups';

type PropsT = {
    name: keyof PopupsT;
    isShow: boolean;
    props?: Record<any, unknown>;
    duration?: number;
};

type StateT = {
    PopupComponent?: React.ElementType;
};

interface PopupWrapperI extends DefaultI<PropsT, StateT> {
    loadPopup(this: PopupWrapperI): Promise<void>;
}

export default PopupWrapperI;
