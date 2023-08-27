function applyIFlexboxContainerProp(style) {
    if (!style) {
        return null;
    }
    var cssStyle = {};
    cssStyle.display = style.display ? style.display : "flex";
    return cssStyle;
}
function getCssClassName(display) {
    if (display && (display === "flex" || display === "inlineflexbox")) {
        return display === "flex" ? "flexbox" : "inlineflexbox";
    }
    return "";
}
export { applyIFlexboxContainerProp, getCssClassName };
