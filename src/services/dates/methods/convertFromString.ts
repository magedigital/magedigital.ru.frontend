import I, { ddChar } from '../types';

const convertFromString: I['convertFromString'] = function (s) {
    if (typeof s !== 'string') {
        return undefined as any;
    }

    const resultDate = new Date();
    const [day, month, year] = s.split(ddChar);

    resultDate.setFullYear(+year);
    resultDate.setMonth(+month - 1);
    resultDate.setDate(+day);
    resultDate.setHours(0, 0, 0, 0);

    if (Number.isNaN(resultDate.getTime())) {
        return;
    }

    return resultDate;
};

export default convertFromString;
