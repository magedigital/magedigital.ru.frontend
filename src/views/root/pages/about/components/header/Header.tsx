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
        const { content } = this.props;

        return (
            <div ref={this.parent} className="aboutHeader _SECTION">
                <Media check={(d) => d === 'desktop'}>
                    <video
                        src={require('@/src/media/about/about-loop_1.mp4')}
                        className="aboutHeader__back _FULL_ABS"
                        muted
                        loop
                        autoPlay
                        playsInline
                    />
                </Media>
                <Media check={(d) => d === 'mobile'}>
                    <video
                        src={require('@/src/media/about/about-loop-mob.mp4')}
                        className="aboutHeader__back _FULL_ABS"
                        muted
                        loop
                        autoPlay
                        playsInline
                    />
                </Media>
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
                        {content['sections.hero']?.subtitle}
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
