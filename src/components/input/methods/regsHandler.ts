import I from '../types.ts';

const regsHandler: I['regsHandler'] = function ({ value }) {
    const savedValue = this.savedValue!;
    let resultValue = value;
    const diff = resultValue.length - savedValue.length;
    let curPos = this.startPos || 0;

    const regsDeleteData = this.regsDeleteHandler({ value: savedValue, diff });

    if (regsDeleteData) {
        resultValue = regsDeleteData.value;
        this.savedValue = resultValue;
        curPos = regsDeleteData.curPos;
    }

    const regsAddData = this.regsAddHandler({ value, diff });

    if (regsAddData) {
        resultValue = regsAddData.value;
        curPos = regsAddData.curPos;
    }

    resultValue = this.regsValidate({ value: resultValue }).value;

    return { value: resultValue, curPos };
};

export default regsHandler;
