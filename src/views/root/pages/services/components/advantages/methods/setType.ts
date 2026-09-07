import I from '../types.ts';

const setType: I['setType'] = async function ({ type, card }) {
    await this.asyncSetState({ currentType: type, hoverCard: card });
};

export default setType;
