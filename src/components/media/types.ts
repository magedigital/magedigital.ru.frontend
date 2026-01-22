import { StoreT } from '@store/store';

type PropsT = {
    device: StoreT['device'];
    media: StoreT['device'];
    children: React.ReactNode;
};

type StateT = {};

interface MediaI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
}

export default MediaI;
