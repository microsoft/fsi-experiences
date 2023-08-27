import { TelemetryProvider, TelemetryEventAdditionalParams } from "./CustomControlTelemetryInterfaces";
declare class TelemetryReporter {
    private _telemetryProvider;
    initWithProvider(provider: TelemetryProvider): boolean;
    reportEventSuccess(eventName: string, eventParameters: TelemetryEventAdditionalParams[]): void;
    reportEventFailure(eventName: string, eventParameters: TelemetryEventAdditionalParams[]): void;
    reportUsage(eventName: string, eventParameters: TelemetryEventAdditionalParams[]): void;
}
declare const instance: TelemetryReporter;
export { TelemetryReporter, instance };
