import React from 'react';

import Page from '@/src/components/page/Page.tsx';
import { StoreT, WithStore } from '@/src/store/store.tsx';

import Footer from '../../components/footer/Footer.tsx';
import Advantages from './components/advantages/Advantages.tsx';
import Best from './components/best/Best.tsx';
import Brands from './components/brands/Brands.tsx';
import Header from './components/header/Header.tsx';
import Services from './components/services/Services.tsx';
import ServicesInfo from './components/servicesInfo/ServicesInfo.tsx';
import Stats from './components/stats/Stats.tsx';

import onPageInit from './methods/onPageInit.ts';

import IndexI from './types.ts';

class Index extends Page<IndexI['props'], IndexI['state']> implements IndexI {
    parent: IndexI['parent'];

    constructor(props: IndexI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    name = 'index';

    onPageInit = onPageInit;

    render() {
        const { contents } = this.props;

        return this.renderPage({
            render: () =>
                contents.home && (
                    <>
                        <div className="page__section _FULL_W">
                            <Header content={contents.home} />
                        </div>
                        <div className="page__section _FULL_W">
                            <Brands />
                        </div>
                        <div className="page__section _FULL_W">
                            <Stats content={contents.home} />
                        </div>
                        <div className="page__section _FULL_W">
                            <Services content={contents.home} />
                        </div>
                        <div className="page__section _FULL_W">
                            <ServicesInfo content={contents.home} />
                        </div>
                        {/* <div className="page__section _FULL_W">
                        <Projects />
                    </div> */}
                        <div className="page__section _FULL_W">
                            <Advantages content={contents.home} />
                        </div>
                        <div className="page__section _FULL_W">
                            <Best content={contents.home} />
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

export default WithStore(Index, mapStore);
