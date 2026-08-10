import I from '../types.ts';

const throttleHandler: I['throttleHandler'] = async function (name, fn) {
    const data = Array.from(new Set([...(this.throttlesData[name] || [])]));
    delete this.throttlesData[name];

    try {
        await fn(data);
    } catch (e) {}
};

export default throttleHandler;
