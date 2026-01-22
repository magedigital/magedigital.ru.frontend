import I from '../types.ts';

const getEndText: I['getEndText'] = function (n, items) {
    if (typeof n !== 'number') {
        return undefined as any;
    }

    const num = Math.abs(n) % 100;
    const n1 = num % 10;

    if (num > 10 && num < 20) {
        return items[2];
    }

    if (n1 > 1 && n1 < 5) {
        return items[1];
    }

    if (n1 === 1) {
        return items[0];
    }

    return items[2];
};

export default getEndText;
