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
            <a href={this.email} className="index__headLink" target="_blank" rel="noreferrer">
                {this.email}
            </a>
        </div>
    );
};

export default renderHead;
