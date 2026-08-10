import React from 'react';

import TopBar from '../components/topBar/TopBar.tsx';

import I from '../types.ts';

const renderPage: I['renderPage'] = function ({ render }) {
    return (
        <div ref={this.parent} className="page">
            <div className="page__topBar _FULL_W _fix">
                <TopBar mode="fix" />
            </div>
            <div className="page__scroll _FULL _NOSCROLL">
                <div className="page__topBar _FULL_W">
                    <TopBar mode="default" />
                </div>
                {render()}
            </div>
        </div>
    );
};

export default renderPage;
