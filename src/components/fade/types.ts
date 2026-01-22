import DefaultI from '@components/default/types';

type PropsT = {
    isShow: boolean;
    initCb?: () => void;
    onClick?: () => void;
    style?: ObjT;
};

type StateT = {
    isShow: boolean;
};

interface FadeI extends DefaultI<PropsT, StateT> {
    timerId?: ReturnType<typeof setTimeout>;

    isShow?: boolean;
    inited?: boolean;

    checkChange(this: FadeI, start?: boolean): Promise<void>;
}

export default FadeI;
