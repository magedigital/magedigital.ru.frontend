import I from '../types';

const clearSpaces: I['clearSpaces'] = function (s) {
    if (typeof s !== 'string') {
        return undefined as any;
    }

    return s.replace(/ㅤ/gi, '').replace(/ +/g, ' ').trim();
};

export default clearSpaces;
