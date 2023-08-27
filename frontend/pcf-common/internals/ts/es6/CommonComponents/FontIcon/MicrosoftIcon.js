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
import { FontIcon } from "../Primitive/FontIcon";
import { getSymbolMapping } from "./MicrosoftIconSymbol";
import * as ReactFela from "react-fela";
import { rules } from "../Primitive/FelaConnectHelper";
var InnerMicrosoftIcon = (function (_super) {
    __extends(InnerMicrosoftIcon, _super);
    function InnerMicrosoftIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerMicrosoftIcon.prototype.getSymbolClassName = function (type) {
        return getSymbolMapping(type);
    };
    return InnerMicrosoftIcon;
}(FontIcon));
var IconPosition;
(function (IconPosition) {
    IconPosition[IconPosition["None"] = 0] = "None";
    IconPosition[IconPosition["Left"] = 1] = "Left";
    IconPosition[IconPosition["Top"] = 2] = "Top";
})(IconPosition || (IconPosition = {}));
var MicrosoftIcon = ReactFela.connect(rules)(InnerMicrosoftIcon);
export { InnerMicrosoftIcon, MicrosoftIcon, IconPosition };
