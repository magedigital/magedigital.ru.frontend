import I from '../types';

const format: I['format'] = function (s) {
    let phone;

    if (typeof s === 'string') {
        phone = this.clear(s);
    }

    if (typeof s === 'number') {
        phone = this.clear(s);
    }

    if (!phone) {
        return undefined as any;
    }

    let result = '';

    result += '+7';
    result += ' (';
    result += phone.slice(0, 3);
    result += ') ';
    result += phone.slice(3, 6);
    result += '-';
    result += phone.slice(6, 8);
    result += '-';
    result += phone.slice(8, 10);

    return result;
};

export default format;
