import DefaultI from '@/src/components/default/types';

type PropsT = {};

type StateT = {
    isMobMenuShow?: boolean;
};

interface PageI<P = {}, S = {}> extends DefaultI<PropsT & P, StateT & S> {
    name: string;
    fixTopBarIsShow?: boolean;

    renderPage(
        this: PageI,
        d: {
            render: () => React.ReactNode;
        },
    ): React.ReactNode;
}

export default PageI;
