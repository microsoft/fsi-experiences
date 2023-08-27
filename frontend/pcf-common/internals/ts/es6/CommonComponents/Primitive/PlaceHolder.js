import * as React from "react";
import { View } from "../Primitive/View";
import { Text } from "../Primitive/Text";
import { MicrosoftIcon } from "../FontIcon/MicrosoftIcon";
function getTextStyle(props) {
    var DEFAULT_TEXT_STYLE = {
        float: "left",
        fontSize: "16px",
        color: "#666666",
    };
    return Object.assign(DEFAULT_TEXT_STYLE, props.textStyle);
}
function getContainerStyle(props) {
    var DEFAULT_CONTAINER_STYLE = {
        width: "100%",
        height: "100%",
        textAlign: "center",
        minHeight: "7.5em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        flex: "1 1 auto",
    };
    return Object.assign(DEFAULT_CONTAINER_STYLE, props.containerStyle);
}
function getIconStyle(props) {
    var DEFAULT_SYMBOL_STYLE = {
        color: "#666666",
        fontFamily: "Dyn CRM Symbol, Segoe MDL2 Assets",
        fontSize: "2.5em",
        paddingBottom: "10px",
    };
    return Object.assign({}, DEFAULT_SYMBOL_STYLE, props.iconStyle);
}
function PlaceHolder(props) {
    return (React.createElement(View, { style: getContainerStyle(props), title: props.text },
        React.createElement(MicrosoftIcon, { type: props.icon, style: getIconStyle(props), accessibilityHidden: props.accessibilityHidden }),
        React.createElement(Text, { style: getTextStyle(props) }, props.text)));
}
export { PlaceHolder };
