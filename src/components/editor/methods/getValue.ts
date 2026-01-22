import I from '../types.ts';

const getValue: I['getValue'] = function (
    this: I,
    { key, targetName, target: propsTarget, arrById },
) {
    const target = (propsTarget || this.state[targetName]) as ObjT;

    if (!target || typeof target !== 'object' || Array.isArray(target)) {
        return {};
    }

    if (!key) {
        return {};
    }

    let resultTarget: ObjT | undefined;

    const keyItems = key.split('.');

    const lastKey = keyItems.pop()!;
    const firstKey = keyItems.shift()!;

    try {
        resultTarget = (firstKey ? target[firstKey] : target) as ObjT;

        keyItems.forEach((keyItem) => {
            const resultTargetArr = resultTarget as unknown as ObjT[];

            if (Array.isArray(resultTargetArr) && arrById) {
                resultTarget = resultTargetArr!.find((item) => item._id === keyItem) as ObjT;
            } else {
                resultTarget = resultTarget![keyItem] as ObjT;
            }
        });

        return {
            target: resultTarget,
            key: lastKey,
            value: resultTarget[lastKey] as never,
        };
    } catch (error) {
        return {};
    }
};

export default getValue;
