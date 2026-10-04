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
                            Наши лучшие кейсы скрыты NDA
                        </AnimateText>
                        <AnimateText className="indexBest__bannerText" delay={15}>
                            {
                                'Мы не можем показать здесь наши\xa0самые масштабные высоконагруженные платформы для\xa0FMCG-гигантов. Но мы можем показать их на закрытой презентации и разобрать механику под ваши задачи'
                            }
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
                                Увидеть всё на закрытой презентации
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
