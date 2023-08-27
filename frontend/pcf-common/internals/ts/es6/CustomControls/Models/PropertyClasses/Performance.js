import { instance as CCFPerformanceTracker } from "../../Utilities/CCFPerformanceTracker";
var Performance = (function () {
    function Performance(customControlProperties) {
        this._performanceEvents = {};
        this._customControlProperties = customControlProperties;
    }
    Performance.prototype.createPerformanceStopwatch = function (name, parameters, alwaysDisplay) {
        if (alwaysDisplay === void 0) { alwaysDisplay = false; }
        if (!this._performanceEvents[name]) {
            this._performanceEvents[name] = CCFPerformanceTracker.createPerformanceEvent(name, alwaysDisplay ? undefined : this._customControlProperties.logLevel, this._customControlProperties.configuration.CustomControlId);
        }
        return this._performanceEvents[name].startStopwatch(parameters);
    };
    Performance.prototype.trackWork = function (diagnosticId) {
        return CCFPerformanceTracker.trackWork(diagnosticId);
    };
    Performance.prototype.addKeyPerformanceIndicator = function (name, parameters, retroactiveTimestamp) {
        CCFPerformanceTracker.addKeyPerformanceIndicator(name, parameters, retroactiveTimestamp);
    };
    Performance.prototype.addKeyPerformanceIndicatorOnIdle = function (name, parameters) {
        CCFPerformanceTracker.addKeyPerformanceIndicatorOnIdle(name, parameters);
    };
    return Performance;
}());
export { Performance };
