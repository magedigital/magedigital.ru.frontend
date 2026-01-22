import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './services/router/Router.ts';
import { StoreT, appStore } from './store/store.tsx';
import Root from './views/root/Root.tsx';

const resultPages = {} as StoreT['pages'];

const AppRouter = new Router();
const path = AppRouter.getStartUrl(window.location.pathname.slice(1));

(Object.keys(AppRouter.pages) as (keyof typeof AppRouter.pages)[]).forEach((name) => {
    resultPages[name] = {
        isShow: false,
    };
});

(async () => {
    const { storePages, levels, pagesIds } = await AppRouter.changePage({
        href: path,
        storePages: resultPages,
        start: true,
    });

    if (levels?.[0]) {
        (document.querySelector('body') as HTMLElement).classList.add(`_${levels[0]}`);
    }

    appStore.getState().setLevels(levels!);
    appStore.getState().setPages(storePages!);
    appStore.getState().setPagesIds(pagesIds!);
    appStore.getState().rootInit();
})();

document.oncontextmenu = (e) => {
    e.preventDefault();
};

const loads: {
    event?: boolean;
    fonts?: boolean;
} = {};

const checkLoad = () => {
    if (loads.event && loads.fonts) {
        setTimeout(() => {
            appStore.getState().windowLoad();
        }, 10);
    }
};

document.fonts.ready.then(() => {
    setTimeout(() => {
        loads.fonts = true;

        checkLoad();
    }, 10);
});

window.onload = () => {
    setTimeout(() => {
        const style = document.querySelector('.initStyle');

        if (style) {
            style.remove();
        }

        loads.event = true;

        checkLoad();
    }, 10);
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<Root />);

export { AppRouter };
