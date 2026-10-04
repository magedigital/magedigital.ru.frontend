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
            <div ref={this.parent} className="servicesHeader _SECTION">
                <Media check={(d) => d === 'desktop'}>
                    <img
                        src={require('@/src/media/services/header.jpg')}
                        className="servicesHeader__back _FULL_ABS"
                    />
                </Media>
                <Media check={(d) => d === 'mobile'}>
                    <img
                        src={require('@/src/media/services/img-services-mob.jpg')}
                        className="servicesHeader__back _FULL_ABS"
                    />
                </Media>
                <div
                    className={this.getClass(
                        'servicesHeader__decor',
                        decorIsAnimated && '_animate',
                    )}
                    data-theme
                />
                <div className="servicesHeader__inner _INNER">
                    <AnimateText
                        className="servicesHeader__text"
                        delay={30}
                        disabled={!titleIsAnimated}
                    >
                        {content['sections.hero']?.subtitle}
                    </AnimateText>

                    <AnimateText
                        className="servicesHeader__title"
                        delay={100}
                        disabled={!textIsAnimated}
                    >
                        Услуги
                    </AnimateText>
                </div>
            </div>
        );
    }
}

export default Header;
