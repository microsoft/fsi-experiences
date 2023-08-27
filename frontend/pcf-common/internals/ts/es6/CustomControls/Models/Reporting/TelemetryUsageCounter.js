import { instance as TelemetryReporter } from "./TelemetryReporter";
var TelemetryUsageCounter = (function () {
    function TelemetryUsageCounter(controlName) {
        this._counters = {};
        this._controlName = controlName;
    }
    TelemetryUsageCounter.prototype.makeBuilder = function () {
        return new TelemetryUsageCounterBuilder(this._counters);
    };
    TelemetryUsageCounter.prototype.reportUsageCounters = function (eventName) {
        if (Object.keys(this._counters).length) {
            TelemetryReporter.reportUsage(eventName, [
                {
                    name: "controlName",
                    value: this._controlName,
                },
                {
                    name: "message",
                    value: JSON.stringify(this._counters),
                },
            ]);
            this._counters = {};
        }
    };
    return TelemetryUsageCounter;
}());
export { TelemetryUsageCounter };
var TelemetryUsageCounterBuilder = (function () {
    function TelemetryUsageCounterBuilder(counters) {
        this._nestedProperties = {};
        this._counters = counters;
    }
    TelemetryUsageCounterBuilder.prototype.withProperties = function (obj) {
        if (!this._obj) {
            this._obj = obj;
        }
        else {
            for (var key in obj) {
                var value = obj[key];
                this._obj[key] = value;
            }
        }
        return this;
    };
    TelemetryUsageCounterBuilder.prototype.withNestedProperties = function (name, nestedObj) {
        this._nestedProperties[name] = nestedObj;
        return this;
    };
    TelemetryUsageCounterBuilder.prototype.withProperty = function (name, value) {
        if (!this._obj) {
            this._obj = {};
        }
        this._obj[name] = value;
        return this;
    };
    TelemetryUsageCounterBuilder.prototype.withReceiver = function (receiver) {
        var _a;
        (_a = this._receiver) !== null && _a !== void 0 ? _a : (this._receiver = receiver);
        return this;
    };
    TelemetryUsageCounterBuilder.prototype.build = function () {
        var obj = this._buildInternal(this._obj);
        for (var key in this._nestedProperties) {
            obj[key] = this._buildInternal(this._nestedProperties[key], key);
        }
        this._obj = null;
        this._receiver = null;
        this._nestedProperties = {};
        return obj;
    };
    TelemetryUsageCounterBuilder.prototype._buildInternal = function (obj, prefix) {
        for (var key in obj) {
            var value = obj[key];
            if (isFunction(value)) {
                var name_1 = prefix ? prefix + "." + key : key;
                obj[key] = trackUsage(this._receiver, this._counters, name_1, value);
            }
        }
        return obj;
    };
    return TelemetryUsageCounterBuilder;
}());
export { TelemetryUsageCounterBuilder };
function isFunction(method) {
    return typeof method === "function";
}
function trackUsage(receiver, counters, name, method) {
    return function () {
        try {
            var result = method.apply(receiver, arguments);
            incrementCounter(counters, name, "success");
            return result;
        }
        catch (ex) {
            incrementCounter(counters, name, "failure");
            throw ex;
        }
    };
}
function incrementCounter(counters, name, type) {
    var _a;
    ((_a = counters[name]) !== null && _a !== void 0 ? _a : (counters[name] = {
        failure: 0,
        success: 0,
    }))[type]++;
}
