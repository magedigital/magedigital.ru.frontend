import getQueryString from './getQueryString';

type ReturnT = Partial<Record<string, string | string[]>>;

export default function setObjFromString(s: string | FilterQueryT[]): ReturnT {
    if (Array.isArray(s)) {
        s = getQueryString(s);
    }

    const items = s.split('&');

    const result: ReturnT = {};

    items.forEach((item) => {
        if (item) {
            const [n, v] = item.split('=');

            if (!result[n]) {
                result[n] = v;
            } else {
                if (typeof result[n] === 'string') {
                    result[n] = [result[n]];
                }

                result[n].push(v);
            }
        }
    });

    Object.keys(result).forEach((k) => {
        if (Array.isArray(result[k])) {
            result[k].sort();
        }
    });

    return result;
}
