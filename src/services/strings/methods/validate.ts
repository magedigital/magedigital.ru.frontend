import I from '../types';

const validate: I['validate'] = function (s, type) {
    if (typeof s !== 'string') {
        return false;
    }

    if (type === 'domen') {
        return this.validateDomen(s);
    }

    return false;
};

export default validate;
