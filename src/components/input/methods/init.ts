import removeTransition from '@/src/utils/removeTransition.ts';

import I from '../types.ts';

const init: I['init'] = async function (this: I) {
    this.savedValue = this.props.value;

    removeTransition({ item: `#input${this.id}` });

    this.setAreaSize();
};

export default init;
