import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
import Media from '@/src/components/media/Media.tsx';
import { AppRouter } from '@/src/index.tsx';

import ServicesInfoI from './types.ts';

class ServicesInfo
    extends Default<ServicesInfoI['props'], ServicesInfoI['state']>
    implements ServicesInfoI
{
    parent: ServicesInfoI['parent'];

    constructor(props: ServicesInfoI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        return (
            <div ref={this.parent} className="indexServicesInfo _SECTION">
                <div className="indexServicesInfo__inner _COL _COL_CENTER">
                    <Media check={(d) => d === 'desktop'}>
                        <AnimateText className="indexServicesInfo__text" delay={50}>
                            {`От отдельного digital-слоя<br/>до комплексного партнёрства —<br/>гибкие формы сотрудничества`}
                        </AnimateText>
                    </Media>
                    <Media check={(d) => d === 'mobile'}>
                        <AnimateText className="indexServicesInfo__text" delay={50}>
                            {`От отдельного digital-слоя до комплексного партнёрства —гибкие формы сотрудничества`}
                        </AnimateText>
                    </Media>
                    <div className="indexServicesInfo__button">
                        <Button
                            className="_dark _minSize"
                            onClick={() => {
                                AppRouter.changePage({ pageName: 'services' });
                            }}
                        >
                            Услуги
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServicesInfo;
