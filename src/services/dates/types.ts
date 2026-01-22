import months from './static/months';

const ddChar = '.';

type FormatTypeT = 'full' | 'time' | 'fullText' | 'nowText';

interface DatesI {
    months: typeof months;

    convertFromString: {
        (this: DatesI, s: string): Date;
        (this: DatesI, s: any): undefined;
    };
    format: {
        (this: DatesI, s: string, data: { type?: FormatTypeT }): string;
        (this: DatesI, s: number, data: { type?: FormatTypeT }): string;
        (this: DatesI, s: any, data: { type?: FormatTypeT }): undefined;
    };
    numFormat: {
        (this: DatesI, s: string): string;
        (this: DatesI, s: number): string;
        (this: DatesI, s: any): undefined;
    };
}

export default DatesI;
export { ddChar };
