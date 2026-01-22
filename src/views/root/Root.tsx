import React from 'react';

import Pages from '@components/pages/Pages.tsx';

import init from './methods/init.ts';
import resizeHandler from './methods/resizeHandler.ts';

import RootI from './types.ts';

import { AppRouter } from '../../index.tsx';
import { StoreT, WithStore } from '../../store/store.tsx';
import pages from './static/pages.tsx';

const Styles = typeof window !== 'undefined' && require('./components/Styles.tsx').default;

class Root extends React.Component<RootI['props'], RootI['state']> implements RootI {
    parent: React.RefObject<HTMLDivElement | null>;

    constructor(props: RootI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    pages = pages;

    resizeHandler = resizeHandler;

    init = init;

    componentDidMount(): void {
        this.init();
    }

    render() {
        const { isRootInit } = this.props;

        return (
            <>
                {Styles && <Styles />}
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

const mapStore = (store: StoreT) => ({
    isRootInit: store.isRootInit,
});

export default WithStore(Root, mapStore);
