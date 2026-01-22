import I from '../types.ts';

const regsDeleteHandler: I['regsDeleteHandler'] = function ({ value, diff }) {
    const reg = this.getReg();
    const { template, emptyChar } = reg;
    const endPos = this.endPos!;
    const startPos = endPos + diff;

    if (startPos >= endPos || diff >= 0) {
        return;
    }

    const resultValueArr = value.split('');
    let curPos = this.endPos! + diff;

    for (let i = startPos; i < endPos; i++) {
        resultValueArr[i] = template[i];
    }

    while (template[curPos - 1] && template[curPos - 1] !== emptyChar) {
        curPos -= 1;
    }

    return { value: resultValueArr.join(''), curPos };
};

export default regsDeleteHandler;
