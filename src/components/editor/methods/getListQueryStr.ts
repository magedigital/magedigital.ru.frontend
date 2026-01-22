import I from '../types.ts';

const getListQueryStr: I['getListQueryStr'] = function (query) {
    return query.map((item) => item.name + '=' + item.value).join('&');
};

export default getListQueryStr;
