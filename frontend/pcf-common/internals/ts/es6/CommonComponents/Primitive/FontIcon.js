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
import { ComponentBase } from "./ComponentBase";
import { instance as XrmProxy } from "../../CustomControls/Utilities/XrmProxy";
import { COMPONENT_NAME } from "../../CustomControls/Utilities/TelemetryManager";
var PRIMITIVE_COMPONENT_NAME = COMPONENT_NAME + ".Primitive.FontIcon";
var FontIcon = (function (_super) {
    __extends(FontIcon, _super);
    function FontIcon(props) {
        var _this = _super.call(this, props) || this;
        if (props && props.type === undefined) {
            var error = Error("FontIcon type property cannot be null");
            XrmProxy.Reporting.reportFailure(PRIMITIVE_COMPONENT_NAME, error);
        }
        return _this;
    }
    FontIcon.prototype.getElementName = function () {
        return "span";
    };
    FontIcon.prototype.getElementClassName = function () {
        var styleClasses = this.props.styles ? " " + this.props.styles.rule : "";
        return this.getSymbolClassName(this.props.type) + styleClasses;
    };
    FontIcon.displayName = "FontIcon";
    return FontIcon;
}(ComponentBase));
export { FontIcon };
