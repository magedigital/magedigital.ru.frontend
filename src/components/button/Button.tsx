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
        const { className, children, icon, onClick } = this.props;

        return (
            <div
                ref={this.parent}
                className={this.getClass('button _CLICK _ROW _ROW_CENTER', className)}
                onClick={onClick}
            >
                <div className="button__inner _ROW _ROW_CENTER">{children}</div>
                <div className={this.getClass('button__icon _COL', this.setClass(icon))}>
                    <Icon name={icon ?? 'next-arrow'} />
                </div>
            </div>
        );
    }
}

export default Button;
