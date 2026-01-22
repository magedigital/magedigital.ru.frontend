import { ddChar } from '../../../services/dates/types.ts';
import I from '../types.ts';

import Dates from '../../../services/dates/Dates.service.ts';

const regsDateValidate: I['regsDateValidate'] = function ({ value }) {
    const { datePast, dateFuture } = this.props;
    const dateArr = value.split(ddChar);
    const [day, month, year] = dateArr;

    if (day && !Number.isNaN(+day)) {
        if (+day === 0) {
            dateArr[0] = '01';
        }

        if (+day > 31) {
            dateArr[0] = '31';
        }
    }

    if (month && !Number.isNaN(+month)) {
        if (+month === 0) {
            dateArr[1] = '01';
        }

        if (+month > 12) {
            dateArr[1] = '12';
        }
    }

    if (year && !Number.isNaN(+year)) {
        if (+year < 1950) {
            dateArr[2] = '1950';
        }

        if (+year > 2150) {
            dateArr[2] = '2150';
        }
    }

    let resultValue = dateArr.join(ddChar);

    if (datePast === false) {
        const date = new Dates().convertFromString(resultValue);

        if (date && date.getTime() < new Date().getTime()) {
            resultValue = new Dates().format(new Date().getTime(), {});
        }
    }

    if (dateFuture === false) {
        const date = new Dates().convertFromString(resultValue);

        if (date && date.getTime() > new Date().getTime()) {
            resultValue = new Dates().format(new Date().getTime(), {});
        }
    }

    return { value: resultValue };
};

export default regsDateValidate;
