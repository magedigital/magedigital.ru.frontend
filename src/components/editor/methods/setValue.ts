import I from '../types.ts';

const setValue: I['setValue'] = async function (this: I, { data, targetName, arrById, setData }) {
    const target = this.state[targetName] as ObjT;

    if (!target || typeof target !== 'object' || Array.isArray(target)) {
        return;
    }

    if (setData) {
        setData(target);
    }

    const savedTargetName = this.getSavedTargetName(targetName);
    const resultTarget = JSON.parse(JSON.stringify(target)) as ObjT;

    Object.keys(data).forEach((key) => {
        const value = data[key];
        const { target: thisTarget, key: thisKey } = this.getValue({
            key,
            targetName,
            target: resultTarget,
            arrById,
        });

        if (
            thisTarget &&
            thisKey &&
            (!this.notChangesProps || !this.notChangesProps.includes(key))
        ) {
            if (Array.isArray(thisTarget[thisKey]) && typeof value === 'string') {
                const index = thisTarget[thisKey].indexOf(value);

                if (index !== -1) {
                    thisTarget[thisKey].splice(index, 1);
                } else {
                    thisTarget[thisKey].push(value);
                }
            } else {
                thisTarget[thisKey] = value;

                const { value: savedValue } = this.getValue({
                    key,
                    targetName: savedTargetName,
                    arrById,
                });

                if (savedValue !== value) {
                    this.changes[key] = value;
                } else {
                    delete this.changes[key];
                }
            }
        }
    });

    await this.asyncSetState({
        [targetName]: resultTarget,
        isEdited: this.checkEdited(targetName),
        error: undefined,
    });
};

export default setValue;
