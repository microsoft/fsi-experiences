var TelemetryEventOutcome;
(function (TelemetryEventOutcome) {
    TelemetryEventOutcome[TelemetryEventOutcome["Success"] = 0] = "Success";
    TelemetryEventOutcome[TelemetryEventOutcome["Failure"] = 1] = "Failure";
    TelemetryEventOutcome[TelemetryEventOutcome["Incomplete"] = 2] = "Incomplete";
})(TelemetryEventOutcome || (TelemetryEventOutcome = {}));
var TelemetryEventType;
(function (TelemetryEventType) {
    TelemetryEventType[TelemetryEventType["Diagnostic"] = 0] = "Diagnostic";
    TelemetryEventType[TelemetryEventType["Usage"] = 1] = "Usage";
})(TelemetryEventType || (TelemetryEventType = {}));
export { TelemetryEventType, TelemetryEventOutcome, };
