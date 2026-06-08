import React from 'react';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    return (
        <div className="index__head _FULL_W _ROW _ROW_V_CENTER">
            <img
                src={require('@media/index/logo.svg').default}
                alt=""
                className="index__headLogo"
            />
            <div className="index__headNav _ROW">
                <div
                    className="index__headNavButton _ROW _ROW_CENTER _CLICK"
                    onClick={() => {
                        this.setPopupState({ name: 'services', isShow: true });
                    }}
                >
                    Услуги
                </div>
                <div
                    className="index__headNavButton _ROW _ROW_CENTER _CLICK"
                    onClick={() => {
                        this.setPopupState({ name: 'contacts', isShow: true });
                    }}
                >
                    Контакты
                </div>
            </div>
            <a href={this.email} className="index__headLink" target="_blank" rel="noreferrer">
                {this.email}
            </a>
        </div>
    );
};

export default renderHead;
