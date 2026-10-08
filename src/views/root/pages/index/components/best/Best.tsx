import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
import Lazy from '@/src/components/lazy/Lazy.tsx';
import Media from '@/src/components/media/Media.tsx';
import { appStore } from '@/src/store/store.tsx';

import BestI from './types.ts';

class Best extends Default<BestI['props'], BestI['state']> implements BestI {
    parent: BestI['parent'];

    constructor(props: BestI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { content } = this.props;

        return (
            <div ref={this.parent} className="indexBest _FULL_W">
                <div className="indexBest__inner _COL _COL_CENTER">
                    <div
                        className="indexBest__banner _COL _COL_CENTER"
                        data-theme
                        data-media="mobile"
                    >
                        <Lazy
                            getScrollNode={() =>
                                this.parent.current?.closest<HTMLElement>('.page__scroll')
                            }
                            className="indexBest__bannerBack _FULL_ABS"
                            render={() => (
                                <video
                                    className="_FULL"
                                    src={require('@/src/media/index/hidden-reel.mp4')}
                                    loop
                                    muted
                                    playsInline
                                    autoPlay
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        />
                        <AnimateText className="indexBest__bannerTitle" delay={50} tag="h3">
                            {content.ndaCases?.title}
                        </AnimateText>
                        <AnimateText className="indexBest__bannerText" delay={15}>
                            {content.ndaCases?.subtitle}
                        </AnimateText>
                    </div>
                    <div className="indexBest__button">
                        <Media check={(d) => d === 'desktop'}>
                            <Button
                                className="_purple"
                                onClick={() => {
                                    appStore.getState().setPopup({ name: 'contactsFormPopup' });
                                }}
                            >
                                {content.ndaCases?.button?.label}
                            </Button>
                        </Media>
                        <Media check={(d) => d === 'mobile'}>
                            <Button
                                className="_purple _minSize"
                                onClick={() => {
                                    appStore.getState().setPopup({ name: 'contactsFormPopup' });
                                }}
                            >
                                Увидеть всё на презентации
                            </Button>
                        </Media>
                    </div>
                </div>
            </div>
        );
    }
}

export default Best;
