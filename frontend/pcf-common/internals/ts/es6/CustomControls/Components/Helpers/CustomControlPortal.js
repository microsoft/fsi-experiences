var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
var CustomControlPortal = (function (_super) {
    __extends(CustomControlPortal, _super);
    function CustomControlPortal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            portals: new Map(),
        };
        return _this;
    }
    CustomControlPortal.prototype.bindDOMElement = function (newChildComponent, DOMNode, id, callback) {
        if (!DOMNode.isRemoveChildPatched) {
            var _removeChild_1 = DOMNode.removeChild;
            var onError_1 = this.props.onError;
            DOMNode.removeChild = function () {
                try {
                    return _removeChild_1.apply(this, arguments);
                }
                catch (e) {
                    if (e.name !== "NotFoundError" && e.name !== "HierarchyRequestError") {
                        onError_1 && onError_1(e);
                        throw e;
                    }
                }
            };
            DOMNode.isRemoveChildPatched = true;
        }
        this.setState(function (prevState) {
            var nextPortals = new Map(prevState.portals);
            nextPortals.set(DOMNode, { element: newChildComponent, id: id });
            return {
                portals: nextPortals,
            };
        }, callback);
    };
    CustomControlPortal.prototype.unbindDOMComponent = function (componentId, callback) {
        this.setState(function (prevState) {
            var nextPortals = new Map(prevState.portals);
            nextPortals.forEach(function (portal, key) {
                if (portal.id === componentId) {
                    nextPortals.delete(key);
                }
            });
            return {
                portals: nextPortals,
            };
        }, callback);
    };
    CustomControlPortal.prototype.componentDidCatch = function (error) {
        if (error.message !== "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.") {
            throw error;
        }
    };
    CustomControlPortal.prototype.render = function () {
        var _this = this;
        var portals = [];
        this.state.portals.forEach(function (portal, key) {
            portals.push(_this.props.renderReactSubtree(portal.element, key));
        });
        return portals;
    };
    return CustomControlPortal;
}(React.Component));
export { CustomControlPortal };
