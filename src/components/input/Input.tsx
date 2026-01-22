import React from 'react';

import Default from '@components/default/Default.tsx';

import changeHandler from './methods/changeHandler.ts';
import changePropsCb from './methods/changePropsCb.ts';
import focusHandler from './methods/focusHandler.ts';
import getReg from './methods/getReg.ts';
import regsAddHandler from './methods/regsAddHandler.ts';
import regsDateAndTimeValidate from './methods/regsDateAndTimeValidate.ts';
import regsDateValidate from './methods/regsDateValidate.ts';
import regsDeleteHandler from './methods/regsDeleteHandler.ts';
import regsHandler from './methods/regsHandler.ts';
import regsTimeValidate from './methods/regsTimeValidate.ts';
import regsValidate from './methods/regsValidate.ts';
import saveCursorPositions from './methods/saveCursorPositions.ts';
import setCursorPositions from './methods/setCursorPositions.ts';

import InputI from './types.ts';

import regs from './static/regs.ts';

class Input extends Default<InputI['props'], InputI['state']> implements InputI {
    parent: InputI['parent'];
    input: InputI['input'];
    savedValue: InputI['savedValue'];

    constructor(props: InputI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
        this.input = React.createRef();
    }

    regs = regs;
    changingProps = ['reg' as const];

    changeHandler = changeHandler;

    getReg = getReg;
    regsHandler = regsHandler;
    regsDeleteHandler = regsDeleteHandler;
    regsAddHandler = regsAddHandler;
    regsValidate = regsValidate;
    regsDateValidate = regsDateValidate;
    regsTimeValidate = regsTimeValidate;
    regsDateAndTimeValidate = regsDateAndTimeValidate;

    focusHandler = focusHandler;
    saveCursorPositions = saveCursorPositions;
    setCursorPositions = setCursorPositions;

    changePropsCb = changePropsCb;

    componentDidMount(): void {
        this.savedValue = this.props.value;

        super.componentDidMount();
    }

    render() {
        const { isFocus } = this.state;
        const { value, className, support, disabled } = this.props;

        return (
            <div
                ref={this.parent}
                className={this.getClass(
                    'input',
                    '_FULL',
                    className,
                    isFocus || value ? '_fill' : '',
                )}
            >
                {support && (
                    <label htmlFor={this.id} className="input__support">
                        {support}
                    </label>
                )}

                <input
                    ref={this.input}
                    type="text"
                    className="input__field"
                    value={value}
                    onChange={this.changeHandler.bind(this)}
                    onSelect={this.saveCursorPositions.bind(this)}
                    onFocus={this.focusHandler.bind(this, true)}
                    onBlur={this.focusHandler.bind(this, false)}
                    id={this.id}
                    disabled={disabled}
                />
            </div>
        );
    }
}

export default Input;
