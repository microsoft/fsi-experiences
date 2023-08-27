var PerformanceStopwatch = (function () {
    function PerformanceStopwatch(event, parameters) {
        this._event = event;
        this._parameters = parameters;
    }
    PerformanceStopwatch.prototype.start = function () {
        this._stop = this._event.startStopwatch(this._parameters);
    };
    PerformanceStopwatch.prototype.stop = function (params) {
        this._stop(params);
    };
    return PerformanceStopwatch;
}());
export { PerformanceStopwatch };
