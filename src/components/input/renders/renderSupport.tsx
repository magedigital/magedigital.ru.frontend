import React from 'react';

import I from '../types.ts';

const renderSupport: I['renderSupport'] = function () {
    const { support } = this.props;

    if (!support) {
        return;
    }

    return (
        <label htmlFor={this.id} className="input__support input__value">
            {support}
        </label>
    );
};

export default renderSupport;
