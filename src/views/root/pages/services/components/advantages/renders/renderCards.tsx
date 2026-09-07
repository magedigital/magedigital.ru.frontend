import { v4 } from 'uuid';

import React from 'react';

import Icon from '@/src/components/icon/Icon.tsx';
import { IconT } from '@/src/components/icon/types.ts';
import List from '@/src/components/list/List.tsx';
import Strings from '@/src/services/strings/Strings.service.ts';

import { servicesAdvantagesTypes } from '../static/types.ts';
import I from '../types.ts';

const renderCards: I['renderCards'] = function ({ type }) {
    const { hoverCard } = this.state;
    const thisCards = servicesAdvantagesTypes[type].cards;

    return (
        <div className={this.getClass('servicesAdvantages__cardsInner', this.setClass(type))}>
            {thisCards.map((card, i) => {
                const isCurrent = +hoverCard! === i;

                return (
                    <div
                        className={this.getClass(
                            'servicesAdvantages__card _FULL_W _COL _CLICK',
                            isCurrent && '_current',
                        )}
                        key={i}
                        onMouseEnter={() =>
                            this.addStack(async () => await this.setType({ type, card: i }))
                        }
                        onMouseLeave={() =>
                            this.addStack(async () => await this.setType({ type, card: undefined }))
                        }
                        onClick={() =>
                            this.addStack(async () => await this.setType({ type, card: i }))
                        }
                    >
                        <div className="servicesAdvantages__cardInner _COL _FULL_W">
                            <Icon
                                name={card.icon as IconT}
                                className="servicesAdvantages__cardIcon"
                            />
                            <p className="servicesAdvantages__cardTitle">{card.title}</p>
                            <List
                                renderKey={isCurrent ? 'current' : undefined}
                                items={isCurrent ? [{ _id: 'current' }] : []}
                                parentClass="servicesAdvantages__cardTexts _FULL_W"
                                itemClass="servicesAdvantages__cardTextsItem _FULL_W"
                                itemStyleProps={[]}
                                parentStyleProps={['width']}
                                parentRealStyleProps={['width']}
                                resizeWidth={true}
                                render={() => ({
                                    item: (
                                        <div
                                            className="servicesAdvantages__cardText _FULL_W"
                                            dangerouslySetInnerHTML={{
                                                __html: new Strings().setSpaces(card.text),
                                            }}
                                        ></div>
                                    ),
                                })}
                                callback={async () => {
                                    await this.asyncSetState({ updatedKey: v4() });
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default renderCards;
