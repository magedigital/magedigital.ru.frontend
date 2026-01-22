import convertFromString from './methods/convertFromString';
import format from './methods/format';
import numFormat from './methods/numFormat';

import months from './static/months';
import DatesI from './types';

export default class Dates implements DatesI {
    months = months;

    convertFromString = convertFromString;
    numFormat = numFormat;

    format = format;
}
