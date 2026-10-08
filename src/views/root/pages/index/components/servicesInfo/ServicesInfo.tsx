import React from 'react';

import AnimateText from '@/src/components/animateText/AnimateText.tsx';
import Button from '@/src/components/button/Button.tsx';
import Default from '@/src/components/default/Default.tsx';
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
        const { content } = this.props;

        return (
            <div ref={this.parent} className="indexServicesInfo _SECTION">
                <div className="indexServicesInfo__inner _INNER">
                    <AnimateText className="indexServicesInfo__text" delay={50}>
                        {content.layers?.subtitle}
                    </AnimateText>

                    <div className="indexServicesInfo__button">
                        <Button
                            className="_dark _minSize"
                            onClick={() => {
                                AppRouter.changePage({ pageName: 'services' });
                            }}
                        >
                            {content.layers?.button?.label}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServicesInfo;
