import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Lazy from '@/src/components/lazy/Lazy.tsx';
import { getStrapiUrl } from '@/src/index.tsx';

import init from './methods/init.ts';

import HistoryI from './types.ts';

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
        const { content } = this.props;

        return (
            <div ref={this.parent} className="aboutHistory _SECTION">
                <div className="aboutHistory__inner _INNER">
                    <div className="aboutHistory__galery _COL _COL_CENTER">
                        <div className="aboutHistory__galeryCards _top">
                            {content['sections.history']?.thenPhotos?.map((c, i) => (
                                <div className="aboutHistory__galeryCard" key={i}>
                                    <Lazy
                                        getScrollNode={() =>
                                            this.parent.current?.closest<HTMLElement>(
                                                '.page__scroll',
                                            )
                                        }
                                        className="aboutHistory__galeryCardThumb _FULL"
                                        render={() => (
                                            <img
                                                className="_FULL"
                                                src={getStrapiUrl(c.image?.url)}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="aboutHistory__galerySupport">Тогда</p>
                    </div>
                    <div className="aboutHistory__content _COL _COL_CENTER">
                        <AnimateText className="aboutHistory__title" tag="h3" delay={100}>
                            {content['sections.history']?.title}
                        </AnimateText>
                        <AnimateText className="aboutHistory__text" tag="p" delay={20}>
                            {content['sections.history']?.subtitle}
                        </AnimateText>
                    </div>
                    <div className="aboutHistory__galery _COL _COL_CENTER">
                        <p className="aboutHistory__galerySupport">Сейчас</p>
                        <div className="aboutHistory__galeryCards _bottom">
                            {content['sections.history']?.nowPhotos?.map((c, i) => (
                                <div className="aboutHistory__galeryCard" key={i}>
                                    <Lazy
                                        getScrollNode={() =>
                                            this.parent.current?.closest<HTMLElement>(
                                                '.page__scroll',
                                            )
                                        }
                                        className="aboutHistory__galeryCardThumb _FULL"
                                        render={() => (
                                            <img
                                                className="_FULL"
                                                src={getStrapiUrl(c.image?.url)}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
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
