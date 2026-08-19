import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import HistoryI from './types.ts';

import { historyBottomCards, historyTopCards } from './static/cards.ts';

class History extends Default<HistoryI['props'], HistoryI['state']> implements HistoryI {
    parent: HistoryI['parent'];

    constructor(props: HistoryI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    animates = {};

    init = init;

    render() {
        return (
            <div ref={this.parent} className="aboutHistory _SECTION">
                <div className="aboutHistory__inner _INNER">
                    <div className="aboutHistory__galery _COL _COL_CENTER">
                        <div className="aboutHistory__galeryCards _top">
                            {historyTopCards.map((c, i) => (
                                <div className="aboutHistory__galeryCard" key={i}>
                                    <img
                                        className="aboutHistory__galeryCardThumb _FULL"
                                        src={require(`@/src/media/about/${c}`)}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="aboutHistory__galerySupport">Тогда</p>
                    </div>
                    <div className="aboutHistory__content _COL _COL_CENTER">
                        <AnimateText className="aboutHistory__title" tag="h3" delay={100}>
                            «Это всего лишь промо»
                        </AnimateText>
                        <AnimateText className="aboutHistory__text" tag="p" delay={20}>
                            Так думали клиенты, когда мы начинали в 2010-м... тогда промо значило
                            собрать лендинг на коленке. Сегодня промо-кампании - это сложные
                            интеграции, миллионы чеков и механики, которые должны выдержать наплыв
                            всей страны в первые секунды. Мы выросли вместе с рынком, чтобы забрать
                            на себя всю боль production-части.
                        </AnimateText>
                    </div>
                    <div className="aboutHistory__galery _COL _COL_CENTER">
                        <p className="aboutHistory__galerySupport">Сейчас</p>
                        <div className="aboutHistory__galeryCards _bottom">
                            {historyBottomCards.map((c, i) => (
                                <div className="aboutHistory__galeryCard" key={i}>
                                    <img
                                        className="aboutHistory__galeryCardThumb _FULL"
                                        src={require(`@/src/media/about/${c}`)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default History;
