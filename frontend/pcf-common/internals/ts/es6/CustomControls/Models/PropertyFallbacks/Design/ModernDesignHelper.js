import { webLightTheme } from "@fluentui/react-theme/lib/themes/web/lightTheme";
import { brandWeb } from "@fluentui/react-theme/lib/global/brandColors";
import { createLightTheme } from "@fluentui/react-theme/lib/utils/createLightTheme";
import { FluentProvider } from "@fluentui/react-provider/lib/FluentProvider";
import { ThemeProvider } from "@fluentui/react/lib/utilities/ThemeProvider/ThemeProvider";
import { createv8Theme } from "./BackCompatTools";
import * as React from "react";
import { loadTheme } from "@fluentui/react";
var COLOR_TOKEN_KEYS = [
    "colorNeutralForeground1",
    "colorNeutralForeground1Hover",
    "colorNeutralForeground1Pressed",
    "colorNeutralForeground1Selected",
    "colorNeutralForeground2",
    "colorNeutralForeground2Hover",
    "colorNeutralForeground2Pressed",
    "colorNeutralForeground2Selected",
    "colorNeutralForeground2BrandHover",
    "colorNeutralForeground2BrandPressed",
    "colorNeutralForeground2BrandSelected",
    "colorNeutralForeground3",
    "colorNeutralForeground3Hover",
    "colorNeutralForeground3Pressed",
    "colorNeutralForeground3Selected",
    "colorNeutralForeground3BrandHover",
    "colorNeutralForeground3BrandPressed",
    "colorNeutralForeground3BrandSelected",
    "colorNeutralForeground4",
    "colorNeutralForegroundDisabled",
    "colorNeutralForegroundInvertedDisabled",
    "colorBrandForegroundLink",
    "colorBrandForegroundLinkHover",
    "colorBrandForegroundLinkPressed",
    "colorBrandForegroundLinkSelected",
    "colorCompoundBrandForeground1",
    "colorCompoundBrandForeground1Hover",
    "colorCompoundBrandForeground1Pressed",
    "colorBrandForeground1",
    "colorBrandForeground2",
    "colorNeutralForeground1Static",
    "colorNeutralForegroundInverted",
    "colorNeutralForegroundInvertedHover",
    "colorNeutralForegroundInvertedPressed",
    "colorNeutralForegroundInvertedSelected",
    "colorNeutralForegroundOnBrand",
    "colorNeutralForegroundInvertedLink",
    "colorNeutralForegroundInvertedLinkHover",
    "colorNeutralForegroundInvertedLinkPressed",
    "colorNeutralForegroundInvertedLinkSelected",
    "colorBrandForegroundInverted",
    "colorBrandForegroundInvertedHover",
    "colorBrandForegroundInvertedPressed",
    "colorBrandForegroundOnLight",
    "colorBrandForegroundOnLightHover",
    "colorBrandForegroundOnLightPressed",
    "colorBrandForegroundOnLightSelected",
    "colorNeutralBackground1",
    "colorNeutralBackground1Hover",
    "colorNeutralBackground1Pressed",
    "colorNeutralBackground1Selected",
    "colorNeutralBackground2",
    "colorNeutralBackground2Hover",
    "colorNeutralBackground2Pressed",
    "colorNeutralBackground2Selected",
    "colorNeutralBackground3",
    "colorNeutralBackground3Hover",
    "colorNeutralBackground3Pressed",
    "colorNeutralBackground3Selected",
    "colorNeutralBackground4",
    "colorNeutralBackground4Hover",
    "colorNeutralBackground4Pressed",
    "colorNeutralBackground4Selected",
    "colorNeutralBackground5",
    "colorNeutralBackground5Hover",
    "colorNeutralBackground5Pressed",
    "colorNeutralBackground5Selected",
    "colorNeutralBackground6",
    "colorNeutralBackgroundInverted",
    "colorSubtleBackground",
    "colorSubtleBackgroundHover",
    "colorSubtleBackgroundPressed",
    "colorSubtleBackgroundSelected",
    "colorSubtleBackgroundLightAlphaHover",
    "colorSubtleBackgroundLightAlphaPressed",
    "colorSubtleBackgroundLightAlphaSelected",
    "colorSubtleBackgroundInverted",
    "colorSubtleBackgroundInvertedHover",
    "colorSubtleBackgroundInvertedPressed",
    "colorSubtleBackgroundInvertedSelected",
    "colorTransparentBackground",
    "colorTransparentBackgroundHover",
    "colorTransparentBackgroundPressed",
    "colorTransparentBackgroundSelected",
    "colorNeutralBackgroundDisabled",
    "colorNeutralBackgroundInvertedDisabled",
    "colorNeutralStencil1",
    "colorNeutralStencil2",
    "colorBrandBackground",
    "colorBrandBackgroundHover",
    "colorBrandBackgroundPressed",
    "colorBrandBackgroundSelected",
    "colorCompoundBrandBackground",
    "colorCompoundBrandBackgroundHover",
    "colorCompoundBrandBackgroundPressed",
    "colorBrandBackgroundStatic",
    "colorBrandBackground2",
    "colorBrandBackgroundInverted",
    "colorBrandBackgroundInvertedHover",
    "colorBrandBackgroundInvertedPressed",
    "colorBrandBackgroundInvertedSelected",
    "colorNeutralStrokeAccessible",
    "colorNeutralStrokeAccessibleHover",
    "colorNeutralStrokeAccessiblePressed",
    "colorNeutralStrokeAccessibleSelected",
    "colorNeutralStroke1",
    "colorNeutralStroke1Hover",
    "colorNeutralStroke1Pressed",
    "colorNeutralStroke1Selected",
    "colorNeutralStroke2",
    "colorNeutralStroke3",
    "colorNeutralStrokeOnBrand",
    "colorNeutralStrokeOnBrand2",
    "colorNeutralStrokeOnBrand2Hover",
    "colorNeutralStrokeOnBrand2Pressed",
    "colorNeutralStrokeOnBrand2Selected",
    "colorBrandStroke1",
    "colorBrandStroke2",
    "colorCompoundBrandStroke",
    "colorCompoundBrandStrokeHover",
    "colorCompoundBrandStrokePressed",
    "colorNeutralStrokeDisabled",
    "colorNeutralStrokeInvertedDisabled",
    "colorTransparentStroke",
    "colorTransparentStrokeInteractive",
    "colorTransparentStrokeDisabled",
    "colorStrokeFocus1",
    "colorStrokeFocus2",
    "colorNeutralShadowAmbient",
    "colorNeutralShadowKey",
    "colorNeutralShadowAmbientLighter",
    "colorNeutralShadowKeyLighter",
    "colorNeutralShadowAmbientDarker",
    "colorNeutralShadowKeyDarker",
    "colorBrandShadowAmbient",
    "colorBrandShadowKey",
];
export var DEFAULT_DESIGN_BAG = generateTruncatedDesignBag(webLightTheme);
export function generateTruncatedDesignBag(fullTheme) {
    var newTheme = {};
    for (var _i = 0, COLOR_TOKEN_KEYS_1 = COLOR_TOKEN_KEYS; _i < COLOR_TOKEN_KEYS_1.length; _i++) {
        var key = COLOR_TOKEN_KEYS_1[_i];
        newTheme[key] = fullTheme[key];
    }
    return newTheme;
}
var THEME_LOADED = false;
export function wrapElementInProviders(element, theme, brandVariants) {
    brandVariants = Object.assign({}, brandWeb, brandVariants);
    theme = Object.assign({}, createLightTheme(brandVariants), theme);
    var v8Theme = createv8Theme(brandVariants, theme);
    if (!THEME_LOADED) {
        loadTheme(v8Theme);
        THEME_LOADED = true;
    }
    return (React.createElement(FluentProvider, { theme: theme, style: { top: 0, left: 0, right: 0, bottom: 0, position: "absolute", display: "flex", visibility: "hidden" } },
        React.createElement(ThemeProvider, { style: { width: "100%", height: "100%", visibility: "hidden" }, theme: v8Theme },
            element,
            ";")));
}
