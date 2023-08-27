import { CultureInfo } from "../../../Utilities/CultureInfo";
export declare class AjaxDate {
    static localeFormat(value: Date, format: string, culture: CultureInfo): string;
    static parse(value: string, format: string, cultureInfo: CultureInfo): Date;
}
