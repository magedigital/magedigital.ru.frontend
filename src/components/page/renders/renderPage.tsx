import React from 'react';

import MobMenu from '../components/mobMenu/MobMenu.tsx';
import TopBar from '../components/topBar/TopBar.tsx';

import I from '../types.ts';

import Fade from '../../fade/Fade.tsx';
import Media from '../../media/Media.tsx';

const renderPage: I['renderPage'] = function ({ render }) {
    const { isMobMenuShow } = this.state;

    return (
        <div ref={this.parent} className="page">
            <Media media="desktop">
                <div className="page__topBar _FULL_W _fix">
                    <TopBar mode="fix" device="desktop" />
                </div>
            </Media>
            <Media media="mobile">
                <div className="page__topBar _FULL_W _fix">
                    <TopBar
                        mode="fix"
                        device="mobile"
                        onMobMenu={async (s = !isMobMenuShow) => {
                            await this.asyncSetState({ isMobMenuShow: s });
                        }}
                        isMobMenuShow={isMobMenuShow}
                    />
                </div>
                <Fade className="page__mobMenu _FULL" isShow={!!isMobMenuShow}>
                    <MobMenu
                        onShowState={async (s = !isMobMenuShow) => {
                            await this.asyncSetState({ isMobMenuShow: s });
                        }}
                    />
                </Fade>
            </Media>
            <div className="page__scroll _FULL _NOSCROLL">
                <Media media="desktop">
                    <div className="page__topBar _FULL_W">
                        <TopBar mode="default" device="desktop" />
                    </div>
                </Media>

                <div className="page__inner _FULL_W">{render()}</div>
            </div>
        </div>
    );
};

export default renderPage;
