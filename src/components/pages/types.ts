import DefaultI from '@components/default/types';
import ListI from '@components/list/types';

import { PageNamesT } from '../../services/router/static/pages';
import { StoreT } from '../../store/store';

type PropsT = {
    context: React.Component;
    pages: Record<string, { render: () => React.ReactNode }>;
    storePages: StoreT['pages'];
    filter: (page: PageNamesT) => boolean;
    parentClass?: string;
    itemClass?: string;
    parentName?: PageNamesT;
    parentStyleProps?: ListI['props']['parentStyleProps'];
    parentRealStyleProps?: ListI['props']['parentRealStyleProps'];
    renderKey?: string;
    render404?: () => React.ReactNode;
};

type StateT = {
    pages: PageNamesT[];
};

interface PagesI extends DefaultI<PropsT, StateT> {
    init(this: PagesI): Promise<void>;
    getPages(this: PagesI, all?: boolean): { _id: string }[];
}

export default PagesI;
