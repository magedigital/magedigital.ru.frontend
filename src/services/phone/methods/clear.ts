import I from '../types';

const clear: I['clear'] = function (s) {
    if (typeof s !== 'string' && typeof s !== 'number') {
        return undefined as any;
    }

    const phone = s.toString().replace(/\D/g, '').slice(0, 10);

    return phone;
};

export default clear;
