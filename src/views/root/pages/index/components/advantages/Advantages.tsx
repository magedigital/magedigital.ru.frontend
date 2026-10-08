import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
import { AppRouter } from '@/src/index.tsx';

import init from './methods/init.ts';

import AdvantagesI from './types.ts';

class Advantages
    extends Default<AdvantagesI['props'], AdvantagesI['state']>
    implements AdvantagesI
{
    parent: AdvantagesI['parent'];

    constructor(props: AdvantagesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { content } = this.props;

        return (
            <div ref={this.parent} className="indexAdvantages">
                <div className="indexAdvantages__top _FULL_W" data-theme>
                    <div className="indexAdvantages__topBack _FULL_W _COL _COL_CENTER">
                        <AnimateText className="indexAdvantages__topTitle" delay={50}>
                            {content['sections.advantages']?.title}
                        </AnimateText>
                        <div className="indexAdvantages__topButton">
                            <Button
                                className="_white _whiteDark _minSize"
                                onClick={() => {
                                    AppRouter.changePage({ pageName: 'about' });
                                }}
                            >
                                {content['sections.advantages']?.button?.label}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="indexAdvantages__content _FULL_W">
                    {content['sections.advantages']?.advantages?.map((s, i) => (
                        <div
                            className="indexAdvantages__contentCard _FULL_W"
                            key={i}
                            style={{ zIndex: i + 1 }}
                            data-theme
                        >
                            <div
                                className="indexAdvantages__card _FULL_W"
                                style={{ background: s.color }}
                            >
                                <div className="indexAdvantages__cardContent _FULL_W _COL">
                                    <div className="indexAdvantages__cardCount">{i + 1}</div>
                                    <h3 className="indexAdvantages__cardTitle">{s.title}</h3>
                                    <AnimateText className="indexAdvantages__cardText" delay={15}>
                                        {s.text}
                                    </AnimateText>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Advantages;
