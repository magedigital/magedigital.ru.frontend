import I from '../types.ts';

const getMode: I['getMode'] = function () {
    const { value } = this.props;

    if (value) {
        return 'uploaded';
    }

    return 'empty';
};

export default getMode;
