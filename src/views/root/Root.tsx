import React from 'react';

import Default from '@/src/components/default/Default.tsx';
import Pages from '@/src/components/pages/Pages.tsx';
import { PopupT, popups } from '@/src/store/popups.ts';

import init from './methods/init.ts';
import popupsHandler from './methods/popupsHandler.ts';
import resizeHandler from './methods/resizeHandler.ts';

import RootI from './types.ts';

import { AppRouter } from '../../index.tsx';
import { StoreT, WithStore } from '../../store/store.tsx';
import renderCookies from './renders/renderCookies.tsx';
import renderPopups from './renders/renderPopups.tsx';
import pages from './static/pages.tsx';

const Styles = typeof window !== 'undefined' && require('./components/Styles.tsx').default;

class Root extends Default<RootI['props'], RootI['state']> implements RootI {
    parent: React.RefObject<HTMLDivElement | null>;

    constructor(props: RootI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    pages = pages;

    resizeHandler = resizeHandler;
    popupsHandler = popupsHandler;

    init = init;

    renderCookies = renderCookies;
    renderPopups = renderPopups;

    render() {
        const { isRootInit } = this.props;

        return (
            <>
                {Styles && <Styles />}
                {this.renderCookies()}
                {this.renderPopups()}
                <div className="body__content">
                    {isRootInit && (
                        <Pages
                            context={this}
                            pages={this.pages}
                            filter={(name) => !AppRouter.pages[name].level}
                        />
                    )}
                </div>
            </>
        );
    }
}

const mapStore = (s: StoreT) => ({
    isRootInit: s.isRootInit,
    isAcceptCookies: s.isAcceptCookies,
    currentPopup: s.currentPopup,
    ...(() => {
        const popupsData: Record<keyof typeof popups, PopupT> = {} as Record<
            keyof typeof popups,
            PopupT
        >;

        (Object.keys(popups) as (keyof typeof popups)[]).forEach((key) => {
            popupsData[key] = s[key];
        });

        return popupsData;
    })(),
});

export default WithStore(Root, mapStore);
