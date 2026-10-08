import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
import { AppRouter } from '@/src/index.tsx';
import { appStore } from '@/src/store/store.tsx';

import init from './methods/init.ts';

import HeaderI from './types.ts';

class Header extends Default<HeaderI['props'], HeaderI['state']> implements HeaderI {
    parent: HeaderI['parent'];

    constructor(props: HeaderI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { titleIsAnimated, textIsAnimated, buttonIsAnimated, frameIsAnimated } = this.state;
        const { content } = this.props;

        return (
            <div ref={this.parent} className="indexHeader _SECTION">
                <video
                    className="indexHeader__back _FULL_ABS"
                    src={require('@/src/media/index/mage-back-glass-logo.mp4')}
                    loop
                    muted
                    autoPlay
                    playsInline
                />
                <div className="indexHeader__inner _INNER">
                    <AnimateText
                        className="indexHeader__title"
                        tag="h1"
                        delay={50}
                        disabled={!titleIsAnimated}
                    >
                        {content['sections.hero']?.title}
                    </AnimateText>

                    <AnimateText
                        className="indexHeader__text"
                        delay={30}
                        disabled={!textIsAnimated}
                    >
                        {content['sections.hero']?.subtitle}
                    </AnimateText>
                    <div
                        className={this.getClass(
                            'indexHeader__button',
                            buttonIsAnimated && '_animate',
                        )}
                    >
                        <Button
                            className="_white"
                            onClick={() => {
                                appStore.getState().setPopup({ name: 'contactsFormPopup' });
                            }}
                        >
                            {content['sections.hero']?.button?.label}
                        </Button>
                    </div>
                </div>
                <div
                    className={this.getClass('indexHeader__box', frameIsAnimated && '_animate')}
                    data-theme
                >
                    <div className="indexHeader__boxInner _FULL">
                        <div className="indexHeader__boxColor"></div>
                        <div className="indexHeader__boxFrame">
                            <div className="indexHeader__boxFrameInner _FULL">
                                <video
                                    src={require('@/src/media/index/main-reel.mp4')}
                                    className="_FULL"
                                    loop
                                    muted
                                    playsInline
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="indexHeader__about _COL _COL_CENTER">
                    <AnimateText className="indexHeader__aboutText" delay={50}>
                        {content['sections.hero']?.subtitle}
                    </AnimateText>
                    <div className="indexHeader__aboutButton">
                        <Button
                            className="_dark _minSize"
                            onClick={() => {
                                AppRouter.changePage({ pageName: 'about' });
                            }}
                        >
                            О нас
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
