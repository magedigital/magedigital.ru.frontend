import { StoreT } from '@/src/store/store';

type PropsT = {
    device: StoreT['device'];
    check: (d: StoreT['device']) => boolean;
    children: React.ReactNode;
};

type StateT = {};

interface MediaI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default MediaI;
