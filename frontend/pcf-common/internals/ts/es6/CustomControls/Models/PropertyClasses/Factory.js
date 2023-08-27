import { VirtualComponent } from "../../Components/VirtualComponent";
import * as CCFUtils from "./../CustomControlUtilityPointers";
import { retrieveDefaultManifestNameByDataType } from "../../Utilities/DefaultControlMapper";
import { FileObject } from "../../../CommonComponents/File/FileObject";
var Factory = (function () {
    function Factory(customControlProperties, externalUtils) {
        this._customControlProperties = customControlProperties;
        this._externalUtils = externalUtils;
    }
    Factory.prototype.createElement = function (type, properties, children) {
        return new VirtualComponent(type, properties ? properties.id : "", properties, children);
    };
    Factory.prototype.createComponent = function (type, id, properties) {
        return new VirtualComponent(type, id, properties, null);
    };
    Factory.prototype.bindDOMElement = function (virtualComponent, DOMNode) {
        this._externalUtils.bindDOMElement(virtualComponent, DOMNode);
    };
    Factory.prototype.bindDOMComponent = function (virtualComponent, DOMNode) {
        this._externalUtils.bindDOMElement(virtualComponent, DOMNode);
    };
    Factory.prototype.createFileObject = function (file) {
        return new FileObject(file);
    };
    Factory.prototype.fireEvent = function (eventName, params) {
        var parentDefinedControlProps = this._customControlProperties.parentDefinedControlProps;
        if (!CCFUtils.IsNullOrUndefined(parentDefinedControlProps) &&
            !CCFUtils.IsNullOrUndefined(parentDefinedControlProps.eventListeners)) {
            var index = -1;
            var listeners = parentDefinedControlProps.eventListeners;
            for (var iterator = 0; iterator < listeners.length; iterator++) {
                if (listeners[iterator].eventname === eventName) {
                    index = iterator;
                }
            }
            if (index !== -1) {
                var handlersPair = parentDefinedControlProps.eventListeners[index];
                for (var iterator in handlersPair.eventhandler) {
                    if (!CCFUtils.IsNullOrUndefined(handlersPair.eventhandler[iterator])) {
                        handlersPair.eventhandler[iterator](params);
                    }
                }
            }
        }
    };
    Factory.prototype.getControlDefaultMapping = function (dataType, attributes) {
        return retrieveDefaultManifestNameByDataType(dataType, attributes);
    };
    Factory.prototype.getPopupService = function () {
        return this._externalUtils.getPopupService();
    };
    Factory.prototype.requestRender = function (callback) {
        this._externalUtils.forceUpdate(callback);
    };
    Factory.prototype.unbindDOMComponent = function (componentId) {
        return this._externalUtils.unbindDOMComponent(componentId);
    };
    Factory.prototype.updateComponent = function (id, props) {
        this._externalUtils.updateComponent(id, props);
    };
    return Factory;
}());
export { Factory };
