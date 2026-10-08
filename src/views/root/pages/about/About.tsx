import React from 'react';

import Page from '@/src/components/page/Page.tsx';
import { StoreT, WithStore } from '@/src/store/store.tsx';

import Footer from '../../components/footer/Footer.tsx';
import Advantages from './components/advantages/Advantages.tsx';
import Header from './components/header/Header.tsx';
import History from './components/history/History.tsx';
import Info from './components/info/Info.tsx';
import Stats from './components/stats/Stats.tsx';
import Team from './components/team/Team.tsx';

import onPageInit from './methods/onPageInit.ts';

import AboutI from './types.ts';

class About extends Page<AboutI['props'], AboutI['state']> implements AboutI {
    parent: AboutI['parent'];

    constructor(props: AboutI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    name = 'about';

    onPageInit = onPageInit;

    render() {
        const { contents } = this.props;

        return this.renderPage({
            render: () =>
                contents.about && (
                    <>
                        <div className="page__section _FULL_W">
                            <Header content={contents.about} />
                        </div>
                        <div className="page__section _FULL_W">
                            <Stats content={contents.about} />
                        </div>
                        <div className="page__section _FULL_W">
                            <History content={contents.about} />
                        </div>
                        <div className="page__section _FULL_W">
                            <Team content={contents.about} />
                        </div>
                        <div className="page__section _FULL_W">
                            <Info content={contents.about} />
                        </div>
                        <div className="page__section _FULL_W">
                            <Advantages content={contents.about} />
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

export default WithStore(About, mapStore);
