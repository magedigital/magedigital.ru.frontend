import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
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
        const { titleIsAnimated, textIsAnimated, decorIsAnimated } = this.state;

        return (
            <div ref={this.parent} className="aboutHeader _SECTION">
                <img
                    src={require('@/src/media/about/header.jpg')}
                    className="aboutHeader__back _FULL_ABS"
                />
                <div
                    className={this.getClass('aboutHeader__decor', decorIsAnimated && '_animate')}
                    data-theme
                />
                <div className="aboutHeader__inner _INNER">
                    <AnimateText
                        className="aboutHeader__text"
                        delay={30}
                        disabled={!titleIsAnimated}
                    >
                        {
                            'Разрабатываем всю digital-часть активаций: <br/>от механики и визуала до платформы, интерактива, <br/>интеграций и поддержки.'
                        }
                    </AnimateText>
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
