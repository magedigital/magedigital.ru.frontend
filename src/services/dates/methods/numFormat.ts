import I from '../types';

const numFormat: I['numFormat'] = function (n) {
    let result;

    if (typeof n === 'string') {
        result = n;
    }

    if (typeof n === 'number') {
        result = n.toString();
    }

    if (!result) {
        return undefined as any;
    }

    return +parseInt(n, 10) < 10 ? `0${parseInt(n, 10)}` : parseInt(n, 10).toString();
};

export default numFormat;
