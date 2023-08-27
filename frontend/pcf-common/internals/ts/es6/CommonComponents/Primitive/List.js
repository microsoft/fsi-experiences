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
import { applyIFlexboxContainerProp, getCssClassName as getIFlexboxContainerCssClassName, } from "./IFlexboxContainerStyle";
import { ComponentBase } from "./ComponentBase";
import * as AttributeName from "../Supplementary/Accessibility/Attributes/AttributeName";
import * as AriaLive from "../Supplementary/Accessibility/Attributes/AriaLive";
import * as ReactFela from "react-fela";
import { rules } from "./FelaConnectHelper";
var InnerList = (function (_super) {
    __extends(InnerList, _super);
    function InnerList(props) {
        var _this = _super.call(this, props) || this;
        _this.refCallbackTrigger = _this.refCallbackTrigger.bind(_this);
        return _this;
    }
    InnerList.prototype.getElementName = function () {
        return "ul";
    };
    InnerList.prototype.getFlexClassName = function (style) {
        return getIFlexboxContainerCssClassName(style ? style.display : null);
    };
    InnerList.prototype.getElementProps = function () {
        var options = {
            ref: this.props.refCallback ? this.refCallbackTrigger : null,
        };
        if (this.props.announceAccessibilityNotification === true) {
            options[AttributeName.ARIA_LIVE] = this.props.notificationType || AriaLive.POLITE;
        }
        return options;
    };
    InnerList.prototype.getElementStyle = function () {
        if (this.props.style) {
            return Object.assign({}, applyIFlexboxContainerProp(this.props.style));
        }
    };
    InnerList.displayName = "List";
    return InnerList;
}(ComponentBase));
var List = ReactFela.connect(rules)(InnerList);
export { InnerList, List };
