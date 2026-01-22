import I from '../types.ts';

const checkEdited: I['checkEdited'] = function (targetName) {
    const target = this.state[targetName] as ObjT;

    return (
        Object.keys(this.changes).length > 0 ||
        Object.keys(this.deletes).length > 0 ||
        !!target?.isNew
    );
};

export default checkEdited;
