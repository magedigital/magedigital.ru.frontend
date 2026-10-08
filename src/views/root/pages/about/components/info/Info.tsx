import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';

import InfoI from './types.ts';

class Info extends Default<InfoI['props'], InfoI['state']> implements InfoI {
    parent: InfoI['parent'];

    constructor(props: InfoI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { content } = this.props;

        return (
            <div ref={this.parent} className="aboutInfo _SECTION">
                <div className="aboutInfo__inner _INNER">
                    <div className="aboutInfo__content _COL _COL_CENTER">
                        <img
                            className="aboutInfo__thumb"
                            src={require(`@/src/media/about/hands-connected.png`)}
                        />
                        <AnimateText className="aboutInfo__title" tag="h1" delay={70}>
                            {content.partner?.title}
                        </AnimateText>
                        <AnimateText className="aboutInfo__text" tag="p" delay={30}>
                            {content.partner?.subtitle}
                        </AnimateText>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;
