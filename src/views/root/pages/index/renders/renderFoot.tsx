import React from 'react';

import Icon from '@components/icon/Icon.tsx';

import I from '../types.ts';

const renderFoot: I['renderFoot'] = function () {
    return (
        <div className="index__foot _FULL_W _COL _COL_H_CENTER">
            <div className="index__footInner _INNER">
                <div className="index__footProjects">{this.renderProjects()}</div>
                <h3 className="index__footTitle">Скоро. Новый сайт</h3>
                <a
                    href="https://old.magedigital.ru"
                    target="_blank"
                    rel="noreferrer"
                    className="index__footLink"
                >
                    <Icon name="next-arrow" />
                    архивная версия
                </a>
            </div>
        </div>
    );
};

export default renderFoot;
