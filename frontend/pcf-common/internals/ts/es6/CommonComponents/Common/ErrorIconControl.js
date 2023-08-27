import * as React from "react";
import { View } from "../Primitive/View";
import { Tooltip } from "../Common/Tooltip";
import { MicrosoftIconSymbol } from "../FontIcon/MicrosoftIconSymbol";
import { MicrosoftIcon } from "../FontIcon/MicrosoftIcon";
var ERROR_LABEL = "Error";
function getStyle(props) {
    var DEFAULT_STYLES = {
        display: "inline-flex",
        width: 16,
        height: 16,
        backgroundColor: "#ff0000",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    };
    return Object.assign(DEFAULT_STYLES, props.style);
}
function getErrorSymbolStyle(props) {
    var DEFAULT_ERROR_SYMBOL_STYLE = {
        color: "#fff",
        fontFamily: "Dyn CRM Symbol, Segoe MDL2 Assets",
        fontSize: "12px",
    };
    return Object.assign({}, DEFAULT_ERROR_SYMBOL_STYLE, props.errorSymbolStyle);
}
function ErrorIconControl(props) {
    return (React.createElement(Tooltip, { text: props.errorMessage },
        React.createElement(View, { style: getStyle(props), accessibilityLabel: ERROR_LABEL },
            React.createElement(MicrosoftIcon, { type: MicrosoftIconSymbol.ErrorIcon, style: getErrorSymbolStyle(props) }))));
}
export { ErrorIconControl };
