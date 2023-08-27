var DefaultCreatePerformanceEvent = {
    createMarker: function () { },
    startStopwatch: function () {
        return function stop() { };
    },
    createRetroactiveStopwatch: function () { },
};
var CCFPerformanceTracker = (function () {
    function CCFPerformanceTracker() {
        this._creator = null;
    }
    CCFPerformanceTracker.prototype.setPerformanceHooks = function (eventCreator, addKpi, addKpiOnIdle, trackWork, scheduleControlUpdate) {
        this._creator = eventCreator;
        this._addKpi = addKpi;
        this._addKpiOnIdle = addKpiOnIdle;
        this._trackWork = trackWork;
        this._scheduleControlUpdate = scheduleControlUpdate;
    };
    CCFPerformanceTracker.prototype.createPerformanceEvent = function (eventName, logLevel, zone) {
        if (logLevel === void 0) { logLevel = 3; }
        if (zone === void 0) { zone = "CustomControlsFramework"; }
        if (this._creator && logLevel > 2) {
            return this._creator(eventName, zone);
        }
        return DefaultCreatePerformanceEvent;
    };
    CCFPerformanceTracker.prototype.startLifecycleStopwatch = function (methodName, controlId, manifestControlName) {
        return this.createPerformanceEvent(methodName, undefined, "CustomControls").startStopwatch({
            controlId: controlId,
            manifestControlName: manifestControlName,
        });
    };
    CCFPerformanceTracker.prototype.addKeyPerformanceIndicator = function (name, parameters, retroactiveTimestamp) {
        if (this._addKpi) {
            this._addKpi(name, parameters, retroactiveTimestamp);
        }
    };
    CCFPerformanceTracker.prototype.addKeyPerformanceIndicatorOnIdle = function (name, parameters) {
        if (this._addKpiOnIdle) {
            this._addKpiOnIdle(name, parameters);
        }
    };
    CCFPerformanceTracker.prototype.trackWork = function (diagnosticId) {
        if (this._trackWork) {
            return this._trackWork(diagnosticId);
        }
        return function () { };
    };
    CCFPerformanceTracker.prototype.scheduleControlUpdate = function (update) {
        if (this._scheduleControlUpdate) {
            this._scheduleControlUpdate(update);
        }
        else {
            update();
        }
    };
    return CCFPerformanceTracker;
}());
var instance = new CCFPerformanceTracker();
export { CCFPerformanceTracker, instance, };
export default instance;
