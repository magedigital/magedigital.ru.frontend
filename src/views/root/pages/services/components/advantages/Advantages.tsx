import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import List from '@/src/components/list/List.tsx';

import init from './methods/init.ts';
import setType from './methods/setType.ts';

import { servicesAdvantagesTypes } from './static/types.ts';
import AdvantagesI from './types.ts';

import renderCards from './renders/renderCards.tsx';

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

    renderCards = renderCards;

    render() {
        const { currentType, hoverCard, updatedKey } = this.state;

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
                    <List
                        renderKey={[currentType, hoverCard, updatedKey].join('')}
                        updateKey={hoverCard?.toString()}
                        items={[{ _id: currentType }]}
                        parentClass="servicesAdvantages__cards"
                        itemClass="servicesAdvantages__cardsBlock _FULL_W"
                        itemStyleProps={[]}
                        parentStyleProps={['width']}
                        parentRealStyleProps={['width']}
                        resizeWidth={true}
                        render={({ item }) => ({
                            item: this.renderCards({ type: item._id }),
                        })}
                    />
                </div>
            </div>
        );
    }
}

export default Advantages;
