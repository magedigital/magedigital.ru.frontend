import { KeyboardEvent, MouseEvent, WheelEvent } from 'react';

import { StoreT } from '@store/store';

type PropsT = Partial<{
    className: string;
    id: string;
    children: React.ReactNode;
    getParent?: () => HTMLElement | undefined | null;
    authUser?: StoreT['user'];
    isCheckAuth?: StoreT['isCheckAuth'];
    onClick?: (e: MouseEvent) => void;
}>;

type StateT = {
    loadingKey?: string;
    isInit?: boolean;
};

type KeysT = 'Enter' | 'Escape' | 'ArrowRight' | 'ArrowLeft' | 'Backspace' | 'KeyC' | 'KeyV';

type FnDataT<I extends DefaultI, T extends ObjT> = T & { otherState?: Partial<I['state']> };

interface DefaultI<P = ObjT, S = ObjT> extends React.Component<PropsT & P, StateT & S> {
    props: PropsT & P;
    state: StateT & S;

    id: string;
    parent: React.RefObject<HTMLDivElement | null>;
    unmountHandlers: Record<string, () => void>;
    timers: Record<string, ReturnType<typeof setTimeout>>;
    intervals: Record<string, ReturnType<typeof setInterval>>;
    changedProps: Record<keyof (PropsT & P), unknown>;
    changingProps?: (keyof (PropsT & P) | string)[];
    isSetStartCalcSize?: boolean;
    isSetEndCalcSize?: boolean;
    savedPrevPageUrl?: string;
    isCheckAuth?: boolean;
    isDocFocus?: boolean;
    isOnline?: boolean;
    keys?: readonly KeysT[];
    wheelScrollNodeClass?: string;

    init?: () => Promise<void>;

    asyncSetState(this: DefaultI, data: Partial<StateT & S>): Promise<void>;
    getClass(this: DefaultI, ...classes: any[]): string;
    setClass(this: DefaultI, ...classes: any[]): string;

    checkChangeProps: (this: DefaultI) => Promise<void>;
    changePropsCb?: (prop: keyof (PropsT & P)) => Promise<void>;
    checkAuthCb?: () => Promise<void>;

    checkCalcSize: (this: DefaultI) => void;
    getCalcSizeParams?: () => {
        getParentNode: () => HTMLElement | undefined;
        getNode: () => HTMLElement | undefined;
        minSize: number;
    };

    visibilityHandler(this: DefaultI): void;
    visibilityCb?: (vis: boolean) => void;

    onlineHandler(this: DefaultI): void;
    onlineCb?: (isOnline: boolean) => Promise<void>;

    visibillityChangeHandler?(this: DefaultI): Promise<void>;

    keysHandler(this: DefaultI, e: KeyboardEvent): Promise<void>;
    keysCallback?(
        this: DefaultI,
        data: {
            e: KeyboardEvent;
            name: KeysT;
            isMeta: boolean;
            isShift: boolean;
            isCtrl: boolean;
        },
    ): Promise<void>;

    wheelScrollHandler(this: DefaultI, e: WheelEvent): void;
}

export default DefaultI;
export type { FnDataT };
