import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import ButtonI from './types.ts';

import Icon from '../icon/Icon.tsx';

class Button extends Default<ButtonI['props'], ButtonI['state']> implements ButtonI {
    parent: ButtonI['parent'];

    constructor(props: ButtonI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { className, children } = this.props;

        return (
            <div
                ref={this.parent}
                className={this.getClass('button _CLICK _ROW _ROW_CENTER', className)}
            >
                <div className="button__inner _ROW _ROW_CENTER">{children}</div>
                <div className="button__arrow _COL">
                    <Icon name="next-arrow" />
                </div>
            </div>
        );
    }
}

export default Button;
