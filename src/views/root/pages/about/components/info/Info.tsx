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
        return (
            <div ref={this.parent} className="aboutInfo _SECTION">
                <div className="aboutInfo__inner _INNER">
                    <div className="aboutInfo__content _COL _COL_CENTER">
                        <img
                            className="aboutInfo__thumb"
                            src={require(`@/src/media/about/hands-connected.png`)}
                        />
                        <AnimateText className="aboutInfo__title" tag="h1" delay={70}>
                            Стратегический диджитал партнер на проект и на годы
                        </AnimateText>
                        <AnimateText className="aboutInfo__text" tag="p" delay={30}>
                            Мы редко делаем один проект и расходимся. Чаще остаёмся с клиентом на
                            годы — ведём кампанию за кампанией и со временем становимся его
                            digital-отделом: знаем продукт, аудиторию и механики, которые уже
                            сработали.
                        </AnimateText>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;
