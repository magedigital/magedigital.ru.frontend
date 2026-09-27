import I from '../types.ts';

const setMenuState: I['setMenuState'] = async function (isMenuShow) {
    await this.asyncSetState({ isMenuShow });
};

export default setMenuState;
