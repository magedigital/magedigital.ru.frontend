import PageI from '@/src/components/page/types';
import { StoreT } from '@/src/store/store';

export type ServicesPageContentT = Partial<{
    'sections.hero': Partial<{
        title: string;
        subtitle: string;
    }>;
}>;

type PropsT = {
    contents: StoreT['contents'];
};

type StateT = {};

interface IndexI extends PageI<PropsT, StateT> {}

export default IndexI;
