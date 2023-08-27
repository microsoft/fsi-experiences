import { IPerformanceEvent, PerformanceEventStopwatch } from "../Models/CustomControlDependantInterfaces";
declare type PerformanceEventCreator = (eventName: string, zone?: string) => IPerformanceEvent;
declare type PerformanceEventParameters = {
    [parameterName: string]: string;
};
declare type AddKpiFunction = (name: string, parameters?: PerformanceEventParameters, retroactiveTimestamp?: number) => void;
declare type AddKpiOnIdleFunction = (name: string, parameters?: PerformanceEventParameters) => void;
declare type TrackWorkFunction = (diagnosticId: string) => () => void;
declare type ScheduleControlUpdateFunction = (init: () => void) => void;
declare class CCFPerformanceTracker {
    private _creator;
    private _addKpi;
    private _addKpiOnIdle;
    private _trackWork;
    private _scheduleControlUpdate;
    setPerformanceHooks(eventCreator: PerformanceEventCreator, addKpi: AddKpiFunction, addKpiOnIdle: AddKpiOnIdleFunction, trackWork: TrackWorkFunction, scheduleControlUpdate: ScheduleControlUpdateFunction): void;
    createPerformanceEvent(eventName: string, logLevel?: CustomControlInterfaces.TracerLogLevel, zone?: string): IPerformanceEvent;
    startLifecycleStopwatch(methodName: string, controlId: string, manifestControlName: string): PerformanceEventStopwatch;
    addKeyPerformanceIndicator(name: string, parameters?: PerformanceEventParameters, retroactiveTimestamp?: number): void;
    addKeyPerformanceIndicatorOnIdle(name: string, parameters?: PerformanceEventParameters): void;
    trackWork(diagnosticId: string): () => void;
    scheduleControlUpdate(update: () => void): void;
}
declare const instance: CCFPerformanceTracker;
export { PerformanceEventCreator, PerformanceEventParameters, AddKpiFunction, AddKpiOnIdleFunction, TrackWorkFunction, ScheduleControlUpdateFunction, CCFPerformanceTracker, instance, };
export default instance;
