import I from '../types.ts';

const getCurrentPage: I['getCurrentPage'] = function ({ storePages, filter }) {
    return (Object.keys(this.pages) as (keyof typeof this.pages)[])
        .filter((name) => filter(this.pages[name]))
        .find((name) => storePages[name].isShow);
};

export default getCurrentPage;
