import React from 'react';

import Fade from '@/src/components/fade/Fade.tsx';
import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const renderCookies: I['renderCookies'] = function () {
    const { isAcceptCookies } = this.props;

    return (
        <Fade className="body__cookies _ROW" isShow={!isAcceptCookies}>
            <p className="body__cookiesTitle">
                Используем{' '}
                <a href="#" target="_blank" className="_CLICK">
                    куки
                </a>
            </p>
            <div
                className="body__cookiesButton _CLICK"
                onClick={() => {
                    appStore.getState().acceptCookies();
                }}
            >
                Ок
            </div>
        </Fade>
    );
};

export default renderCookies;
