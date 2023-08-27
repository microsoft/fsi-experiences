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
import * as ReactFela from "react-fela";
import { rules } from "./FelaConnectHelper";
var InnerHyperlink = (function (_super) {
    __extends(InnerHyperlink, _super);
    function InnerHyperlink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerHyperlink.prototype.getElementName = function () {
        return "a";
    };
    InnerHyperlink.prototype.getElementProps = function () {
        var returnObj = {
            href: this.props.href || "#",
            target: this.props.target,
        };
        if (this.props.download) {
            Object.assign(returnObj, { download: this.props.download });
        }
        return returnObj;
    };
    return InnerHyperlink;
}(ComponentBase));
var Hyperlink = ReactFela.connect(rules)(InnerHyperlink);
export { InnerHyperlink, Hyperlink };
