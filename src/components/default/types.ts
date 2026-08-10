import { MouseEvent } from 'react';

import { ThrottleSettingsT } from '@/src/utils/throttle';

type PropsT = Partial<{
    className: string;
    id: string;
    children: React.ReactNode;
    getParent: () => HTMLElement | undefined | null;
    onClick: (e: MouseEvent) => void;
    disabled: boolean;
}>;

type StateT = {
    loadingKey?: string;
    isInit?: boolean;
};

type KeysT =
    | 'Enter'
    | 'Escape'
    | 'ArrowRight'
    | 'ArrowLeft'
    | 'Backspace'
    | 'KeyC'
    | 'KeyV'
    | 'MetaLeft'
    | 'MetaRight'
    | 'ControlLeft'
    | 'ControlRight';

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
    isDocFocus?: boolean;
    isOnline?: boolean;
    wheelScrollNodeClass?: string;

    isStackProcess?: boolean;
    stack: (() => Promise<void>)[];

    init?: () => Promise<void>;
    defaultInit?: () => Promise<void>;
    updatedStateCallback?: () => Promise<void>;

    asyncSetState(this: DefaultI, data: Partial<StateT & S>): Promise<void>;
    getClass(this: DefaultI, ...classes: any[]): string;
    setClass(this: DefaultI, ...classes: any[]): string;

    checkChangeProps: (this: DefaultI) => Promise<void>;
    changePropsCb?: (prop: keyof (PropsT & P)) => Promise<void>;

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

    keysHandler(e: KeyboardEvent): Promise<void>;
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

    wheelScrollHandler(e: WheelEvent): void;

    addStack(this: DefaultI, d: () => Promise<void>): void;
    doStack(this: DefaultI): Promise<void>;

    throttles: Record<
        string,
        {
            fn: (n: string, fn: (d: any[]) => Promise<void>, s?: ThrottleSettingsT) => void;
            getTimerId: () => ReturnType<typeof setTimeout> | undefined;
        }
    >;
    throttlesData: Record<string, any[]>;
    addThrottle<N extends any>(
        this: DefaultI,
        n: string,
        dur: number,
        d: N[],
        fn: (d: N[]) => Promise<void>,
        s?: ThrottleSettingsT,
    ): void;
    throttleHandler(this: DefaultI, n: string, fn: (d: any[]) => Promise<void>): Promise<void>;
}

export default DefaultI;
export type { FnDataT, KeysT };
