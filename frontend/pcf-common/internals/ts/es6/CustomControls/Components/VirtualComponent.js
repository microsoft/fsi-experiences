var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
var VirtualComponent = (function () {
    function VirtualComponent(type, componentId, properties, children) {
        this.IsVirtualComponent = true;
        this._type = type;
        this._componentId = componentId;
        this._properties = Object.assign({}, properties);
        this._children = [];
        if (children != null) {
            if (typeof children === "string" ||
                typeof children === "number" ||
                children instanceof VirtualComponent ||
                React.isValidElement(children)) {
                this._children = children;
            }
            else if (children instanceof Array) {
                this._children = __spreadArray([], children.filter(function (x) {
                    return typeof x === "string" || typeof x === "number" || x instanceof VirtualComponent || React.isValidElement(x);
                }), true);
            }
        }
    }
    VirtualComponent.prototype.getVirtualRepresentation = function (additionalProps) {
        return new VirtualComponent(this._type, this._componentId, Object.assign(this._properties, additionalProps), null);
    };
    VirtualComponent.prototype.getType = function () {
        return this._type;
    };
    VirtualComponent.prototype.getComponentId = function () {
        return this._componentId;
    };
    VirtualComponent.prototype.getProperties = function () {
        return this._properties;
    };
    VirtualComponent.prototype.getChildren = function () {
        if (this._children instanceof Array) {
            return __spreadArray([], this._children, true);
        }
        return this._children;
    };
    VirtualComponent.prototype.setProperties = function (props) {
        Object.assign(this._properties, props);
    };
    VirtualComponent.createComponent = function (component, props) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        if (component === null || component === undefined) {
            throw new Error("Component is null or undefined");
        }
        var type;
        switch (component.constructor.name) {
            case "String":
                type = component;
                break;
            case "Number":
                type = "number";
                break;
            default:
                if (component.prototype.isReactComponent) {
                    type = component.name;
                    props = Object.assign({ ___ReactComponentType: component }, props);
                }
                else if (component.IsVirtualComponent) {
                    type = "VirtualComponent";
                }
                else {
                    throw new Error("Unsupported component type: " + component.constructor.name);
                }
                break;
        }
        return new VirtualComponent(type, props.id ? props.id : "", props, children);
    };
    return VirtualComponent;
}());
var wnd = window;
wnd.ComponentFramework = wnd.ComponentFramework || {};
wnd.ComponentFramework.createComponent = VirtualComponent.createComponent;
export { VirtualComponent };
