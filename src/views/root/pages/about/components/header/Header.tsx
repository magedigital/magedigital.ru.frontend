import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Media from '@/src/components/media/Media.tsx';

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
        const { titleIsAnimated, textIsAnimated, decorIsAnimated } = this.state;

        return (
            <div ref={this.parent} className="aboutHeader _SECTION">
                <Media media="desktop">
                    <img
                        src={require('@/src/media/about/header.jpg')}
                        className="aboutHeader__back _FULL_ABS"
                    />
                </Media>
                <Media media="mobile">
                    <img
                        src={require('@/src/media/about/img-about-mob.jpg')}
                        className="aboutHeader__back _FULL_ABS"
                    />
                </Media>
                <div
                    className={this.getClass('aboutHeader__decor', decorIsAnimated && '_animate')}
                    data-theme
                />
                <div className="aboutHeader__inner _INNER">
                    <Media media="desktop">
                        <AnimateText
                            className="aboutHeader__text"
                            delay={30}
                            disabled={!titleIsAnimated}
                        >
                            {
                                'Разрабатываем всю digital-часть активаций: <br/>от механики и визуала до платформы, интерактива, <br/>интеграций и поддержки.'
                            }
                        </AnimateText>
                    </Media>
                    <Media media="mobile">
                        <AnimateText
                            className="aboutHeader__text"
                            delay={30}
                            disabled={!titleIsAnimated}
                        >
                            {
                                'Разрабатываем всю digital-часть активаций: от механики и визуала до платформы, интерактива, интеграций и поддержки.'
                            }
                        </AnimateText>
                    </Media>
                    <AnimateText
                        className="aboutHeader__title"
                        delay={100}
                        disabled={!textIsAnimated}
                    >
                        О нас
                    </AnimateText>
                </div>
            </div>
        );
    }
}

export default Header;
