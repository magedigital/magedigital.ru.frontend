import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Default from '@/src/components/default/Default.tsx';
import Icon from '@/src/components/icon/Icon.tsx';
import Lazy from '@/src/components/lazy/Lazy.tsx';
import Media from '@/src/components/media/Media.tsx';
import { getStrapiUrl } from '@/src/index.tsx';

import init from './methods/init.ts';

import LayersI from './types.ts';

class Layers extends Default<LayersI['props'], LayersI['state']> implements LayersI {
    parent: LayersI['parent'];

    constructor(props: LayersI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    init = init;

    render() {
        const { isAnimate } = this.state;
        const { content } = this.props;

        return (
            <div
                ref={this.parent}
                className={this.getClass('servicesLayers', isAnimate && '_animate')}
                data-theme
            >
                <div className="servicesLayers__top _FULL_W">
                    <div className="servicesLayers__topBack _FULL_W _COL _COL_CENTER">
                        <AnimateText className="servicesLayers__topTitle" delay={50}>
                            {content['sections.services']?.subtitle}
                        </AnimateText>
                        <Icon className="servicesLayers__topButton" name="next-arrow" />
                    </div>
                </div>
                <div className="servicesLayers__content _FULL_W">
                    {content['sections.services']?.services?.map((s, i) => (
                        <div
                            className="servicesLayers__contentCard _FULL_W"
                            key={i}
                            style={{ zIndex: i + 1 }}
                        >
                            <div className="servicesLayers__card _FULL_W">
                                <div className="servicesLayers__cardPreview">
                                    <Lazy
                                        getScrollNode={() =>
                                            this.parent.current?.closest<HTMLElement>(
                                                '.page__scroll',
                                            )
                                        }
                                        className="servicesLayers__cardPreviewThumb _FULL"
                                        render={() => (
                                            <video
                                                className="_FULL"
                                                src={getStrapiUrl(s.video?.url)}
                                                playsInline
                                                muted
                                                autoPlay
                                                loop
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="servicesLayers__cardContent _COL">
                                    <div className="servicesLayers__cardCount">0{i + 1}</div>
                                    <h3 className="servicesLayers__cardTitle">{s.title}</h3>
                                    <AnimateText className="servicesLayers__cardOffer" delay={15}>
                                        {s.subtitle}
                                    </AnimateText>
                                    <AnimateText className="servicesLayers__cardText" delay={15}>
                                        {s.text}
                                    </AnimateText>
                                    <div className="servicesLayers__cardServices _COL">
                                        <div className="servicesLayers__cardServicesArrow">
                                            <Icon name="next-arrow" />
                                        </div>

                                        {s.items?.map((ss, si) => (
                                            <div
                                                className="servicesLayers__cardService _CLICK"
                                                key={si}
                                            >
                                                <Media check={(d) => d === 'mobile'}>
                                                    <div className="servicesLayers__cardServiceArrow">
                                                        <Icon name="next-arrow" />
                                                    </div>
                                                </Media>
                                                {ss.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Layers;
