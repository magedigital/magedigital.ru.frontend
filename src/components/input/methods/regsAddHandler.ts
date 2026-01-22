import I from '../types.ts';

const regsAddHandler: I['regsAddHandler'] = function ({ value, diff }) {
    const reg = this.getReg();
    const { template, emptyChar, regExp, notAddChars } = reg;
    const resultValueArr = this.savedValue!.split('');
    const startPos = this.startPos!;
    const endPos = this.endPos! + diff;
    let curPos = endPos;

    if (startPos >= endPos) {
        return;
    }

    let charDiff = 0;
    let isDeleteChar = false;

    for (let i = startPos; i < endPos; i++) {
        while (template[i + charDiff] && template[i + charDiff] !== emptyChar) {
            charDiff += 1;
        }

        if (
            !isDeleteChar &&
            notAddChars &&
            i >= notAddChars.start &&
            i < notAddChars.end &&
            notAddChars.chars.includes(value[i]) &&
            value.slice(startPos, endPos).replace(regExp, '').length === notAddChars.wasLen
        ) {
            charDiff -= 1;
            isDeleteChar = true;
        }

        if (!value[i].replace(regExp, '')) {
            charDiff -= 1;
        }

        if (template[i + charDiff] === emptyChar && value[i].replace(regExp, '').length) {
            resultValueArr[i + charDiff] = value[i];
        }
    }

    curPos += charDiff;

    while (template[curPos] && template[curPos] !== emptyChar) {
        curPos += 1;
    }

    return { value: resultValueArr.join(''), curPos };
};

export default regsAddHandler;
