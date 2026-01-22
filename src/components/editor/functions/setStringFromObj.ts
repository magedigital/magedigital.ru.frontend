import getQueryString from './getQueryString';

type DataT = Partial<Record<string, string | string[]>>;

export default function setStringFromObj(d: DataT): string {
    const items: FilterQueryT[] = [];

    Object.keys(d).forEach((k) => {
        if (Array.isArray(d[k])) {
            items.push(...d[k].map((p) => ({ name: k, value: p })));
        } else {
            items.push({ name: k, value: d[k]! });
        }
    });

    return getQueryString(items);
}
