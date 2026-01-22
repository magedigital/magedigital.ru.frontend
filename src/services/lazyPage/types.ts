import { PageNamesT } from '@services/router/static/pages';

type ComponentT = React.ElementType;

type LoadPagesT = Partial<Record<PageNamesT, { load?: boolean; Component: ComponentT }>>;

type StateT = { loadPages: LoadPagesT; isLoad?: boolean };
type PropsT = { context: React.Component<{}, StateT> };

interface LazyComponentI extends React.Component<PropsT, StateT> {}

interface LazyPageI extends LazyComponentI {
    state: StateT;
    props: PropsT;

    context: PropsT['context'];

    loadComponent: (name: PageNamesT) => Promise<ComponentT | undefined>;
    loadPage: (this: LazyPageI, name: PageNamesT) => Promise<void>;

    renderPage: (
        this: LazyPageI,
        name: PageNamesT,
        DefaultPage?: ComponentT,
        props?: Record<any, unknown>,
    ) => React.ReactElement;
}

export default LazyPageI;

export type { LazyComponentI, LoadPagesT };
