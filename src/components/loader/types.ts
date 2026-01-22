import items from './static/items.ts';

type PropsT = {
    className?: string;
};

type StateT = {};

interface LoaderI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    items: typeof items;
}

export default LoaderI;
