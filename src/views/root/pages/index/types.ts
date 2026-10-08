import PageI from '@/src/components/page/types';
import { StoreT } from '@/src/store/store';

export type HomePageContentT = Partial<{
    'sections.hero': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
    }>;
    'sections.video': StrapiBlockT<{
        title: string;
        video: StrapiVideoT;
    }>;
    'sections.stats': StrapiBlockT<{
        stats: StrapiBlockT<{
            value: string;
            label: string;
        }>[];
    }>;
    'sections.solutions': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
        solutions: StrapiBlockT<{
            text: string;
            title: string;
            color: string;
            button: StrapiButtonT;
            video: StrapiVideoT;
        }>[];
    }>;
    'sections.advantages': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
        advantages: StrapiBlockT<{
            title: string;
            color: string;
            text: string;
        }>[];
    }>;
    ideas: StrapiTextT;
    layers: StrapiTextT;
    ndaCases: StrapiTextT;
}>;

type PropsT = {
    contents: StoreT['contents'];
};

type StateT = {};

interface IndexI extends PageI<PropsT, StateT> {}

export default IndexI;
