import { ICustomControlHostProps } from "./../CustomControlDataInterfaces";
import * as CustomControlBagInterfaces from "./../CustomControlExposedInterfaces";
export declare class Performance implements CustomControlBagInterfaces.IPerformance {
    private _customControlProperties;
    private _performanceEvents;
    constructor(customControlProperties: ICustomControlHostProps);
    createPerformanceStopwatch(name: string, parameters?: {
        [parameterName: string]: string;
    }, alwaysDisplay?: boolean): (endParameters?: {
        [parameterName: string]: string;
    }) => void;
    trackWork(diagnosticId: string): () => void;
    addKeyPerformanceIndicator(name: string, parameters?: {
        [parameterName: string]: string;
    }, retroactiveTimestamp?: number): void;
    addKeyPerformanceIndicatorOnIdle(name: string, parameters?: {
        [parameterName: string]: string;
    }): void;
}
