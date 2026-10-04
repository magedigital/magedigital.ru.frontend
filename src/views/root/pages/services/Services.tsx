import React from 'react';

import Page from '@/src/components/page/Page.tsx';
import { StoreT, WithStore } from '@/src/store/store.tsx';

import Footer from '../../components/footer/Footer.tsx';
import Advantages from './components/advantages/Advantages.tsx';
import Header from './components/header/Header.tsx';
import Layers from './components/layers/Layers.tsx';
import Road from './components/road/Road.tsx';

import onPageInit from './methods/onPageInit.ts';

import ServicesI from './types.ts';

class Services extends Page<ServicesI['props'], ServicesI['state']> implements ServicesI {
    parent: ServicesI['parent'];

    constructor(props: ServicesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    name = 'services';

    onPageInit = onPageInit;

    render() {
        const { contents } = this.props;

        return this.renderPage({
            render: () =>
                contents.services && (
                    <>
                        <div className="page__section _FULL_W">
                            <Header content={contents.services} />
                        </div>
                        <div className="page__section _FULL_W">
                            <Layers />
                        </div>
                        <div className="page__section _FULL_W">
                            <Advantages />
                        </div>
                        <div className="page__section _FULL_W">
                            <Road />
                        </div>
                        <div className="page__section _FULL_W">
                            <Footer />
                        </div>
                    </>
                ),
        });
    }
}

const mapStore = (s: StoreT) => ({
    currentPopup: s.currentPopup,
    contents: s.contents,
});

export default WithStore(Services, mapStore);
