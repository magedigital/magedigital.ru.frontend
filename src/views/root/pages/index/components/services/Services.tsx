import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import ServicesI from './types.ts';

import { services } from './static/services.ts';

class Services extends Default<ServicesI['props'], ServicesI['state']> implements ServicesI {
    parent: ServicesI['parent'];

    constructor(props: ServicesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        return (
            <div ref={this.parent} className="indexServices">
                <div className="indexServices__top _FULL_W">
                    <div className="indexServices__topBack _FULL_W _COL _COL_CENTER">
                        <AnimateText className="indexServices__topTitle" tag="h2" delay={50}>
                            {`Объединяем все слои промо<br/>в едином digital-решении`}
                        </AnimateText>
                    </div>
                </div>
                <div className="indexServices__content _FULL_W">
                    {services.map((s, i) => (
                        <div
                            className="indexServices__contentService _FULL_W"
                            key={s.key}
                            style={{ zIndex: i + 1 }}
                        >
                            <div
                                className="indexServices__service _FULL_W"
                                style={{ background: s.fill }}
                            >
                                <div className="indexServices__serviceContent _COL">
                                    <AnimateText
                                        className="indexServices__serviceTitle"
                                        delay={100}
                                        tag="h3"
                                    >
                                        {s.title}
                                    </AnimateText>
                                    <AnimateText className="indexServices__serviceText" delay={10}>
                                        {s.text}
                                    </AnimateText>
                                    <div className="indexServices__serviceButton">
                                        <Button className="_dark _minSize">Подробнее</Button>
                                    </div>
                                </div>
                                <img
                                    className="indexServices__serviceThumb"
                                    src={require(`@/src/media/index/services/${s.thumb}`)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Services;
