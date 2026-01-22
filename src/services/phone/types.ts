interface PhoneI {
    format: {
        (this: PhoneI, s: string): string;
        (this: PhoneI, s: number): string;
        (this: PhoneI, s: any): undefined;
    };
    clear: {
        (this: PhoneI, s: string): string;
        (this: PhoneI, s: number): string;
        (this: PhoneI, s: unknown): undefined;
    };
}

export default PhoneI;
