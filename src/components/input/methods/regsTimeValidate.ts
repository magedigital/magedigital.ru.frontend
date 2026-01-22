import I from '../types.ts';

const regsTimeValidate: I['regsTimeValidate'] = function ({ value }) {
    const timeArr = value.split(':');
    const [hours, minutes] = timeArr;

    if (hours && !Number.isNaN(+hours)) {
        if (+hours > 23) {
            timeArr[0] = '23';
        }
    }

    if (minutes && !Number.isNaN(+minutes)) {
        if (+minutes > 59) {
            timeArr[1] = '59';
        }
    }

    const resultValue = timeArr.join(':');

    return { value: resultValue };
};

export default regsTimeValidate;
