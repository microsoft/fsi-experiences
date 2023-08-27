import { IPerformanceEvent, IPerformanceStopwatch } from "../Models/CustomControlDependantInterfaces";
declare class PerformanceStopwatch implements IPerformanceStopwatch {
    private _stop;
    private _event;
    private _parameters;
    constructor(event: IPerformanceEvent, parameters?: {
        [parameterName: string]: string;
    });
    start(): void;
    stop(params?: {
        [parameterName: string]: string;
    }): void;
}
export { PerformanceStopwatch };
