declare enum TelemetryEventOutcome {
    Success = 0,
    Failure = 1,
    Incomplete = 2
}
interface TelemetryEventAdditionalParams {
    name: TelemetryEventKnownAdditonalParamNames;
    value: string | number | boolean | Date;
}
declare enum TelemetryEventType {
    Diagnostic = 0,
    Usage = 1
}
declare type TelemetryEventKnownAdditonalParamNames = "controlName" | "message";
interface TelemetryProvider {
    report(eventName: string, eventType: TelemetryEventType, outcome: TelemetryEventOutcome, additionalParams?: TelemetryEventAdditionalParams[]): void;
}
export { TelemetryProvider, TelemetryEventType, TelemetryEventOutcome, TelemetryEventAdditionalParams, TelemetryEventKnownAdditonalParamNames, };
