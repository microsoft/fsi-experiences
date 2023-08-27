import * as React from "react";
import { View } from "../Primitive/View";
import { Tooltip } from "../Common/Tooltip";
import { MicrosoftIconSymbol } from "../FontIcon/MicrosoftIconSymbol";
import { MicrosoftIcon } from "../FontIcon/MicrosoftIcon";
var WARNING_LABEL = "Warning";
function getStyle(props) {
    var DEFAULT_STYLES = {
        display: "inline-flex",
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    };
    return Object.assign(DEFAULT_STYLES, props.style);
}
function getWarningSymbolStyle(props) {
    var DEFAULT_WARNING_SYMBOL_STYLE = {
        color: "#b22912",
        fontFamily: "Dyn CRM Symbol, Segoe MDL2 Assets",
        fontSize: "16px",
    };
    return Object.assign({}, DEFAULT_WARNING_SYMBOL_STYLE, props.warningSymbolStyle);
}
function WarningIconControl(props) {
    return (React.createElement(Tooltip, { text: props.warningMessage },
        React.createElement(View, { style: getStyle(props), accessibilityLabel: WARNING_LABEL },
            React.createElement(MicrosoftIcon, { type: MicrosoftIconSymbol.Warning, style: getWarningSymbolStyle(props) }))));
}
export { WarningIconControl };
