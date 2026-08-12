import { ChangeEvent, KeyboardEvent } from 'react';

import DefaultI from '../default/types';
import regs, { RegsT } from './static/regs';

type PropsT = {
    value: string;
    onChange: (data: { value: string }) => Promise<void>;
} & Partial<{
    regName: keyof typeof regs;
    reg: RegsT;
    regKey: string;
    regExp: RegExp;
    datePast: boolean;
    dateFuture: boolean;
    support: string;
    disabled: boolean;
    isSupportWithFocusShow: boolean;
    isPassword: boolean;
    error: ErrorT;
    updatedKey: any;
    area: Partial<{
        isCalc: boolean;
        calcCb: () => void;
        minHeight: () => number;
        maxHeight: () => number;
    }>;
}>;

type StateT = {
    isFocus?: boolean;
    isShowPassword?: boolean;
};

interface InputI extends DefaultI<PropsT, StateT> {
    input: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;

    regs: typeof regs;
    savedValue?: string;
    startPos?: number;
    endPos?: number;
    changedValue?: string;
    changeValueResolve?: () => void;

    changeHandler(
        this: InputI,
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): Promise<void>;

    getReg(this: InputI): RegsT;
    regsHandler(this: InputI, data: { value: string }): { value: string; curPos: number };
    regsDeleteHandler(
        this: InputI,
        data: { value: string; diff: number },
    ): { value: string; curPos: number } | undefined;
    regsAddHandler(
        this: InputI,
        data: { value: string; diff: number },
    ): { value: string; curPos: number } | undefined;
    regsValidate(this: InputI, data: { value: string }): { value: string };
    regsDateValidate(this: InputI, data: { value: string }): { value: string };
    regsMonthDateValidate(this: InputI, data: { value: string }): { value: string };
    regsTimeValidate(this: InputI, data: { value: string }): { value: string };
    regsDateAndTimeValidate(this: InputI, data: { value: string }): { value: string };

    inputKeysHandler(this: InputI, e: KeyboardEvent): Promise<void>;
    focusHandler(this: InputI, isFocus: boolean): Promise<void>;

    saveCursorPositions(this: InputI): void;
    setCursorPositions(this: InputI, start: number, end: number): void;

    setAreaSize(this: InputI): void;

    renderSupport(this: InputI): React.ReactNode;
    renderField(this: InputI): React.ReactNode;
}

export default InputI;
export type { PropsT as InputPropsT };
