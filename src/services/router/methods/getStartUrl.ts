import I from '../types.ts';

const getStartUrl: I['getStartUrl'] = function (path) {
    if (!['auth'].includes(path.split('/')[0])) {
        path = `/${path}`;
    }

    return path;
};

export default getStartUrl;
