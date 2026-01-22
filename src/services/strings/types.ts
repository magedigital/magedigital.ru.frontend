interface StringsI {
    clearSpaces: {
        (this: StringsI, s: string): string;
        (this: StringsI, s: any): undefined;
    };
    getEndText: {
        (this: StringsI, n: number, items: [string, string, string]): string;
        (this: StringsI, n: any, items: [string, string, string]): undefined;
    };

    setSpaces(this: StringsI, s: string): string;

    validate(this: StringsI, s: unknown, type: 'domen'): boolean;
    validateDomen(this: StringsI, s: string): boolean;
    priceFormat(this: StringsI, n: unknown): string;
}

export default StringsI;
