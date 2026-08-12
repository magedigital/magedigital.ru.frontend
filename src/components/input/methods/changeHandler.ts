import I from '../types.ts';

const changeHandler: I['changeHandler'] = async function (e) {
    const { onChange, regName, regExp } = this.props;
    let resultValue = e.target.value;
    let curPos;

    if (regName) {
        const regsData = this.regsHandler({ value: resultValue });

        resultValue = regsData.value;
        curPos = regsData.curPos;
    } else if (regExp) {
        resultValue = resultValue.replace(regExp, '');
    }

    const diff = resultValue.length - (this.props.value ?? '').length;

    const promises = new Promise<void>((r) => {
        if (this.props.value === resultValue) {
            r();
        } else {
            this.changeValueResolve = r;
        }
    });

    await onChange({ value: resultValue });

    await promises;

    this.setAreaSize();

    if (regName && typeof curPos === 'number') {
        this.setCursorPositions(curPos, curPos);
    } else if (!regName && typeof this.startPos === 'number') {
        this.setCursorPositions(this.startPos + diff, this.startPos + diff);
    }

    this.savedValue = resultValue;
};

export default changeHandler;
