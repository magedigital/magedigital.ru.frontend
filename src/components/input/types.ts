import { ChangeEvent } from 'react';

import DefaultI from '@components/default/types';

import regs, { RegsT } from './static/regs';

type PropsT = {
    value: string;
    onChange: (data: { value: string }) => Promise<void>;
    regName?: keyof typeof regs;
    reg?: string;
    datePast?: boolean;
    dateFuture?: boolean;
    support?: string;
    disabled?: boolean;
};

type StateT = {
    isFocus?: boolean;
};

interface InputI extends DefaultI<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
    input: React.RefObject<HTMLInputElement | null>;

    regs: typeof regs;
    savedValue?: string;
    startPos?: number;
    endPos?: number;

    changeHandler(this: InputI, e: ChangeEvent<HTMLInputElement>): Promise<void>;

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
    regsTimeValidate(this: InputI, data: { value: string }): { value: string };
    regsDateAndTimeValidate(this: InputI, data: { value: string }): { value: string };

    focusHandler(this: InputI, isFocus: boolean): Promise<void>;
    saveCursorPositions(this: InputI): void;
    setCursorPositions(this: InputI, start: number, end: number): void;
}

export default InputI;
