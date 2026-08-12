import React from 'react';

import changeHandler from './methods/changeHandler.ts';
import changePropsCb from './methods/changePropsCb.ts';
import focusHandler from './methods/focusHandler.ts';
import getReg from './methods/getReg.ts';
import init from './methods/init.ts';
import inputKeysHandler from './methods/inputKeysHandler.ts';
import regsAddHandler from './methods/regsAddHandler.ts';
import regsDateAndTimeValidate from './methods/regsDateAndTimeValidate.ts';
import regsDateValidate from './methods/regsDateValidate.ts';
import regsDeleteHandler from './methods/regsDeleteHandler.ts';
import regsHandler from './methods/regsHandler.ts';
import regsMonthDateValidate from './methods/regsMonthDateValidate.ts';
import regsTimeValidate from './methods/regsTimeValidate.ts';
import regsValidate from './methods/regsValidate.ts';
import saveCursorPositions from './methods/saveCursorPositions.ts';
import setAreaSize from './methods/setAreaSize.ts';
import setCursorPositions from './methods/setCursorPositions.ts';

import InputI from './types.ts';

import Default from '../default/Default.tsx';
import renderField from './renders/renderField.tsx';
import renderSupport from './renders/renderSupport.tsx';
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
    changingProps = ['regKey' as const, 'updatedKey' as const, 'value'];

    init = init;

    changePropsCb = changePropsCb;

    changeHandler = changeHandler;
    inputKeysHandler = inputKeysHandler;

    getReg = getReg;
    regsHandler = regsHandler;
    regsDeleteHandler = regsDeleteHandler;
    regsAddHandler = regsAddHandler;
    regsValidate = regsValidate;
    regsDateValidate = regsDateValidate;
    regsTimeValidate = regsTimeValidate;
    regsDateAndTimeValidate = regsDateAndTimeValidate;
    regsMonthDateValidate = regsMonthDateValidate;

    focusHandler = focusHandler;
    saveCursorPositions = saveCursorPositions;
    setCursorPositions = setCursorPositions;

    setAreaSize = setAreaSize;

    renderSupport = renderSupport;
    renderField = renderField;

    render() {
        const { isFocus } = this.state;
        const { value, className, disabled, isSupportWithFocusShow, error, area } = this.props;

        return (
            <div
                ref={this.parent}
                className={this.getClass(
                    'input',
                    '_FULL',
                    className,
                    (isFocus && !isSupportWithFocusShow) || value ? '_fill' : '',
                    error && '_error',
                    disabled && '_disabled',
                    area && '_area',
                    isFocus && '_focus',
                )}
                id={`input${this.id}`}
            >
                {this.renderSupport()}
                {this.renderField()}
            </div>
        );
    }
}

export default Input;
