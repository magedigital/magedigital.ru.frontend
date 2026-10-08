import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';

import init from './methods/init.ts';
import setType from './methods/setType.ts';

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
            currentType: 0,
        };

        this.parent = React.createRef();
    }

    init = init;

    setType = setType;

    renderCard = renderCard;

    render() {
        const { currentType } = this.state;
        const { content } = this.props;

        return (
            <div ref={this.parent} className="servicesAdvantages _SECTION">
                <div className="servicesAdvantages__inner _INNER">
                    <div className="servicesAdvantages__content">
                        <div className="servicesAdvantages__buttons _FULL_W _NOSCROLL">
                            <div
                                className={this.getClass(
                                    'servicesAdvantages__buttonsArrow _COL _COL_CENTER',
                                    currentType > 0 && '_bottom',
                                )}
                            >
                                <Icon
                                    name="next-arrow"
                                    className="servicesAdvantages__buttonsArrowIcon"
                                />
                            </div>

                            <div className="servicesAdvantages__buttonsInner _COL">
                                {content['sections.collab']?.collabs?.map((t, i) => (
                                    <div
                                        className={this.getClass(
                                            'servicesAdvantages__button _CLICK',
                                            currentType === i && '_current',
                                        )}
                                        key={i}
                                        onClick={() => {
                                            this.setType({ type: i });
                                        }}
                                    >
                                        <AnimateText
                                            className="servicesAdvantages__buttonText"
                                            delay={20}
                                        >
                                            {t.title}
                                        </AnimateText>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <AnimateText className="servicesAdvantages__text" delay={20}>
                            {content['sections.collab']?.text}
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
