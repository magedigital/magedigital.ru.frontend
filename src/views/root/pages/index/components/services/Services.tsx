import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
import Lazy from '@/src/components/lazy/Lazy.tsx';

import init from './methods/init.ts';

import ServicesI from './types.ts';
import { getStrapiUrl } from '@/src/index.tsx';

class Services extends Default<ServicesI['props'], ServicesI['state']> implements ServicesI {
    parent: ServicesI['parent'];

    constructor(props: ServicesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { content } = this.props;

        return (
            <div ref={this.parent} className="indexServices" data-theme>
                <div className="indexServices__top _FULL_W">
                    <div className="indexServices__topBack _FULL_W _COL _COL_CENTER">
                        <AnimateText className="indexServices__topTitle" tag="h2" delay={50}>
                            {content['sections.solutions']?.subtitle}
                        </AnimateText>
                    </div>
                </div>
                <div className="indexServices__content _FULL_W">
                    {content['sections.solutions']?.solutions?.map((s, i) => (
                        <div
                            className="indexServices__contentService _FULL_W"
                            key={s.id}
                            style={{ zIndex: i + 1 }}
                        >
                            <div
                                className="indexServices__service _FULL_W"
                                style={{ background: s.color }}
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
                                        <Button className="_dark _whiteHover _minSize">
                                            {s.button?.label}
                                        </Button>
                                    </div>
                                </div>
                                <Lazy
                                    getScrollNode={() =>
                                        this.parent.current?.closest<HTMLElement>('.page__scroll')
                                    }
                                    className="indexServices__serviceThumb"
                                    render={() => (
                                        <video
                                            className="_FULL"
                                            src={getStrapiUrl(s.video?.url)}
                                            playsInline
                                            muted
                                            autoPlay
                                            loop
                                        />
                                    )}
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
