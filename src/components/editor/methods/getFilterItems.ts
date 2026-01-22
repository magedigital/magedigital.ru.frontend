import setObjFromString from '../functions/setObjFromString.ts';

import I from '../types.ts';

const getFilterItems: I['getFilterItems'] = function (this: I, { items, filter }) {
    const query = this.getListQuery();
    const queryData = setObjFromString(query);
    const resultData: Partial<Record<string, string[]>> = {};

    Object.keys(queryData).forEach((key) => {
        resultData[key] = typeof queryData[key] === 'string' ? [queryData[key]] : queryData[key];
    });

    return items.filter((i) => {
        if (!query.length) {
            return true;
        }

        return filter(i, resultData);
    });
};

export default getFilterItems;
