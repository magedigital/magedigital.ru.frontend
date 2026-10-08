import PageI from '@/src/components/page/types';
import { StoreT } from '@/src/store/store';

export type AboutPageContentT = Partial<{
    'sections.hero': StrapiBlockT<{
        title: string;
        subtitle: string;
    }>;
    'sections.mage': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
        steps: StrapiBlockT<{
            title: string;
            logo: StrapiSvgT;
            text: string;
            icon: StrapiSvgT;
            color: string;
        }>[];
    }>;
    'sections.history': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
        thenTitle: string;
        nowTitle: string;
        thenPhotos: StrapiBlockT<{
            image: StrapiImageT;
        }>[];
        nowPhotos: StrapiBlockT<{
            image: StrapiImageT;
        }>[];
    }>;
    'sections.team': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
        members: StrapiBlockT<{
            name: string;
            mission: string;
            position: string;
            video: StrapiVideoT;
        }>[];
    }>;
    'sections.principles': StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
        principles: StrapiBlockT<{
            title: string;
            text: string;
            color: string;
        }>[];
    }>;
    partner: StrapiTextT;
}>;

type PropsT = {
    contents: StoreT['contents'];
};

type StateT = {};

interface IndexI extends PageI<PropsT, StateT> {}

export default IndexI;
