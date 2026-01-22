import I from '../types.ts';

const regsDateAndTimeValidate: I['regsDateAndTimeValidate'] = function ({ value }) {
    const itemsArr = value.split(' в ');
    const [date, time] = itemsArr;

    if (date) {
        itemsArr[0] = this.regsDateValidate({ value: date }).value;
    }

    if (time) {
        itemsArr[1] = this.regsTimeValidate({ value: time }).value;
    }

    const resultValue = itemsArr.join(' в ');

    return { value: resultValue };
};

export default regsDateAndTimeValidate;
