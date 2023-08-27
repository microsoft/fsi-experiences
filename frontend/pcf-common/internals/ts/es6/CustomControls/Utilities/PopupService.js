import * as React from "react";
import { Popup } from "../../CommonComponents/Primitive/Popup/Popup";
import { RootPopup } from "../../CommonComponents/Primitive/Popup/RootPopup";
var PopupService = (function () {
    function PopupService(host) {
        this._popups = {};
        this._host = host;
    }
    PopupService.prototype._getKeyName = function (name) {
        return {
            key: name,
        };
    };
    PopupService.prototype._createPopup = function (props) {
        return React.createElement(Popup, Object(Object.assign({}, props, this._getKeyName(props.name), {
            createAccessibilityComponent: props.disableAutoAccessibility
                ? null
                : this._host.props.actions.createAccessibilityComponent,
        })));
    };
    PopupService.prototype.createPopup = function (props) {
        if (props.name) {
            this._popups[props.name] = this._createPopup(props);
            this._host.forceUpdate();
        }
    };
    PopupService.prototype.openPopup = function (name) {
        if (name === void 0) { name = ""; }
        if (this._popups[name]) {
            var props = this._popups[name].props;
            this._popups[name] = this._createPopup(Object.assign({}, props, { popupToOpen: name }));
            this._host.forceUpdate();
        }
    };
    PopupService.prototype.closePopup = function (name) {
        if (name === void 0) { name = ""; }
        if (this._popups[name]) {
            var props = this._popups[name].props;
            this._popups[name] = this._createPopup(Object.assign({}, props, { popupToOpen: "" }));
            this._host.forceUpdate();
        }
    };
    PopupService.prototype.updatePopup = function (name, newProps) {
        if (name === void 0) { name = ""; }
        if (this._popups[name]) {
            var props = this._popups[name].props;
            this._popups[name] = this._createPopup(Object.assign({}, props, newProps));
            this._host.forceUpdate();
        }
    };
    PopupService.prototype.deletePopup = function (name) {
        if (name === void 0) { name = ""; }
        if (this._popups[name]) {
            delete this._popups[name];
            this._popupsId = undefined;
            this._host.forceUpdate();
        }
    };
    PopupService.prototype.getPopups = function () {
        var result = [];
        for (var key in this._popups) {
            result.push(this._popups[key]);
        }
        return result;
    };
    PopupService.prototype.setPopupsId = function (id) {
        this._popupsId = id;
    };
    PopupService.prototype.getPopupsId = function () {
        return this._popupsId;
    };
    PopupService.prototype.renderPopups = function () {
        var result = this.getPopups();
        var popupsId = this.getPopupsId();
        return result.length ? (React.createElement(RootPopup, { id: popupsId, parentCustomControlId: this._host.props.controlId, openPopup: this._host.props.actions.openPopup, closePopup: this._host.props.actions.closePopup, rootBodyElement: this._host.props.rootBodyElement, customZIndex: this._host.props.zIndexOverride, wrapElement: this._host.props.themePortalWrapper }, result)) : null;
    };
    return PopupService;
}());
export { PopupService };
