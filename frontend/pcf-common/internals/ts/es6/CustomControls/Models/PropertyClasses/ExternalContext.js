import { instance as XrmProxy } from "../../Utilities/XrmProxy";
var ExternalContext = (function () {
    function ExternalContext() {
    }
    ExternalContext.prototype.getAvailableExternalContexts = function () {
        return XrmProxy.getAvailableExternalContexts();
    };
    ExternalContext.prototype.getExternalContextProperty = function (externalContextId, externalContextPropertyId, options) {
        return XrmProxy.getExternalContextProperty(externalContextId, externalContextPropertyId, options);
    };
    ExternalContext.prototype.invokeExternalContextAction = function (externalContextId, externalContextActionId, options) {
        return XrmProxy.invokeExternalContextAction(externalContextId, externalContextActionId, options);
    };
    ExternalContext.prototype.removeExternalContextPropertyListener = function (externalContextId, externalContextPropertyId, listener) {
        return XrmProxy.removeExternalContextPropertyListener(externalContextId, externalContextPropertyId, listener);
    };
    return ExternalContext;
}());
export { ExternalContext };
