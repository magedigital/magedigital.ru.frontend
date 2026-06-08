import I from '../types.ts';

const setPopupState: I['setPopupState'] = async function ({ name, isShow }) {
    await this.asyncSetState({ popup: isShow === true ? name : undefined });
};

export default setPopupState;
