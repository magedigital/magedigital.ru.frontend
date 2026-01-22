import I from '../types.ts';

const filterHandler: I['filterHandler'] = async function ({ detail: { name, query } }) {
    if (!this.listFilterName || this.listFilterName !== name) {
        return;
    }

    await this.asyncSetState({ filterQuery: query });
    await this.searchListItems({});
};

export default filterHandler;
