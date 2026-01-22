import clear from './methods/clear';
import format from './methods/format';

import PhoneI from './types';

export default class Phone implements PhoneI {
    clear = clear;
    format = format;
}
