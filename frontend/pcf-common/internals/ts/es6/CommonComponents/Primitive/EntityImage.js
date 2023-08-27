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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import { ComponentBase } from "./ComponentBase";
import { View } from "./View";
import * as ReactFela from "react-fela";
import { ruleGen } from "./FelaConnectHelper";
import { PresenceIndicator } from "./PresenceIndicator";
import { guidV4String } from "../../CustomControls/Utilities/GuidHelper";
import { EntityIcon } from "../FontIcon/EntityIcon";
import { Svg } from "./Svg";
import { Image } from "./Image";
var UNIT_REGEX = /[0-9]*\.?[0-9]+(px|%|em|rem)?/i;
var HEALTH_RANGES = [
    {
        min: 1,
        max: 39,
        color: "#FF0000",
    },
    {
        min: 40,
        max: 59,
        color: "#FFBB00",
    },
    {
        min: 60,
        max: 100,
        color: "#00EE00",
    },
];
var Mode;
(function (Mode) {
    Mode[Mode["CustomImage"] = 0] = "CustomImage";
    Mode[Mode["Initials"] = 1] = "Initials";
    Mode[Mode["CustomEntityIcon"] = 2] = "CustomEntityIcon";
    Mode[Mode["DefaultEntityIcon"] = 3] = "DefaultEntityIcon";
})(Mode || (Mode = {}));
var InnerEntityImage = (function (_super) {
    __extends(InnerEntityImage, _super);
    function InnerEntityImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerEntityImage.getMode = function (props) {
        if (props.hasPrimaryImageField && props.imageSrc)
            return Mode.CustomImage;
        if (props.hasPrimaryImageField && props.entityPrimaryField)
            return Mode.Initials;
        if (props.customEntityIcon)
            return Mode.CustomEntityIcon;
        if (props.entityReference && props.entityReference.entityName)
            return Mode.DefaultEntityIcon;
    };
    InnerEntityImage.prototype._isCustomImageMode = function () {
        return InnerEntityImage.getMode(this.props) === Mode.CustomImage;
    };
    InnerEntityImage.prototype._isInitialsMode = function () {
        return InnerEntityImage.getMode(this.props) === Mode.Initials;
    };
    InnerEntityImage.prototype._isCustomEntityIconMode = function () {
        return InnerEntityImage.getMode(this.props) === Mode.CustomEntityIcon;
    };
    InnerEntityImage.prototype._isDefaultEntityIconMode = function () {
        return InnerEntityImage.getMode(this.props) === Mode.DefaultEntityIcon;
    };
    InnerEntityImage.prototype._renderHealthCircle = function (node) {
        var _this = this;
        var unit = UNIT_REGEX.exec(this.props.style.width + "")[1];
        var size = parseFloat(this.props.style.width + "");
        var scoreDeg = (this.props.entityHealthScore * 360) / 100;
        var style = {
            width: size + unit,
            height: size + unit,
            position: "relative",
            display: "block",
        };
        var pieStyle = {
            clip: "rect(0, " + (size + unit) + ", " + (size + unit) + ", " + (size / 2 + unit) + ")",
            height: "100%",
            width: "100%",
            left: "0",
            position: "absolute",
            top: "0",
        };
        var halfCircle = {
            clip: "rect(0, " + (size / 2 + unit) + ", " + (size + unit) + ", 0)",
            transform: "rotate(" + scoreDeg + "deg)",
            height: "100%",
            width: "100%",
            border: "4px solid transparent",
            borderRadius: "50%",
            left: "0",
            position: "absolute",
            top: "0",
            borderColor: "transparent",
            boxSizing: "border-box",
        };
        HEALTH_RANGES.forEach(function (range) {
            if (_this.props.entityHealthScore >= range.min && _this.props.entityHealthScore <= range.max) {
                halfCircle.borderColor = range.color;
            }
        });
        var leftCircle = Object.assign({}, halfCircle);
        var rightCircle = Object.assign({ display: "none" }, halfCircle);
        if (scoreDeg > 180) {
            pieStyle.clip = "rect(auto, auto, auto, auto)";
            leftCircle.transform = "rotate(180deg)";
            rightCircle.display = "block";
        }
        return (React.createElement(View, { style: style },
            node,
            React.createElement(View, { style: pieStyle },
                React.createElement(View, { style: leftCircle }),
                React.createElement(View, { style: rightCircle }))));
    };
    InnerEntityImage.prototype.getElementName = function () {
        return "span";
    };
    InnerEntityImage.prototype.getElementProps = function () {
        return {
            alt: this.props.alt ? this.props.alt : "",
        };
    };
    InnerEntityImage.prototype.getElementChildren = function () {
        if (this._isInitialsMode()) {
            return _getInitials(this.props.entityPrimaryField);
        }
        else if (this._isDefaultEntityIconMode()) {
            return React.createElement(EntityIcon, { type: this.props.entityReference.entityName, style: this.props.iconStyle });
        }
    };
    InnerEntityImage.prototype._renderEntityImageWithPresence = function (entityImage) {
        var id = "id_" + guidV4String();
        var positionStyle = {
            position: "relative",
        };
        var presenceIndicatorStyle = {
            right: "0px",
            bottom: "0px",
            position: "absolute",
        };
        var presenceIndicator = (React.createElement(PresenceIndicator, { key: id + "_presence", id: id + "_presence", parentControlId: id, style: presenceIndicatorStyle, entityReference: this.props.entityReference, sipUrl: this.props.sipUrl, displaySize: this.props.presenceIndicatorSize, accessibilityLabel: this.props.entityPrimaryField }));
        return (React.createElement(View, { id: id, style: positionStyle },
            entityImage,
            presenceIndicator));
    };
    InnerEntityImage.prototype.render = function () {
        var entityImage;
        if (this._isCustomImageMode() || this._isCustomEntityIconMode()) {
            if (_isBrowserIE()) {
                var svgProps = {
                    source: this._isCustomImageMode() ? this.props.imageSrc : this.props.customEntityIcon,
                    style: this.props.style,
                    fallbackToImage: true,
                    altText: this.props.alt,
                    title: this.props.title,
                };
                entityImage = React.createElement(Svg, __assign({}, svgProps));
            }
            else {
                var imageProps = {
                    source: this._isCustomImageMode() ? this.props.imageSrc : this.props.customEntityIcon,
                    style: this.props.style,
                    altText: this.props.alt,
                    title: this.props.title,
                };
                entityImage = React.createElement(Image, __assign({}, imageProps));
            }
        }
        else {
            var elementProps = this.getElementPropsInternal();
            var props = Object.assign({}, elementProps, {
                role: elementProps.role || "img",
                "aria-label": this.props.alt || "",
            });
            entityImage = React.createElement(this.getElementName(), props, this.getElementChildren());
        }
        if (this.props.wrapperStyle) {
            entityImage = React.createElement(View, { style: this.props.wrapperStyle }, entityImage);
        }
        if (this.props.entityHealthScore) {
            entityImage = this._renderHealthCircle(entityImage);
        }
        if (this.props.entityReference || this.props.sipUrl) {
            entityImage = this._renderEntityImageWithPresence(entityImage);
        }
        return entityImage;
    };
    InnerEntityImage.displayName = "EntityImage";
    InnerEntityImage.backgroundColors = [
        "#005C62",
        "#358717",
        "#725A0D",
        "#A42B1A",
        "#652F4E",
        "#6A1E7A",
        "#315FA2",
    ];
    return InnerEntityImage;
}(ComponentBase));
function entityImageRuleGen(props) {
    if (props && props.style) {
        if (!props.style.backgroundColor &&
            (InnerEntityImage.getMode(props) === Mode.Initials || InnerEntityImage.getMode(props) === Mode.DefaultEntityIcon)) {
            var backgroundColor = InnerEntityImage.backgroundColors[0];
            if (props.entityPrimaryField) {
                var s = 0;
                for (var k = props.entityPrimaryField.length - 1; k >= 0; k--) {
                    var o = props.entityPrimaryField.charCodeAt(k);
                    var e = k % 8;
                    s ^= (o << e) + (o >> (8 - e));
                }
                backgroundColor = InnerEntityImage.backgroundColors[s % InnerEntityImage.backgroundColors.length];
            }
            return Object.assign({ backgroundColor: backgroundColor }, ruleGen(props));
        }
        return Object.assign(props.style, ruleGen(props));
    }
    return {};
}
var rules = function (props) {
    return { rule: entityImageRuleGen(props) };
};
var EntityImage = ReactFela.connect(rules)(InnerEntityImage);
function _isBrowserIE() {
    return !!window.navigator.userAgent.match("MSIE") || !!window.navigator.userAgent.match("Trident");
}
function _getInitials(fullname) {
    var initials = "";
    if (fullname) {
        for (var nameParts = fullname.split(" "), i = 0; i < nameParts.length && initials.length < 2; i++) {
            if (nameParts[i].length > 0) {
                var chr = nameParts[i].charCodeAt(0);
                if ((chr >= 97 && chr <= 122) || (chr >= 65 && chr <= 90)) {
                    initials += nameParts[i].charAt(0);
                }
                else {
                    initials += nameParts[i].charAt(0);
                    break;
                }
            }
        }
        if (initials.length <= 1) {
            initials = "";
            for (var j = 0; j < fullname.length && initials.length < 2; j++) {
                var char = fullname.charCodeAt(j);
                if ((char >= 97 && char <= 122) || (char >= 65 && char <= 90)) {
                    initials += fullname.charAt(j);
                }
                else {
                    initials += fullname.charAt(j);
                    break;
                }
            }
        }
    }
    return initials;
}
export { Mode as EntityImageMode, InnerEntityImage, EntityImage };
