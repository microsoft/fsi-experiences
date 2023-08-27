import { IconPosition } from "../../CommonComponents/FontIcon/MicrosoftIcon";
import { CustomControlEntityReference } from "./CustomControlEntityReference";
import { CultureInfo } from "../Utilities/CultureInfo";
import { DateTimeFieldBehavior, ControlAttributes } from "./CustomControlMetadataInterfaces";
interface ITimeZoneAdjusterState {
    dateStart: Date;
    dateEnd: Date;
    delta: number;
    daylightStart: ITransitionConstraintState;
    daylightEnd: ITransitionConstraintState;
}
interface ITransitionConstraintState {
    day: number;
    dayOfWeek: number;
    month: number;
    week: number;
    timeOfDay: Date;
    isFixedDateRule: boolean;
}
interface IFormatter {
    ParseDateFromString: (value: string, format: DateFormat, cultureInfo: CultureInfo, formatterProperties: any) => Date;
    formatIntegerValue(input: number, cultureInfo: CultureInfo): string;
    formatCurrencyValue(input: number, cultureInfo: CultureInfo, currencySymbol?: string, precision?: number): string;
    parseFormatted?(input: any, formatterProperties: any, cultureInfo: CultureInfo, format: string, resourceStrings?: {
        [Key: string]: string;
    }): number | Date | string | boolean | number[];
    formatShortDateValue(input: Date, cultureInfo: CultureInfo, behavior?: CrmFramework.DateTimeFieldBehavior, timeZoneOffsetMinutes?: number, adjusters?: ITimeZoneAdjusterState[]): string;
    formatLongDateValue(input: Date, cultureInfo: CultureInfo, behavior?: CrmFramework.DateTimeFieldBehavior, timeZoneOffsetMinutes?: number, adjusters?: ITimeZoneAdjusterState[]): string;
    formatSortableDateValue(input: Date, cultureInfo: CultureInfo, behavior?: CrmFramework.DateTimeFieldBehavior): string;
    formatSortableDateTimeValue(input: Date, cultureInfo: CultureInfo, behavior?: CrmFramework.DateTimeFieldBehavior, timeZoneOffsetMinutes?: number, adjusters?: ITimeZoneAdjusterState[]): string;
    formatShortDateTimeValue(input: Date, cultureInfo: CultureInfo, behavior?: CrmFramework.DateTimeFieldBehavior, timeZoneOffsetMinutes?: number, adjusters?: ITimeZoneAdjusterState[]): string;
    formatDateLongAbbreviated(input: Date, cultureInfo: CultureInfo, behavior?: CrmFramework.DateTimeFieldBehavior, timeZoneOffsetMinutes?: number, adjusters?: ITimeZoneAdjusterState[]): string;
    formatDateYearMonthValue(input: Date, cultureInfo: CultureInfo, behavior?: CrmFramework.DateTimeFieldBehavior, timeZoneOffsetMinutes?: number, adjusters?: ITimeZoneAdjusterState[]): string;
    formatDecimalValue(input: number, cultureInfo: CultureInfo, precision?: number): string;
    formatLanguageValue(input: number, languagesByCode: {
        [code: number]: string;
    }): string;
    formatUserDateTimeToUTC?(userDateTime: Date, behavior?: DateTimeFieldBehavior): string;
    formatUTCDateTimeToUserDate?(utcDateTime: string, behavior?: DateTimeFieldBehavior): Date;
    formatUserInput(input: unknown, controlAttributes: ControlAttributes): string;
    parseDateFromInput(input: string, controlAttributes: ControlAttributes): Date;
}
export declare enum DateFormat {
    date = "date",
    dateonly = "dateonly",
    datetime = "datetime",
    dateandtime = "dateandtime"
}
export declare enum Format {
    connection = "connection",
    date = "date",
    dateTime = "datetime",
    duration = "duration",
    email = "email",
    language = "language",
    none = "none",
    phone = "phone",
    regarding = "regarding",
    text = "text",
    textArea = "textarea",
    tickerSymbol = "tickersymbol",
    timeZone = "timezone",
    url = "url"
}
interface IEncoder {
    CrmUrlEncode(s: string): string;
    CrmHtmlEncode(s: string): string;
}
interface IDateTimeUtils {
    getDSTAdjustmentMinutes(time: Date, adjusters: ITimeZoneAdjusterState[]): number;
    getWeekOfYear(time: Date, firstDayOfWeek: number, calendarWeekRule: number, isLegacyFeatureEnabled?: boolean): number;
}
interface IPerformanceStopwatch {
    start(): void;
    stop(): void;
}
interface IPerformanceEvent {
    createMarker(parameters?: {
        [parameterName: string]: string;
    }, retroactiveTimestamp?: number): void;
    startStopwatch(parameters?: {
        [parameterName: string]: string;
    }): PerformanceEventStopwatch;
    createRetroactiveStopwatch(startTime: number, duration: number, parameters?: {
        [parameterName: string]: string;
    }): void;
}
declare type PerformanceEventStopwatch = (parameters?: {
    [parameterName: string]: string;
}) => void;
interface IKeyboardShortcut {
    getKeyCombination: () => number[];
    getShortcutHandler: () => any;
    getIsGlobal: () => boolean;
    getIsHidden: () => boolean;
    getAreaName: () => string;
    getKeyboardShortcutType: () => any;
    getSrcElementId: () => string;
    getShortcutDescription: () => string;
}
interface ICCFConnectedCommandManagerProps {
    commandbarDisplayMode?: number;
    id: string;
    xrmReady: boolean;
    ribbonId: string;
    mainMenuLength: number;
    iconPosition: IconPosition;
    width?: number;
    selectedRecords?: CustomControlEntityReference[];
    key?: string;
    shouldEvaluateRules?: boolean;
    commandManagerId?: string;
    metaDataLoadedResolve?: (value: boolean) => void;
    isHidden?: boolean;
    addedCommandList?: any[];
    commandButtonWidth?: number;
    commandBarStyle?: any;
    customCommandManagerStyle?: any;
    contextToken?: any;
    rootZIndex?: boolean;
    customControlType?: string;
    focusOnFirstChild?: boolean;
    skipPageXrmReady?: boolean;
    initializationCompletedCallback?: () => void;
}
export { ICCFConnectedCommandManagerProps, IKeyboardShortcut, IPerformanceEvent, PerformanceEventStopwatch, IPerformanceStopwatch, ITransitionConstraintState, ITimeZoneAdjusterState, IDateTimeUtils, IEncoder, IFormatter, };
