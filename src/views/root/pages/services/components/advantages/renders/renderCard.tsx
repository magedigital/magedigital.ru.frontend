import { v4 } from 'uuid';

import React from 'react';

import List from '@/src/components/list/List.tsx';
import { ListRenderPropsT } from '@/src/components/list/types.ts';
import { getStrapiUrl } from '@/src/index.tsx';
import Strings from '@/src/services/strings/Strings.service.ts';

import I from '../types.ts';

const renderCard: I['renderCard'] = function ({ index }) {
    const { hoverCard, currentType, updatedKey } = this.state;
    const { content } = this.props;
    const currentCard = {
        _id: currentType.toString(),
        ...content['sections.collab']?.collabs?.[currentType]?.cards?.[index],
    };
    const isCurrent = hoverCard === index;

    return (
        <div className={this.getClass('servicesAdvantages__cardInner')}>
            <List
                renderKey={currentType.toString()}
                updateKey={updatedKey}
                items={[currentCard]}
                parentClass="servicesAdvantages__cardBlocks _FULL_W"
                itemClass="servicesAdvantages__cardBlock _FULL_W"
                itemStyleProps={[]}
                parentStyleProps={['width']}
                parentRealStyleProps={['width']}
                resizeWidth={true}
                changeAnimate={true}
                duration={540}
                render={(
                    d: ListRenderPropsT<{ logo: StrapiSvgT; title: string; text: string }>,
                ) => ({
                    item: (
                        <div
                            className={this.getClass(
                                'servicesAdvantages__card _FULL_W',
                                this.setClass(currentType),
                                isCurrent && '_current',
                            )}
                            onMouseEnter={() =>
                                this.addStack(async () => {
                                    await this.asyncSetState({ hoverCard: index });
                                })
                            }
                            onMouseLeave={() =>
                                this.addStack(async () => {
                                    await this.asyncSetState({ hoverCard: undefined });
                                })
                            }
                            onClick={() =>
                                this.addStack(async () => {
                                    await this.asyncSetState({ hoverCard: index });
                                })
                            }
                        >
                            <div className="servicesAdvantages__cardInner _COL _FULL_W">
                                <img
                                    src={getStrapiUrl(d.item.logo?.svgFile?.url)}
                                    className="servicesAdvantages__cardIcon"
                                />
                                <p className="servicesAdvantages__cardTitle">{d.item.title}</p>
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
                                                    __html: new Strings().setSpaces(d.item.text),
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
                    ),
                    style: {
                        transitionDelay: `${index * 60 + (d.isHide ? 0 : 1) * 400}ms`,
                    },
                })}
            />
        </div>
    );
};

export default renderCard;
