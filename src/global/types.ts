import UserT from './models/User';

declare global {
    interface Window {
        widthValue: number;
        heightValue: number;
        mediaM: number;
        sizeK: number;
        widthPrevValue: number;
        heightPrevValue: number;
        visibilityEvents: Record<string, () => void>;
        lists: Record<
            string,
            {
                items: any[];
                count: number;
                currentStep: number;
                isLimit: boolean;
                scrollTop?: number;
                date: number;
            }
        >;
        escapeGoBack?: boolean;
        eventTimeSlot: number;
        eventVisibleTimeSlot: number;
    }

    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_STRAPI_TOKEN: string;
            REACT_APP_API_HOST: string;
        }
    }

    type ObjT = Record<any, unknown>;

    type ResponseT<T = {}> = {
        accessToken?: string;
        updatedAuthUser?: UserT;
    } & T;

    type ResponseErrorT = {
        error: {
            message: string;
            details?: Record<string, string>;
        };
    };

    type ErrorT = {
        text: string;
        name?: string;
    };

    type ListenerT<T = MouseEvent | TouchEvent> = (
        event: string,
        listener: (event: T) => void,
        options?: {
            passive?: boolean;
            once?: boolean;
            capture?: boolean;
        },
    ) => void;

    type CustomListenerT = (
        event: string,
        listener: (event: CustomEvent) => void,
        options?: {
            passive?: boolean;
            once?: boolean;
            capture?: boolean;
        },
    ) => void;

    type MetaModelDataT = {
        _id: string;
        cDate: number;
    };

    type FileT = {
        size?: number;
        name?: string;
        width?: number;
        height?: number;
        fullSrc?: string;
    };

    type GlobalContentT = Partial<{
        contacts: StrapiBlockT<{
            agreementLabel: string;
            contactPlaceholder: string;
            contactsTitle: string;
            namePlaceholder: string;
            messagePlaceholder: string;
            sendButtonLabel: string;
            showButtonLabel: string;
            subtitle: string;
            tagsTitle: string;
            title: string;
            tags: StrapiBlockT<{ code: string; label: string }>[];
        }>;
        cookies: StrapiBlockT<{
            text: string;
            buttonLabel: string;
        }>;
        learnMore: StrapiBlockT<{
            title: string;
            subtitle: string;
            button: StrapiButtonT;
        }>;
        siteSettings: StrapiBlockT<{
            email: string;
            phone: string;
            address: string;
            copyright: string;
            privacyPolicyUrl: string;
            accreditationUrl: string;
        }>;
    }>;

    type StrapiBlockT<T extends ObjT = ObjT> = { id: number } & Partial<T>;

    type StrapiButtonT = StrapiBlockT<{
        label: string;
        url: string;
        target: '_self' | '_blank';
    }>;

    type StrapiVideoT = StrapiBlockT<{
        url: string;
    }>;

    type StrapiSvgT = StrapiBlockT<{ svgCode: string; svgFile: StrapiImageT }>;
    type StrapiImageT = StrapiBlockT<{ url: string }>;
    type StrapiTextT = StrapiBlockT<{
        title: string;
        subtitle: string;
        button: StrapiButtonT;
    }>;
}

export type {};
