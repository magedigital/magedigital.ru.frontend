import I from '../types.ts';

const getDeepValue: I['getDeepValue'] = function (o, p) {
    const props = p.split('.');

    while (props.length) {
        const prop = props.shift()!;

        o = o?.[prop];
    }

    return o;
};

export default getDeepValue;
