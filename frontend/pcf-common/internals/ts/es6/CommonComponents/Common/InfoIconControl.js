import * as React from "react";
import { View } from "../Primitive/View";
import { Tooltip } from "../Common/Tooltip";
import { MicrosoftIconSymbol } from "../FontIcon/MicrosoftIconSymbol";
import { MicrosoftIcon } from "../FontIcon/MicrosoftIcon";
var INFO_LABEL = "Information";
function getStyle(props) {
    var DEFAULT_STYLES = {
        display: "inline-flex",
        width: 16,
        height: 16,
        backgroundColor: "#3da3ff",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    };
    return Object.assign(DEFAULT_STYLES, props.style);
}
function getInfoSymbolStyle(props) {
    var DEFAULT_INFO_SYMBOL_STYLE = {
        color: "#fff",
        fontFamily: "Dyn CRM Symbol, Segoe MDL2 Assets",
        fontSize: "12px",
    };
    return Object.assign({}, DEFAULT_INFO_SYMBOL_STYLE, props.infoSymbolStyle);
}
function InfoIconControl(props) {
    return (React.createElement(Tooltip, { text: props.infoMessage, accessibilityHidden: props.accessibilityHidden },
        React.createElement(View, { style: getStyle(props), accessibilityLabel: INFO_LABEL },
            React.createElement(MicrosoftIcon, { type: MicrosoftIconSymbol.InformationIcon, style: getInfoSymbolStyle(props) }))));
}
export { InfoIconControl };
