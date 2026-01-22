import I from '../types.ts';

const getChangedTarget: I['getChangedTarget'] = function ({ targetName }) {
    const target = this.state[targetName] as any;

    if (!target || typeof target !== 'object' || Array.isArray(target)) {
        return;
    }

    const changedTarget: any = {};

    Object.keys(this.changes).forEach((key) => {
        const changedValue = this.changes[key];
        const keyItems = key.split('.');
        let thisChangedTarget = changedTarget;
        let thisTarget = JSON.parse(JSON.stringify(target));

        keyItems.forEach((keyItem) => {
            const itemTarget = Array.isArray(thisTarget as any[])
                ? (thisTarget as any[]).find((item) => item._id === keyItem)
                : thisTarget[keyItem];

            if (
                itemTarget &&
                typeof itemTarget === 'object' &&
                !Array.isArray(itemTarget) &&
                !Array.isArray(thisTarget)
            ) {
                if (!thisChangedTarget[keyItem]) {
                    thisChangedTarget[keyItem] = {
                        _id: itemTarget._id,
                    };
                }

                thisChangedTarget = thisChangedTarget[keyItem] as ObjT;
                thisTarget = thisTarget[keyItem] as ObjT;
            }

            if (itemTarget && typeof itemTarget === 'object' && Array.isArray(itemTarget)) {
                if (!thisChangedTarget[keyItem]) {
                    thisChangedTarget[keyItem] = [];
                }

                thisChangedTarget = thisChangedTarget[keyItem] as ObjT;
                thisTarget = thisTarget[keyItem] as ObjT;
            }

            if (
                itemTarget &&
                typeof itemTarget === 'object' &&
                !Array.isArray(itemTarget) &&
                Array.isArray(thisTarget)
            ) {
                const thisTargetArr = thisTarget as any[];
                const thisChangedTargetArr = thisChangedTarget as any[];
                const thisTargetIndex = thisTargetArr.findIndex((item) => item._id === keyItem);
                let thisChangedTargetIndex = thisChangedTargetArr.findIndex(
                    (item) => item._id === keyItem,
                );

                if (thisChangedTargetIndex === -1) {
                    thisChangedTargetArr.push({ _id: keyItem });

                    thisChangedTargetIndex = thisChangedTargetArr.length - 1;
                }

                thisChangedTarget = thisChangedTarget[thisChangedTargetIndex] as ObjT;
                thisTarget = thisTarget[thisTargetIndex] as ObjT;
            }
        });

        const { target: resultTarget, key: resultKey } = this.getValue({
            key,
            targetName,
            target: changedTarget,
            arrById: true,
        });

        if (resultTarget && resultKey) {
            if (resultKey === 'isNew' && resultTarget && typeof resultTarget === 'object') {
                const d = this.getValue({
                    key,
                    targetName,
                    target,
                    arrById: true,
                });

                if (d.target) {
                    Object.keys(d.target).forEach((k) => {
                        resultTarget[k] = d.target![k];
                    });
                }
            }

            resultTarget[resultKey] = changedValue;
        }
    });

    return changedTarget as ObjT;
};

export default getChangedTarget;
