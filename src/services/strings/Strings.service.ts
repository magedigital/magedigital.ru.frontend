import clearSpaces from './methods/clearSpaces';
import getEndText from './methods/getEndText';
import priceFormat from './methods/priceFormat';
import setSpaces from './methods/setSpaces';
import validate from './methods/validate';
import validateDomen from './methods/validateDomen';

import StringsI from './types';

export default class Strings implements StringsI {
    clearSpaces = clearSpaces;
    setSpaces = setSpaces;

    getEndText = getEndText;

    validate = validate;
    validateDomen = validateDomen;
    priceFormat = priceFormat;
}
