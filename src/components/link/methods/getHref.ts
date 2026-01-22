import LinkI from '../types.ts';

const getHref: LinkI['getHref'] = function (href) {
    if (!href) {
        return '';
    }

    return href === '' || href[href.length - 1] === '/' ? href : `${href}/`;
};

export default getHref;
