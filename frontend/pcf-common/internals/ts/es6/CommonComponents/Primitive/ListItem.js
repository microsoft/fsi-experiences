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
import * as AttributeName from "../Supplementary/Accessibility/Attributes/AttributeName";
import * as ReactFela from "react-fela";
import { ruleGen } from "./FelaConnectHelper";
var InnerListItem = (function (_super) {
    __extends(InnerListItem, _super);
    function InnerListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerListItem.prototype._handleSelected = function (component) {
        if (this.props.onSelected) {
            this.props.onSelected(component);
        }
    };
    InnerListItem.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.isSelected && nextProps.isSelected !== this.props.isSelected) {
            this._handleSelected(this);
        }
    };
    InnerListItem.prototype.getElementName = function () {
        return "li";
    };
    InnerListItem.prototype.getElementProps = function () {
        var _a;
        var props = (_a = {},
            _a[AttributeName.ARIA_SELECTED] = this.props.isSelected,
            _a["data-text"] = this.props.dataText,
            _a["data-value"] = this.props.dataValue,
            _a["data-expanded"] = this.props.dataExpanded,
            _a);
        return props;
    };
    InnerListItem.displayName = "ListItem";
    return InnerListItem;
}(ComponentBase));
function listItemRuleGen(props) {
    if (props && props.style) {
        if (props.isSelected && props.selectedStyle) {
            return Object.assign({}, Object.assign({}, props.style, props.selectedStyle), ruleGen(props));
        }
        return Object.assign(props.style, ruleGen(props));
    }
    return {};
}
var rules = function (props) {
    return { rule: listItemRuleGen(props) };
};
var ListItem = ReactFela.connect(rules)(InnerListItem);
export { InnerListItem, ListItem };
