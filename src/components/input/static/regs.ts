import { ddChar } from '../../../services/dates/types';

const regs = {
    any: {
        template: '',
        emptyChar: '_',
        regExp: /\D/gi,
    },
    phone: {
        template: '+7 (___) ___-__-__',
        emptyChar: '_',
        regExp: /\D/gi,
        notAddChars: {
            start: 0,
            end: 6,
            chars: ['7', '8'],
            wasLen: 11,
        },
    },
    date: {
        template: `__${ddChar}__${ddChar}____`,
        emptyChar: '_',
        regExp: /\D/gi,
    },
    time: {
        template: `__:__`,
        emptyChar: '_',
        regExp: /\D/gi,
    },
    dateAndTime: {
        template: `__${ddChar}__${ddChar}____ в __:__`,
        emptyChar: '_',
        regExp: /\D/gi,
    },
};

type RegsT = {
    template: string;
    emptyChar: string;
    regExp: RegExp;
    notAddChars?: {
        start: number;
        end: number;
        wasLen: number;
        chars: readonly string[];
    };
};

export default regs;

export type { RegsT };
