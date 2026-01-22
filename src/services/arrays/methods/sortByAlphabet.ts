import I from '../types';

const sortByAlphabet: I['sortByAlphabet'] = function (prop, a, b) {
    const textA =
        typeof a === 'object' && prop
            ? (a[prop] as string)?.toLowerCase()
            : (a as string)?.toLowerCase() || '';
    const textB =
        typeof b === 'object' && prop
            ? (b[prop] as string)?.toLowerCase()
            : (b as string)?.toLowerCase() || '';

    return textA < textB ? -1 : textA > textB ? 1 : 0;
};

export default sortByAlphabet;
