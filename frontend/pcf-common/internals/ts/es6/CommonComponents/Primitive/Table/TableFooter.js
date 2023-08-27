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
import { ComponentBase } from "../ComponentBase";
import * as ReactFela from "react-fela";
import { rules } from "../FelaConnectHelper";
var InnerTableFooter = (function (_super) {
    __extends(InnerTableFooter, _super);
    function InnerTableFooter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerTableFooter.prototype.getElementName = function () {
        return "tfoot";
    };
    InnerTableFooter.displayName = "TableFooter";
    return InnerTableFooter;
}(ComponentBase));
var TableFooter = ReactFela.connect(rules)(InnerTableFooter);
export { InnerTableFooter, TableFooter };
