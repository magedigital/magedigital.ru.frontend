import I from '../types.ts';

const addStack: I['addStack'] = function (fn) {
    this.stack.push(fn);
    this.doStack();
};

export default addStack;
