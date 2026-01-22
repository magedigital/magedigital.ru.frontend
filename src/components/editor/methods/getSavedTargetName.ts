import I from '../types.ts';

const getSavedTargetName: I['getSavedTargetName'] = function (name) {
    return `saved${name}`;
};

export default getSavedTargetName;
