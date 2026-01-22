import I from '../types.ts';

const getListQuery: I['getListQuery'] = function () {
    const { filterQuery = [] } = this.state;
    const query: FilterQueryT[] = [
        { name: 'skip', value: this.listCurrentStep.toString() },
        { name: 'limit', value: this.listStep.toString() },
        ...filterQuery,
    ];

    return query;
};

export default getListQuery;
