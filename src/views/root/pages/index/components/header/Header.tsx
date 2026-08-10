import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';

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
        const { titleIsAnimated, textIsAnimated } = this.state;

        return (
            <div ref={this.parent} className="indexHeader _SECTION">
                <video
                    className="indexHeader__back _FULL_ABS"
                    src={require('@/src/media/index/mage-back-glass-logo.mp4')}
                    loop
                    muted
                    autoPlay
                />
                <div className="indexHeader__inner _INNER">
                    <AnimateText
                        className="indexHeader__title"
                        tag="h1"
                        delay={50}
                        disabled={!titleIsAnimated}
                    >
                        Mage Digital
                    </AnimateText>

                    <AnimateText
                        className="indexHeader__text"
                        delay={30}
                        disabled={!textIsAnimated}
                    >
                        Превращаем идеи в масштабные диджитал-активации
                    </AnimateText>
                    <div className="indexHeader__button">
                        <Button className="_white">Обсудить проект</Button>
                    </div>
                </div>
                <div className="indexHeader__box">
                    <div className="indexHeader__boxColor"></div>
                    <div className="indexHeader__boxFrame">
                        <img
                            src={require('@/src/media/index/header.jpg')}
                            className="_FULL"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
                <div className="indexHeader__about _COL _COL_CENTER">
                    <AnimateText className="indexHeader__aboutText" delay={50}>
                        {`Помогаем агентствам и брендам<br/>запускать digital-промо<br/>федерального масштаба с 2010`}
                    </AnimateText>
                    <div className="indexHeader__aboutButton">
                        <Button className="_dark _minSize">О нас</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
