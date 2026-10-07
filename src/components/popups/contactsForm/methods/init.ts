import { appStore } from '@/src/store/store.tsx';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    await this.initTarget({ data: { types: [] }, targetName: 'form' });
    
    this.unmountHandlers.all = () => {
        appStore.getState().setNotification(undefined);
    };
};

export default init;
