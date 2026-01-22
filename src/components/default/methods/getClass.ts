import I from '../types.ts';

const getClass: I['getClass'] = function (...classes) {
    return Array.from(new Set(classes.filter((c) => c))).join(' ');
};

export default getClass;
