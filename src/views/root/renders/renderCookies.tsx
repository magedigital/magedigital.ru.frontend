import React from 'react';

import Fade from '@/src/components/fade/Fade.tsx';
import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const renderCookies: I['renderCookies'] = function () {
    const { isAcceptCookies, contents } = this.props;
    const cookiesContent = contents.global?.cookies;

    return (
        <Fade className="body__cookies _ROW" isShow={!isAcceptCookies && !!cookiesContent}>
            <p className="body__cookiesTitle">{cookiesContent?.text}</p>
            <div
                className="body__cookiesButton _CLICK"
                onClick={() => {
                    appStore.getState().acceptCookies();
                }}
            >
                {cookiesContent?.buttonLabel}
            </div>
        </Fade>
    );
};

export default renderCookies;
