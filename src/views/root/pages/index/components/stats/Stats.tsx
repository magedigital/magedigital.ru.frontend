import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import init from './methods/init.ts';

import StatsI from './types.ts';

import { stats } from './static/stats.ts';

class Stats extends Default<StatsI['props'], StatsI['state']> implements StatsI {
    parent: StatsI['parent'];

    constructor(props: StatsI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    currentStat = 0;

    init = init;

    render() {
        const { isInit } = this.state;

        return (
            <div ref={this.parent} className={this.getClass('indexStats', isInit && '_init')}>
                <div className="indexStats__content">
                    {stats.map((s, i) => (
                        <div className="indexStats__stat _COL _COL_CENTER" key={i} data-key={i}>
                            <div className="indexStats__statTitle">
                                {s.title.split('').map((c, ii) => (
                                    <div
                                        className="indexStats__statTitleChar _prev"
                                        key={ii}
                                        data-key={ii}
                                    >
                                        {c}
                                    </div>
                                ))}
                            </div>
                            <p className="indexStats__statText _prev">{s.text}</p>
                        </div>
                    ))}

                    <div className="indexStats__progress">
                        <svg>
                            <circle />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stats;
