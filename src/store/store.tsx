import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

import React from 'react';

import UserT from '@/src/global/models/User';

import { enums } from '../global/enums';

import { PageNamesT } from '../services/router/static/pages';
import { AboutPageContentT } from '../views/root/pages/about/types';
import { HomePageContentT } from '../views/root/pages/index/types';
import { ServicesPageContentT } from '../views/root/pages/services/types';
import { PopupsReducersT, PopupsT, createPopupsStore } from './popups';

type StorePagesT = {
    isShow: boolean;
    id?: string;
    data?: Record<string, any>;
};

type ContentsT = {
    global: GlobalContentT;
    home: HomePageContentT;
    services: ServicesPageContentT;
    about: AboutPageContentT;
};

export type NotificationT = { id: string; type: 'success' | 'error'; text: string };

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
    isAcceptCookies: boolean;
    currentPopup?: keyof PopupsT;
    isInputFocus?: boolean;
    contents: Partial<ContentsT>;
    notification?: NotificationT;
} & PopupsT;

type ReducersT = {
    setDevice: (device: StoreT['device']) => void;
    setPages: (pages: StoreT['pages']) => void;
    setLevels: (levels: StoreT['levels']) => void;
    setPagesIds: (pagesIds: StoreT['pagesIds']) => void;
    rootInit: () => void;
    windowLoad: () => void;
    showCookies: () => void;
    acceptCookies: () => void;
    setInputFocus: (s: boolean) => void;
    setContent: <N extends keyof ContentsT>(name: N, data: ContentsT[N]) => void;
    setNotification: (n: Omit<NotificationT, 'id'> | undefined) => void;
} & PopupsReducersT;

let notificationTimerId: ReturnType<typeof setTimeout> | undefined;

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
    isAcceptCookies: true,
    setInputFocus: (s) => set({ isInputFocus: s }),
    showCookies: () => {
        const isAcceptCookies = localStorage.getItem(enums.ACCEPT_COOKIES);
        if (isAcceptCookies) {
            return;
        }
        set({ isAcceptCookies: false });
    },
    acceptCookies: () => {
        localStorage.setItem(enums.ACCEPT_COOKIES, 't');
        set({ isAcceptCookies: true });
    },
    contents: {},
    setContent: (name, data) => {
        const thisContents = { ...appStore.getState().contents };
        thisContents[name] = data;
        set({ contents: thisContents });
    },
    setNotification: (n) => {
        if (notificationTimerId) {
            clearTimeout(notificationTimerId);
            notificationTimerId = undefined;
        }

        set({ notification: n ? { ...n, id: [n.type, n.text].join('_') } : undefined });

        if (n) {
            notificationTimerId = setTimeout(() => {
                appStore.getState().setNotification(undefined);
            }, 3_000);
        }
    },
    ...createPopupsStore(set),
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
