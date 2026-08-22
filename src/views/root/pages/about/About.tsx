import React from 'react';

import Page from '@/src/components/page/Page.tsx';

import Footer from '../../components/footer/Footer.tsx';
import Advantages from './components/advantages/Advantages.tsx';
import Header from './components/header/Header.tsx';
import History from './components/history/History.tsx';
import Info from './components/info/Info.tsx';
import Stats from './components/stats/Stats.tsx';
import Team from './components/team/Team.tsx';

import AboutI from './types.ts';

class About extends Page<AboutI['props'], AboutI['state']> implements AboutI {
    parent: AboutI['parent'];

    constructor(props: AboutI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    name = 'about';

    render() {
        return this.renderPage({
            render: () => (
                <>
                    <div className="page__section _FULL_W">
                        <Header />
                    </div>
                    <div className="page__section _FULL_W">
                        <Stats />
                    </div>
                    <div className="page__section _FULL_W">
                        <History />
                    </div>
                    <div className="page__section _FULL_W">
                        <Team />
                    </div>
                    <div className="page__section _FULL_W">
                        <Info />
                    </div>
                    <div className="page__section _FULL_W">
                        <Advantages />
                    </div>
                    <div className="page__section _FULL_W">
                        <Footer />
                    </div>
                </>
            ),
        });
    }
}

export default About;
