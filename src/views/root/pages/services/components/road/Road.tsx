import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import List from '@/src/components/list/List.tsx';
import Strings from '@/src/services/strings/Strings.service.ts';

import init from './methods/init.ts';

import RoadI from './types.ts';

import { roadCards } from './static/cards.ts';

class Road extends Default<RoadI['props'], RoadI['state']> implements RoadI {
    parent: RoadI['parent'];

    constructor(props: RoadI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { hoverCard } = this.state;

        return (
            <div ref={this.parent} className="servicesRoad _SECTION" data-theme>
                <div className="servicesRoad__inner _INNER">
                    <div className="servicesRoad__head _COL _COL_CENTER">
                        <img
                            className="servicesRoad__headLayer"
                            src={require('@/src/media/services/layer-1.png')}
                            style={{ zIndex: 3 }}
                        />
                        <img
                            className="servicesRoad__headLayer"
                            src={require('@/src/media/services/layer-2.png')}
                            style={{ zIndex: 2 }}
                        />
                        <img
                            className="servicesRoad__headLayer"
                            src={require('@/src/media/services/layer-3.png')}
                            style={{ zIndex: 1 }}
                        />
                    </div>
                    <div className="servicesRoad__content">
                        <div className="servicesRoad__contentBlock _text">
                            <AnimateText className="servicesRoad__contentTitle" delay={50}>
                                {'Один поток:<br/>от идеи до отчёта'}
                            </AnimateText>
                            <AnimateText className="servicesRoad__contentText" delay={20}>
                                Прозрачный процесс в одних руках, один ответственный, без сборки из
                                пяти подрядчиков.
                            </AnimateText>
                        </div>
                        <div className="servicesRoad__contentBlock _cards">
                            {roadCards.map((card, i) => (
                                <div
                                    className={this.getClass(
                                        'servicesRoad__contentCard _CLICK',
                                        hoverCard === i && '_current',
                                    )}
                                    key={i}
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    <div
                                        className="servicesRoad__contentCardInner _FULL"
                                        onMouseEnter={() =>
                                            this.addStack(
                                                async () =>
                                                    await this.asyncSetState({ hoverCard: i }),
                                            )
                                        }
                                        onMouseLeave={() =>
                                            this.addStack(
                                                async () =>
                                                    await this.asyncSetState({
                                                        hoverCard: undefined,
                                                    }),
                                            )
                                        }
                                        onClick={() =>
                                            this.addStack(
                                                async () =>
                                                    await this.asyncSetState({ hoverCard: i }),
                                            )
                                        }
                                    >
                                        <p className="servicesRoad__contentCardCount">0{i + 1}</p>
                                        <p className="servicesRoad__contentCardTitle">
                                            {card.title}
                                        </p>
                                        <List
                                            renderKey={hoverCard === i ? 'current' : undefined}
                                            items={hoverCard === i ? [{ _id: 'current' }] : []}
                                            parentClass="servicesRoad__contentCardTexts _FULL_W"
                                            itemClass="servicesRoad__contentCardTextsItem _FULL_W"
                                            itemStyleProps={[]}
                                            parentStyleProps={['width']}
                                            parentRealStyleProps={['width']}
                                            resizeWidth={true}
                                            render={() => ({
                                                item: (
                                                    <div
                                                        className="servicesRoad__contentCardText _FULL_W"
                                                        dangerouslySetInnerHTML={{
                                                            __html: new Strings().setSpaces(
                                                                card.text,
                                                            ),
                                                        }}
                                                    ></div>
                                                ),
                                            })}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Road;
