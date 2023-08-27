import { Dictionary } from "./Dictionary";
export declare class CultureInfo {
    static CurrentCulture: CultureInfo;
    static InvariantCulture: CultureInfo;
    name: string;
    numberFormat: Dictionary;
    dateTimeFormat: Dictionary;
    constructor(name: string, numberFormat: Dictionary, dateTimeFormat: Dictionary);
}
