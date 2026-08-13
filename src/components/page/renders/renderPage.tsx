import React from 'react';

import TopBar from '../components/topBar/TopBar.tsx';

import I from '../types.ts';

import Media from '../../media/Media.tsx';

const renderPage: I['renderPage'] = function ({ render }) {
    return (
        <div ref={this.parent} className="page">
            <Media media="desktop">
                <div className="page__topBar _FULL_W _fix">
                    <TopBar mode="fix" device="desktop" />
                </div>
            </Media>
            <Media media="mobile">
                <div className="page__topBar _FULL_W _fix">
                    <TopBar mode="fix" device="mobile" />
                </div>
            </Media>
            <div className="page__scroll _FULL _NOSCROLL">
                <Media media="desktop">
                    <div className="page__topBar _FULL_W">
                        <TopBar mode="default" device="desktop" />
                    </div>
                </Media>
                <Media media="mobile">
                    <div className="page__topBar _FULL_W">
                        <TopBar mode="default" device="mobile" />
                    </div>
                </Media>
                <div className="page__inner _FULL_W">{render()}</div>
            </div>
        </div>
    );
};

export default renderPage;
