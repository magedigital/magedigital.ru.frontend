import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

import React from 'react';

import UserT from '@global/models/User';

import { PageNamesT } from '../services/router/static/pages';

type StorePagesT = {
    isShow: boolean;
    id?: string;
    data?: Record<string, any>;
};

type StoreT = {
    device: 'mobile' | 'desktop';
    pages: Record<PageNamesT, StorePagesT>;
    levels: string[];
    pagesIds: Record<string, number>;
    user?: UserT;
    isRootInit: boolean;
    isWindowLoad: boolean;
    isCheckAuth?: boolean;
    prevPageUrl?: string;
};

type ReducersT = {
    setDevice: (device: StoreT['device']) => void;
    setPages: (pages: StoreT['pages']) => void;
    setLevels: (levels: StoreT['levels']) => void;
    setPagesIds: (pagesIds: StoreT['pagesIds']) => void;
    rootInit: () => void;
    windowLoad: () => void;
};

const appStore = create<StoreT & ReducersT>((set) => ({
    device: 'desktop',
    setDevice: (device) => set({ device }),
    pages: {} as StoreT['pages'],
    setPages: (pages) => set({ pages }),
    levels: [],
    setLevels: (levels) => set({ levels }),
    pagesIds: {},
    setPagesIds: (pagesIds) => set({ pagesIds }),
    isRootInit: false,
    rootInit: () => set({ isRootInit: true }),
    isWindowLoad: false,
    windowLoad: () => set({ isWindowLoad: true }),
}));

const WithStore = function <
    T extends React.JSXElementConstructor<any>,
    M extends Partial<React.ComponentProps<T>>,
>(Target: T, mapState: (state: StoreT) => M) {
    return function WithStoreComponent(props: Omit<React.ComponentProps<T>, keyof M>) {
        const store = appStore(useShallow(mapState));
        const TargetComponent = Target as any;

        return <TargetComponent {...props} {...store} />;
    };
};

export { WithStore, appStore };
export type { StoreT };
