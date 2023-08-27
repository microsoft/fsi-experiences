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
var InnerTableCell = (function (_super) {
    __extends(InnerTableCell, _super);
    function InnerTableCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerTableCell.prototype.getElementName = function () {
        return "td";
    };
    InnerTableCell.prototype.getElementProps = function () {
        var props = {};
        if (this.props.colSpan)
            props.colSpan = this.props.colSpan;
        if (this.props.rowSpan)
            props.rowSpan = this.props.rowSpan;
        if (this.props.scope)
            props.scope = this.props.scope;
        return props;
    };
    InnerTableCell.displayName = "TableCell";
    return InnerTableCell;
}(ComponentBase));
var TableCell = ReactFela.connect(rules)(InnerTableCell);
export { InnerTableCell, TableCell };
