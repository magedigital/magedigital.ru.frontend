import I, { ddChar } from '../types';

const format: I['format'] = function (s, { type }) {
    if (!s) {
        return undefined as any;
    }

    let DateInst: Date | undefined;

    if (typeof s === 'string' || typeof s === 'number') {
        DateInst = new Date(s);

        if (Number.isNaN(DateInst.getTime())) {
            DateInst = undefined;
        }
    }

    if (s instanceof Date) {
        DateInst = s;
    }

    if (!DateInst) {
        return undefined as any;
    }

    let result = '';

    if (type === 'full') {
        result += this.numFormat(DateInst.getDate());
        result += ddChar;
        result += this.numFormat(DateInst.getMonth() + 1);
        result += ddChar;
        result += this.numFormat(DateInst.getFullYear());
        result += ' в ';
        result += this.numFormat(DateInst.getHours());
        result += ':';
        result += this.numFormat(DateInst.getMinutes());
    } else if (type === 'fullText') {
        result += DateInst.getDate();
        result += ' ';
        result += this.months[DateInst.getMonth()][1];
        result += ' ';
        result += DateInst.getFullYear();
        result += ' в ';
        result += this.numFormat(DateInst.getHours());
        result += ':';
        result += this.numFormat(DateInst.getMinutes());
    } else if (type === 'time') {
        result += this.numFormat(DateInst.getHours());
        result += ':';
        result += this.numFormat(DateInst.getMinutes());
    } else if (type === 'nowText') {
        const notTime = new Date().getTime();
        const dateTime = DateInst.getTime();
        const dateDiff = notTime - dateTime;

        if (dateDiff < 60_000) {
            result = 'Сейчас';
        } else if (dateDiff < 60_000 * 60) {
            result = `${Math.floor(dateDiff / 60_000)} мин. назад`;
        } else if (dateDiff < 60_000 * 60 * 24) {
            result = `${Math.floor(dateDiff / (60_000 * 60))} ч. назад`;
        } else if (dateDiff < 60_000 * 60 * 24 * 30) {
            result = `${Math.floor(dateDiff / (60_000 * 60 * 24))} д. назад`;
        } else {
            result = this.format(DateInst, { type: 'full' }) as any;
        }
    } else {
        result += this.numFormat(DateInst.getDate());
        result += ddChar;
        result += this.numFormat(DateInst.getMonth() + 1);
        result += ddChar;
        result += this.numFormat(DateInst.getFullYear());
    }

    return result;
};

export default format;
