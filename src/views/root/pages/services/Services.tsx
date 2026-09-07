import React from 'react';

import Page from '@/src/components/page/Page.tsx';

import Footer from '../../components/footer/Footer.tsx';
import Advantages from './components/advantages/Advantages.tsx';
import Header from './components/header/Header.tsx';
import Layers from './components/layers/Layers.tsx';
import Road from './components/road/Road.tsx';

import ServicesI from './types.ts';

class Services extends Page<ServicesI['props'], ServicesI['state']> implements ServicesI {
    parent: ServicesI['parent'];

    constructor(props: ServicesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    name = 'services';

    render() {
        return this.renderPage({
            render: () => (
                <>
                    <div className="page__section _FULL_W">
                        <Header />
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

export default Services;
