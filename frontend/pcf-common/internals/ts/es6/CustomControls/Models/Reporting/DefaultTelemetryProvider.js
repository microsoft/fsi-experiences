var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { instance as XrmProxy } from "../../Utilities/XrmProxy";
import { TelemetryEventOutcome, TelemetryEventType, } from "./CustomControlTelemetryInterfaces";
var DefaultTelemetryProvider = (function () {
    function DefaultTelemetryProvider() {
    }
    DefaultTelemetryProvider.prototype.report = function (eventName, eventType, outcome, additionalParams) {
        if (!(XrmProxy === null || XrmProxy === void 0 ? void 0 : XrmProxy.Reporting)) {
            return;
        }
        if (eventType === TelemetryEventType.Usage) {
            if (!XrmProxy.Reporting.reportEvent) {
                return;
            }
            reportEvent(eventName, additionalParams);
        }
        else if (eventType === TelemetryEventType.Diagnostic) {
            if (outcome === TelemetryEventOutcome.Success) {
                if (!XrmProxy.Reporting.reportSuccess) {
                    return;
                }
                reportSuccess(eventName, additionalParams);
            }
            else if (outcome === TelemetryEventOutcome.Failure) {
                if (!XrmProxy.Reporting.reportFailure) {
                    return;
                }
                reportFailure(eventName, additionalParams);
            }
        }
    };
    return DefaultTelemetryProvider;
}());
export { DefaultTelemetryProvider };
function reportEvent(eventName, additionalParams) {
    var componentName = extractControlName(additionalParams);
    var usageParams = arrayToObject(ensureAPIName(eventName, additionalParams));
    var eventParameters = [
        {
            name: "ControlName",
            value: componentName,
        },
        {
            name: "EventContext",
            value: JSON.stringify(usageParams),
        },
    ];
    XrmProxy.Reporting.reportEvent({
        eventName: "uci_controlframework_usage",
        eventParameters: eventParameters,
    });
}
function reportSuccess(eventName, additionalParams) {
    var componentName = extractControlName(additionalParams);
    var successParams = ensureAPIName(eventName, additionalParams);
    XrmProxy.Reporting.reportSuccess(componentName, successParams);
}
function reportFailure(eventName, additionalParams) {
    var componentName = extractControlName(additionalParams);
    var errorMessage = extractMessage(additionalParams);
    var failureParams = ensureAPIName(eventName, additionalParams);
    XrmProxy.Reporting.reportFailure(componentName, new Error(errorMessage), null, failureParams);
}
function extractMessage(params) {
    return extractParameter(params, "message");
}
function extractControlName(params) {
    return extractParameter(params, "controlName") || "UnknownPCFControl";
}
function extractParameter(params, parameterName) {
    var messageIndex = params === null || params === void 0 ? void 0 : params.findIndex(function (_a) {
        var name = _a.name;
        return name === parameterName;
    });
    var message = messageIndex >= 0 ? params.splice(messageIndex, 1)[0].value : "";
    return message;
}
function ensureAPIName(apiName, params) {
    return __spreadArray([
        {
            name: "APIName",
            value: apiName,
        }
    ], (params || []), true);
}
function arrayToObject(params) {
    var obj = {};
    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
        var _a = params_1[_i], name_1 = _a.name, value = _a.value;
        obj[name_1] = value;
    }
    return obj;
}
