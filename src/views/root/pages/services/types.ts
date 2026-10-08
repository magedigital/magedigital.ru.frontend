import PageI from '@/src/components/page/types';
import { StoreT } from '@/src/store/store';

export type ServicesPageContentT = Partial<{
    'sections.hero': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
    }>;
    'sections.services': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
        services: StrapiBlockT<{
            video: StrapiVideoT;
            title: string;
            text: string;
            subtitle: string;
            items: StrapiBlockT<{ title: string }>[];
        }>[];
    }>;
    'sections.collab': StrapiBlockT<{
        title: string;
        subtitle: string;
        text: string;
        button: StrapiButtonT;
        collabs: StrapiBlockT<{
            title: string;
            subtitle: string;
            cards: StrapiBlockT<{
                title: string;
                logo: StrapiImageT;
            }>[];
        }>[];
    }>;
    'sections.process': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
        steps: StrapiBlockT<{
            title: string;
            text: string;
        }>[];
    }>;
}>;

type PropsT = {
    contents: StoreT['contents'];
};

type StateT = {};

interface IndexI extends PageI<PropsT, StateT> {}

export default IndexI;
