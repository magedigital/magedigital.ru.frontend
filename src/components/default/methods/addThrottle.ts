import { throttle } from '@/src/utils/throttle.ts';

import I from '../types.ts';

const addThrottle: I['addThrottle'] = function (n, dur, d, fn, s) {
    if (!d.length) {
        return;
    }

    if (!this.throttles[n]) {
        this.throttles[n] = throttle(dur, this.throttleHandler.bind(this), s);
    }

    if (!this.throttlesData[n]) {
        this.throttlesData[n] = [];
    }

    this.throttlesData[n].push(...d);
    this.throttles[n].fn(n, fn);
};

export default addThrottle;
