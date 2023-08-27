/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
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
import * as React from 'react';
import { createTheme } from '@fluentui/react/lib/Styling';
import { Customizer, merge } from '@fluentui/react/lib/Utilities';
import * as Themes from '../utilities/themes';
import { BusinessAppStyles } from './BusinessAppStyles';
import { icons } from './Icons';
export { BusinessAppStyles } from './BusinessAppStyles';
export { TeamsStyles } from './TeamsStyles';
export { FabricDarkStyles } from './FabricDarkStyles';
var Styler = (function (_super) {
    __extends(Styler, _super);
    function Styler(props) {
        var _this = _super.call(this, props) || this;
        _this.render = function () {
            var _a = _this.props, children = _a.children, theme = _a.theme, themeOverrides = _a.themeOverrides, scopedSettings = _a.scopedSettings;
            var mergedThemeOptions = merge(theme, themeOverrides);
            var mergedScopedSettings = merge(BusinessAppStyles, scopedSettings);
            var customizations = {
                settings: { theme: createTheme(mergedThemeOptions) },
                scopedSettings: mergedScopedSettings
            };
            return React.createElement(Customizer, __assign({}, customizations), children);
        };
        var _a = _this.props, iconSubset = _a.iconSubset, iconOptions = _a.iconOptions;
        icons(iconSubset, iconOptions);
        return _this;
    }
    Styler.defaultProps = {
        theme: Themes.DefaultTheme,
        themeOverrides: {}
    };
    return Styler;
}(React.Component));
export { Styler };
