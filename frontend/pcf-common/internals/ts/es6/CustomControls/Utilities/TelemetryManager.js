import { instance as XrmProxy } from "./XrmProxy";
var EVENT_NAME = "uci_controlframework_usage";
var COMPONENT_NAME = "CustomControlFramework";
var TelemetryManager = (function () {
    function TelemetryManager() {
    }
    TelemetryManager.prototype.reportUsage = function (props, status) {
        var usageEvent = {
            eventName: EVENT_NAME,
            eventParameters: this.generateEventParams(props, null, null, status),
        };
        if (XrmProxy && XrmProxy.Reporting && XrmProxy.Reporting.reportEvent) {
            XrmProxy.Reporting.reportEvent(usageEvent);
        }
    };
    TelemetryManager.prototype.reportEventFailure = function (props, exception, ApiName, parentId, suggestedMitigation, failureType, additionalEventParams) {
        var _a, _b;
        var telemetryComponentName = ((_a = props === null || props === void 0 ? void 0 : props.manifest) === null || _a === void 0 ? void 0 : _a.ConstructorName) || ((_b = props === null || props === void 0 ? void 0 : props.configuration) === null || _b === void 0 ? void 0 : _b.CustomControlId) || "Unknown";
        if (failureType && failureType === "ControlFramework") {
            telemetryComponentName = COMPONENT_NAME + "." + telemetryComponentName;
        }
        if (XrmProxy && XrmProxy.Reporting && XrmProxy.Reporting.reportFailure) {
            XrmProxy.Reporting.reportFailure(telemetryComponentName, exception, suggestedMitigation, this.generateEventParams(props, ApiName, parentId, null, additionalEventParams));
        }
    };
    TelemetryManager.prototype.reportEventSuccess = function (props, ApiName) {
        var telemetryComponentName = props.manifest ? props.manifest.ConstructorName : props.configuration.CustomControlId;
        telemetryComponentName = COMPONENT_NAME + "." + telemetryComponentName;
        if (XrmProxy && XrmProxy.Reporting && XrmProxy.Reporting.reportSuccess) {
            XrmProxy.Reporting.reportSuccess(telemetryComponentName, this.generateEventParams(props, ApiName));
        }
    };
    TelemetryManager.prototype.generateEventParams = function (props, apiName, parentId, status, additionalEventParams) {
        var eventParams = [];
        var ControlName = {
            name: "ControlName",
            value: props ? props.controlId : "",
        };
        var ControlId = {
            name: "ControlId",
            value: props && props.manifest ? props.manifest.CustomControlId : "",
        };
        var APIName = {
            name: "APIName",
            value: apiName,
        };
        var HostPage = {
            name: "HostPage",
            value: props ? props.pageType : "",
        };
        var NumberOfResources = {
            name: "ResourceArrayLength",
            value: props && props.manifest ? props.manifest.Properties.Resources.length : "",
        };
        eventParams.push(ControlName);
        eventParams.push(ControlId);
        eventParams.push(HostPage);
        eventParams.push(NumberOfResources);
        if (status) {
            var Status = {
                name: "ControlLoadStatus",
                value: status,
            };
            eventParams.push(Status);
        }
        if (apiName) {
            eventParams.push(APIName);
        }
        if (parentId) {
            var ParentCCContext = {
                name: "ParentCCContext",
                value: parentId,
            };
            eventParams.push(ParentCCContext);
        }
        if (props.propBagData) {
            var Entity = {
                name: "Entity",
                value: props.propBagData && props.propBagData.modeData ? props.propBagData.modeData.entityTypeName : null,
            };
            eventParams.push(Entity);
        }
        additionalEventParams && eventParams.push.apply(eventParams, additionalEventParams);
        return eventParams;
    };
    return TelemetryManager;
}());
var instance = new TelemetryManager();
export { TelemetryManager, instance, COMPONENT_NAME };
export default instance;
