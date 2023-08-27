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
import { View } from "../Primitive/View";
import { ClientContext } from "../../CustomControls/Utilities/Contexts";
var PresenceIndicatorSize;
(function (PresenceIndicatorSize) {
    PresenceIndicatorSize[PresenceIndicatorSize["Default"] = 0] = "Default";
    PresenceIndicatorSize[PresenceIndicatorSize["Small"] = 1] = "Small";
    PresenceIndicatorSize[PresenceIndicatorSize["Medium"] = 2] = "Medium";
    PresenceIndicatorSize[PresenceIndicatorSize["Large"] = 3] = "Large";
})(PresenceIndicatorSize || (PresenceIndicatorSize = {}));
var PresenceTarget;
(function (PresenceTarget) {
    PresenceTarget[PresenceTarget["None"] = 0] = "None";
    PresenceTarget[PresenceTarget["Lookup"] = 1] = "Lookup";
    PresenceTarget[PresenceTarget["Grid"] = 2] = "Grid";
})(PresenceTarget || (PresenceTarget = {}));
var PresenceIndicator = (function (_super) {
    __extends(PresenceIndicator, _super);
    function PresenceIndicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._renderPresence = false;
        return _this;
    }
    PresenceIndicator.prototype._addPresenceInformation = function () {
        var displaySize = this.props.displaySize ? this.props.displaySize : PresenceIndicatorSize.Default;
        var presenceTarget = this.props.presenceTarget ? this.props.presenceTarget : PresenceTarget.None;
        this._presenceInstance = new this._skypeChannelContext.SkypeChannelClient.Presence(this._presenceId, this.props.sipUrl, this.props.entityReference, displaySize, this.props.parentControlId, this.props.accessibilityLabel, presenceTarget);
        this._presenceInstance.buildPresence();
    };
    PresenceIndicator.prototype.componentDidMount = function () {
        if (this._renderPresence) {
            this._addPresenceInformation();
        }
    };
    PresenceIndicator.prototype.componentWillUnmount = function () {
        if (this._presenceInstance) {
            this._presenceInstance.close();
            this._presenceInstance = null;
        }
    };
    PresenceIndicator.prototype._isSkypeChannelAvailable = function () {
        this._skypeChannelContext = this.context ? this.context.SkypeChannel : undefined;
        return this._skypeChannelContext !== undefined;
    };
    PresenceIndicator.prototype._isPropsAvailable = function () {
        if (this.props.sipUrl) {
            return true;
        }
        return (this.props.entityReference &&
            this._skypeChannelContext.SkypeChannelClient.PresenceInformation &&
            this._skypeChannelContext.SkypeChannelClient.PresenceInformation.isPresenceEnabledEntity(this.props.entityReference.entityName));
    };
    PresenceIndicator.prototype.render = function () {
        this._presenceId = this.props.id ? this.props.id : this.props.parentControlId + "_presence";
        this._renderPresence = this._isSkypeChannelAvailable() && this._isPropsAvailable();
        return this._renderPresence ? React.createElement(View, { id: this._presenceId, style: this.props.style }) : null;
    };
    PresenceIndicator.displayName = "PresenceIndicator";
    return PresenceIndicator;
}(React.Component));
PresenceIndicator.contextType = ClientContext;
export { PresenceIndicatorSize, PresenceTarget, PresenceIndicator };
