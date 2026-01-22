import I from '../types.ts';

const initTarget: I['initTarget'] = async function ({ data, targetName, otherState }) {
    const savedTargetName = this.getSavedTargetName(targetName);

    await this.asyncSetState({
        [targetName]: JSON.parse(JSON.stringify(data)),
        [savedTargetName]: JSON.parse(JSON.stringify(data)),
        isEdited: !!data.isNew,
        ...otherState,
    });
};

export default initTarget;
