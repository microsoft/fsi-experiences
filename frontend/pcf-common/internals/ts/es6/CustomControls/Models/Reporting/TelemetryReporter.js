import { TelemetryEventType, TelemetryEventOutcome, } from "./CustomControlTelemetryInterfaces";
import { DefaultTelemetryProvider } from "./DefaultTelemetryProvider";
var TelemetryReporter = (function () {
    function TelemetryReporter() {
        this._telemetryProvider = new DefaultTelemetryProvider();
    }
    TelemetryReporter.prototype.initWithProvider = function (provider) {
        if (!instance._telemetryProvider || instance._telemetryProvider instanceof DefaultTelemetryProvider) {
            instance._telemetryProvider = provider;
            return true;
        }
        return false;
    };
    TelemetryReporter.prototype.reportEventSuccess = function (eventName, eventParameters) {
        var _a;
        (_a = this._telemetryProvider) === null || _a === void 0 ? void 0 : _a.report(eventName, TelemetryEventType.Diagnostic, TelemetryEventOutcome.Success, eventParameters);
    };
    TelemetryReporter.prototype.reportEventFailure = function (eventName, eventParameters) {
        var _a;
        (_a = this._telemetryProvider) === null || _a === void 0 ? void 0 : _a.report(eventName, TelemetryEventType.Diagnostic, TelemetryEventOutcome.Failure, eventParameters);
    };
    TelemetryReporter.prototype.reportUsage = function (eventName, eventParameters) {
        var _a;
        (_a = this._telemetryProvider) === null || _a === void 0 ? void 0 : _a.report(eventName, TelemetryEventType.Usage, TelemetryEventOutcome.Success, eventParameters);
    };
    return TelemetryReporter;
}());
var instance = new TelemetryReporter();
export { TelemetryReporter, instance };
