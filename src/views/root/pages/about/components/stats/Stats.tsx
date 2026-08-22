import React from 'react';

import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import Strings from '@/src/services/strings/Strings.service.ts';

import init from './methods/init.ts';

import StatsI from './types.ts';

import { aboutStats } from './static/stats.ts';

class Stats extends Default<StatsI['props'], StatsI['state']> implements StatsI {
    parent: StatsI['parent'];

    constructor(props: StatsI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { isAnimate } = this.state;

        return (
            <div
                ref={this.parent}
                className={this.getClass('aboutStats', isAnimate && '_animate')}
                data-theme
            >
                <div className="aboutStats__cards">
                    {[...aboutStats, ...aboutStats, ...aboutStats, ...aboutStats].map(
                        (s, i, ar) => (
                            <div
                                className="aboutStats__card"
                                key={i}
                                style={{ zIndex: ar.length - i }}
                            >
                                <div
                                    className={this.getClass('aboutStats__stat _COL _FULL')}
                                    style={{ background: s.fill }}
                                >
                                    <Icon className="aboutStats__statIcon" name={s.icon} />
                                    {i % 5 === 4 ? (
                                        <Icon name="about-infinity" className="_infinity" />
                                    ) : (
                                        <p className="aboutStats__statTitle">{s.title}</p>
                                    )}

                                    <p
                                        className="aboutStats__statText"
                                        dangerouslySetInnerHTML={{
                                            __html: new Strings().setSpaces(s.text),
                                        }}
                                    ></p>
                                </div>
                            </div>
                        ),
                    )}
                </div>
                <div className="aboutStats__logo">Mage</div>
                <img src={require('@/src/media/about/arm.png')} className="aboutStats__arm" />
            </div>
        );
    }
}

export default Stats;
