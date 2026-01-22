import I from '../types.ts';

const regsValidate: I['regsValidate'] = function ({ value }) {
    const { regName } = this.props;

    if (regName === 'date') {
        return this.regsDateValidate({ value });
    }

    if (regName === 'time') {
        return this.regsTimeValidate({ value });
    }

    if (regName === 'dateAndTime') {
        return this.regsDateAndTimeValidate({ value });
    }

    return { value };
};

export default regsValidate;
