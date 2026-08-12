import React from 'react';

import I from '../types.ts';

const renderField: I['renderField'] = function () {
    const { isShowPassword } = this.state;
    const { value, disabled, isPassword, area } = this.props;

    return (
        <>
            {area ? (
                <textarea
                    ref={this.input as React.RefObject<HTMLTextAreaElement>}
                    className="input__field input__value _NOSCROLL"
                    value={value}
                    onChange={this.changeHandler.bind(this)}
                    onSelect={this.saveCursorPositions.bind(this)}
                    onFocus={this.focusHandler.bind(this, true)}
                    onBlur={this.focusHandler.bind(this, false)}
                    id={this.id}
                    disabled={disabled}
                    rows={1}
                    onKeyDown={this.inputKeysHandler.bind(this)}
                    autoComplete="off"
                />
            ) : (
                <input
                    ref={this.input as React.RefObject<HTMLInputElement>}
                    type={isPassword && !isShowPassword ? 'password' : 'text'}
                    className="input__field input__value"
                    value={value}
                    onChange={this.changeHandler.bind(this)}
                    onSelect={this.saveCursorPositions.bind(this)}
                    onFocus={this.focusHandler.bind(this, true)}
                    onBlur={this.focusHandler.bind(this, false)}
                    id={this.id}
                    disabled={disabled}
                    onKeyDown={this.inputKeysHandler.bind(this)}
                    autoComplete="off"
                />
            )}
        </>
    );
};

export default renderField;
