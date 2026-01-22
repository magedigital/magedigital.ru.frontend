import { v4 } from 'uuid';

import I from '../types.ts';

const setRenderKey: I['setRenderKey'] = async function () {
    await this.asyncSetState({ renderKey: v4() });
};

export default setRenderKey;
