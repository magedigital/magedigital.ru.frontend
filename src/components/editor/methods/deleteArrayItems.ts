import I from '../types.ts';

const deleteArrayItems: I['deleteArrayItems'] = async function (
    this: I,
    { key, targetName, target: propsTarget, items },
) {
    const target = (propsTarget || this.state[targetName]) as ObjT;

    if (!target || typeof target !== 'object' || Array.isArray(target)) {
        return;
    }

    const savedTargetName = this.getSavedTargetName(targetName);
    const resultTarget = JSON.parse(JSON.stringify(target)) as ObjT;

    const { target: arrTarget, key: arrKey } = this.getValue({
        key,
        targetName,
        target: resultTarget,
        arrById: true,
    });

    if (!arrTarget || !arrKey || !Array.isArray(arrTarget[arrKey])) {
        return;
    }

    const { target: savedArrTarget, key: savedArrKey } = this.getValue({
        key,
        targetName: savedTargetName,
        arrById: true,
    });

    items.forEach((id) => {
        const thisArr = arrTarget[arrKey] as any[];
        const index = thisArr.findIndex((item) => item._id === id);

        if (index !== -1) {
            thisArr.splice(index, 1);
        }
    });

    if (savedArrTarget && savedArrKey && Array.isArray(savedArrTarget[savedArrKey])) {
        items.forEach((id) => {
            const thisArr = savedArrTarget[arrKey] as any[];
            const index = thisArr.findIndex((item) => item._id === id);

            if (index !== -1) {
                if (thisArr[index].isNew) {
                    delete this.changes[`${key}.${id}.isNew`];
                } else {
                    if (!this.deletes[key]) {
                        this.deletes[key] = new Set();
                    }

                    this.deletes[key].add(id);
                }

                Object.keys(this.changes).forEach((changeKey) => {
                    if (changeKey.includes(`${key}.${id}`)) {
                        delete this.changes[changeKey];
                    }
                });

                thisArr.splice(index, 1);
            }
        });
    }

    await this.asyncSetState({
        [targetName]: resultTarget,
        isEdited: this.checkEdited(targetName),
        error: undefined,
    });
};

export default deleteArrayItems;
