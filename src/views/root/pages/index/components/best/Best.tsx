import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
import Media from '@/src/components/media/Media.tsx';

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
                    <div className="indexBest__banner _COL _COL_CENTER">
                        <img
                            className="indexBest__bannerBack _FULL_ABS"
                            src={require('@/src/media/index/best.jpg')}
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
                        <Media media="desktop">
                            <Button className="_purple">Увидеть всё на закрытой презентации</Button>
                        </Media>
                        <Media media="mobile">
                            <Button className="_purple _minSize">Увидеть всё на презентации</Button>
                        </Media>
                    </div>
                </div>
            </div>
        );
    }
}

export default Best;
