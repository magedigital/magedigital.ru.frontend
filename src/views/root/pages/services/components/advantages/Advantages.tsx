import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';

import init from './methods/init.ts';
import setType from './methods/setType.ts';

import { servicesAdvantagesTypes } from './static/types.ts';
import AdvantagesI from './types.ts';

import renderCard from './renders/renderCard.tsx';

class Advantages
    extends Default<AdvantagesI['props'], AdvantagesI['state']>
    implements AdvantagesI
{
    parent: AdvantagesI['parent'];

    constructor(props: AdvantagesI['props']) {
        super(props);
        this.state = {
            currentType: 'agency',
        };

        this.parent = React.createRef();
    }

    init = init;

    setType = setType;

    renderCard = renderCard;

    render() {
        const { currentType } = this.state;

        return (
            <div ref={this.parent} className="servicesAdvantages _SECTION">
                <div className="servicesAdvantages__inner _INNER">
                    <div className="servicesAdvantages__content">
                        <div className="servicesAdvantages__buttons _FULL_W _NOSCROLL">
                            <div
                                className={this.getClass(
                                    'servicesAdvantages__buttonsArrow _COL _COL_CENTER',
                                    currentType === 'brands' && '_bottom',
                                )}
                            >
                                <Icon
                                    name="next-arrow"
                                    className="servicesAdvantages__buttonsArrowIcon"
                                />
                            </div>

                            <div className="servicesAdvantages__buttonsInner _COL">
                                {(
                                    Object.keys(
                                        servicesAdvantagesTypes,
                                    ) as (keyof typeof servicesAdvantagesTypes)[]
                                ).map((t) => (
                                    <div
                                        className={this.getClass(
                                            'servicesAdvantages__button _CLICK',
                                            currentType === t && '_current',
                                        )}
                                        key={t}
                                        onClick={() => {
                                            this.setType({ type: t });
                                        }}
                                    >
                                        <AnimateText
                                            className="servicesAdvantages__buttonText"
                                            delay={20}
                                        >
                                            {servicesAdvantagesTypes[t].title}
                                        </AnimateText>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <AnimateText className="servicesAdvantages__text" delay={20}>
                            Мы стремимся предложить лучший сервис и удобные формы сотрудничества
                            агентствам и брендам.
                        </AnimateText>
                    </div>
                    <div className="servicesAdvantages__cards">
                        {[0, 1, 2, 3].map((k) => (
                            <div className="servicesAdvantages__cardsItem" key={k}>
                                {this.renderCard({ index: k })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Advantages;
