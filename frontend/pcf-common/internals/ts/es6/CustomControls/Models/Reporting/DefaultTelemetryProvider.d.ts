import { TelemetryEventAdditionalParams, TelemetryEventOutcome, TelemetryEventType, TelemetryProvider } from "./CustomControlTelemetryInterfaces";
export declare class DefaultTelemetryProvider implements TelemetryProvider {
    report(eventName: string, eventType: TelemetryEventType, outcome: TelemetryEventOutcome, additionalParams?: TelemetryEventAdditionalParams[]): void;
}
