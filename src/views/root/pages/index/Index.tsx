import React from 'react';

import Page from '@/src/components/page/Page.tsx';

import Footer from '../../components/footer/Footer.tsx';
import Advantages from './components/advantages/Advantages.tsx';
import Best from './components/best/Best.tsx';
import Brands from './components/brands/Brands.tsx';
import Header from './components/header/Header.tsx';
import Projects from './components/projects/Projects.tsx';
import Services from './components/services/Services.tsx';
import Stats from './components/stats/Stats.tsx';

import IndexI from './types.ts';

class Index extends Page<IndexI['props'], IndexI['state']> implements IndexI {
    parent: IndexI['parent'];

    constructor(props: IndexI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    name = 'index';

    render() {
        return this.renderPage({
            render: () => (
                <>
                    <div className="page__section _FULL_W">
                        <Header />
                    </div>
                    <div className="page__section _FULL_W">
                        <Brands />
                    </div>
                    <div className="page__section _FULL_W">
                        <Stats />
                    </div>
                    <div className="page__section _FULL_W">
                        <Services />
                    </div>
                    <div className="page__section _FULL_W">
                        <Projects />
                    </div>
                    <div className="page__section _FULL_W">
                        <Advantages />
                    </div>
                    <div className="page__section _FULL_W">
                        <Best />
                    </div>
                    <div className="page__section _FULL_W">
                        <Footer />
                    </div>
                </>
            ),
        });
    }
}

export default Index;
