import React from 'react';

import Default from '@/src/components/default/Default.tsx';
import Fade from '@/src/components/fade/Fade.tsx';
import LoaderBlock from '@/src/components/loaderBlock/LoaderBlock.tsx';

import loadPopup from './methods/loadPopup.ts';

import PopupWrapperI from './types.ts';

class PopupWrapper
    extends Default<PopupWrapperI['props'], PopupWrapperI['state']>
    implements PopupWrapperI
{
    parent: PopupWrapperI['parent'];

    constructor(props: PopupWrapperI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    loadPopup = loadPopup;

    render() {
        const { PopupComponent } = this.state;
        const { className = '', isShow, props = {}, duration } = this.props;

        return (
            <Fade
                className={this.getClass('body__popup', className)}
                isShow={isShow}
                initCb={this.loadPopup.bind(this)}
                duration={duration}
            >
                <LoaderBlock className="body__popupLoader" isShow={!PopupComponent} />
                <div className={this.getClass('body__popupInner', PopupComponent ? '_show' : '')}>
                    <>{PopupComponent ? <PopupComponent {...props} /> : null}</>
                </div>
            </Fade>
        );
    }
}

export default PopupWrapper;
