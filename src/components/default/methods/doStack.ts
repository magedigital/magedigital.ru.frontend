import I from '../types.ts';

const doStack: I['doStack'] = async function () {
    if (this.isStackProcess) {
        return;
    }

    const task = this.stack.shift();

    if (!task) {
        return;
    }

    this.isStackProcess = true;

    try {
        await task();
    } catch (e) {}

    delete this.isStackProcess;
    this.doStack();
};

export default doStack;
