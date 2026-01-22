import UserT from './models/User';

declare global {
    interface Window {
        widthValue: number;
        heightValue: number;
        mediaM: number;
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
            REACT_APP_SEO: string;
            REACT_APP_API: string;
        }
    }

    type ObjT = Record<any, unknown>;

    type ResponseT<T = {}> = {
        accessToken?: string;
        updatedAuthUser?: UserT;
    } & T;

    type ResponseErrorT = {
        accessToken?: string;
        message?: string;
        error?: ErrorT;
    };

    type ErrorT = {
        text: string;
        name?: string;
    };

    type FilterQueryT = {
        name: string;
        value: string;
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
}

export type {};
