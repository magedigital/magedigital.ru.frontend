import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Strings from '@/src/services/strings/Strings.service.ts';

import init from './methods/init.ts';

import AdvantagesI from './types.ts';

class Advantages
    extends Default<AdvantagesI['props'], AdvantagesI['state']>
    implements AdvantagesI
{
    parent: AdvantagesI['parent'];

    constructor(props: AdvantagesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { content } = this.props;

        return (
            <div ref={this.parent} className="aboutAdvantages _SECTION" data-theme>
                <div className="aboutAdvantages__inner _INNER">
                    <div className="aboutAdvantages__content _COL">
                        <AnimateText className="aboutAdvantages__title" delay={100}>
                            {content['sections.principles']?.title}
                        </AnimateText>
                        <AnimateText className="aboutAdvantages__text" delay={30}>
                            {content['sections.principles']?.subtitle}
                        </AnimateText>
                    </div>
                    <div className="aboutAdvantages__cards">
                        {content['sections.principles']?.principles?.map((c, i) => (
                            <div
                                className="aboutAdvantages__card _COL"
                                key={i}
                                data-key={i}
                                style={{ background: c.color }}
                            >
                                <p className="aboutAdvantages__cardNumber">{i + 1}</p>
                                <h4
                                    className="aboutAdvantages__cardTitle"
                                    dangerouslySetInnerHTML={{
                                        __html: new Strings().setSpaces(c.title),
                                    }}
                                ></h4>
                                <p className="aboutAdvantages__cardText">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Advantages;
