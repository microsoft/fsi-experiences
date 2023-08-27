function ruleGen(props) {
    if (props.style) {
        Object.assign(props.style, transformStyle(props.style));
        return props.style;
    }
    return {};
}
function transformFlex(flex) {
    var val = Number(flex);
    return isNaN(val) ? flex : val;
}
function transformStyle(style) {
    if (!style) {
        return {};
    }
    var cssStyle = {};
    if (style.borderBottomWidth != null)
        cssStyle.borderBottomWidth = transformSizeProp(style.borderBottomWidth);
    if (style.borderLeftWidth != null)
        cssStyle.borderLeftWidth = transformSizeProp(style.borderLeftWidth);
    if (style.borderRightWidth != null)
        cssStyle.borderRightWidth = transformSizeProp(style.borderRightWidth);
    if (style.borderTopWidth != null)
        cssStyle.borderTopWidth = transformSizeProp(style.borderTopWidth);
    if (style.borderWidth != null)
        cssStyle.borderWidth = transformSizeProp(style.borderWidth);
    if (style.height != null)
        cssStyle.height = transformSizeProp(style.height);
    if (style.width != null)
        cssStyle.width = transformSizeProp(style.width);
    if (style.minWidth != null)
        cssStyle.minWidth = transformSizeProp(style.minWidth);
    if (style.minHeight != null)
        cssStyle.minHeight = transformSizeProp(style.minHeight);
    if (style.maxWidth != null)
        cssStyle.maxWidth = transformSizeProp(style.maxWidth);
    if (style.maxHeight != null)
        cssStyle.maxHeight = transformSizeProp(style.maxHeight);
    if (style.margin != null)
        cssStyle.margin = transformSizeProp(style.margin);
    if (style.marginBottom != null)
        cssStyle.marginBottom = transformSizeProp(style.marginBottom);
    if (style.marginLeft != null)
        cssStyle.marginLeft = transformSizeProp(style.marginLeft);
    if (style.marginRight != null)
        cssStyle.marginRight = transformSizeProp(style.marginRight);
    if (style.marginTop != null)
        cssStyle.marginTop = transformSizeProp(style.marginTop);
    if (style.padding != null)
        cssStyle.padding = transformSizeProp(style.padding);
    if (style.paddingBottom != null)
        cssStyle.paddingBottom = transformSizeProp(style.paddingBottom);
    if (style.paddingLeft != null)
        cssStyle.paddingLeft = transformSizeProp(style.paddingLeft);
    if (style.paddingRight != null)
        cssStyle.paddingRight = transformSizeProp(style.paddingRight);
    if (style.paddingTop != null)
        cssStyle.paddingTop = transformSizeProp(style.paddingTop);
    if (style.position != null)
        cssStyle.position = transformSizeProp(style.position);
    if (style.bottom != null)
        cssStyle.bottom = transformSizeProp(style.bottom);
    if (style.right != null)
        cssStyle.right = transformSizeProp(style.right);
    if (style.top != null)
        cssStyle.top = transformSizeProp(style.top);
    if (style.left != null)
        cssStyle.left = transformSizeProp(style.left);
    if (style.flex != null)
        cssStyle.flex = transformFlex(style.flex);
    if (style.animationDirection != null)
        cssStyle.animationDirection = style.animationDirection;
    if (style.animationDuration != null)
        cssStyle.animationDuration = style.animationDuration;
    if (style.animationFillMode != null)
        cssStyle.animationFillMode = style.animationFillMode;
    if (style.animationIterationCount != null)
        cssStyle.animationIterationCount = style.animationIterationCount;
    if (style.animationName != null)
        cssStyle.animationName = style.animationName;
    if (style.backgroundColor != null)
        cssStyle.backgroundColor = style.backgroundColor;
    return cssStyle;
}
function transformSizeProp(widthRelatedProp) {
    var newWidthProps = typeof widthRelatedProp === "number" ? widthRelatedProp.toString() + "px" : widthRelatedProp;
    return newWidthProps;
}
var rules = function (props) {
    return { rule: ruleGen(props) };
};
export { ruleGen, rules };
