import I from '../types.ts';

const setClass: I['setClass'] = function (...classes) {
    return this.getClass(...classes)
        .split(' ')
        .map((c) => (c[0] === '_' ? c : '_' + c))
        .join(' ');
};

export default setClass;
