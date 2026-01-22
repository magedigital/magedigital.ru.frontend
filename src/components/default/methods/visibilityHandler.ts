import I from '../types.ts';

const visibilityHandler: I['visibilityHandler'] = function () {
    if (this.visibilityCb) {
        this.visibilityCb(document.visibilityState === 'visible');
    }
};

export default visibilityHandler;
