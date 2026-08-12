import React from 'react';

import Default from '@/src/components/default/Default.tsx';

import CheckboxI from './types.ts';

class Checkbox extends Default<CheckboxI['props'], CheckboxI['state']> implements CheckboxI {
    parent: CheckboxI['parent'];

    constructor(props: CheckboxI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { value, onChange, children } = this.props;

        return (
            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={value}
                    onChange={() => onChange({ value: !value })}
                />
                <div className="checkbox__view">
                    <div className="checkbox__point" />
                    {children}
                </div>
            </label>
        );
    }
}

export default Checkbox;
