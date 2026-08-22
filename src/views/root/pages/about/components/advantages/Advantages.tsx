import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Media from '@/src/components/media/Media.tsx';
import Strings from '@/src/services/strings/Strings.service.ts';

import init from './methods/init.ts';

import AdvantagesI from './types.ts';

import { advantagesCards } from './static/cards.ts';

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
        return (
            <div ref={this.parent} className="aboutAdvantages _SECTION" data-theme>
                <div className="aboutAdvantages__inner _INNER">
                    <div className="aboutAdvantages__content _COL">
                        <AnimateText className="aboutAdvantages__title" delay={100}>
                            Наши принципы
                        </AnimateText>
                        <Media media="desktop">
                            <AnimateText className="aboutAdvantages__text" delay={30}>
                                {
                                    'Мы не стремимся быть фабрикой production-<br/>задач. Нам важно включаться в проекты: понимать механику, видеть слабые места, держать визуальный уровень и не терять детали на стыке дизайна, разработки и поддержки.'
                                }
                            </AnimateText>
                        </Media>
                        <Media media="mobile">
                            <AnimateText className="aboutAdvantages__text" delay={30}>
                                {
                                    'Мы не стремимся быть фабрикой production-задач. Нам важно включаться в проекты: понимать механику, видеть слабые места, держать визуальный уровень и не терять детали на стыке дизайна, разработки и поддержки.'
                                }
                            </AnimateText>
                        </Media>
                    </div>
                    <div className="aboutAdvantages__cards">
                        {advantagesCards.map((c, i) => (
                            <div
                                className="aboutAdvantages__card _COL"
                                key={i}
                                data-key={i}
                                style={{ background: c.fill }}
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
