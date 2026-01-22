import React from 'react';

import I from '../types.ts';

const renderContent: I['renderContent'] = function () {
    return (
        <div className="index__content _COL">
            <h1 className="index__contentTitle">Mage Digital</h1>
            <p className="index__contentDescription">
                ИТ-решения для маркетинга, промо&nbsp;и&nbsp;коммуникаций
            </p>
            <p className="index__contentSupport">C 2010 года</p>
        </div>
    );
};

export default renderContent;
