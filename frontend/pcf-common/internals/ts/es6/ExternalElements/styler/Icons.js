/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
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
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { registerIcons } from '@fluentui/react/lib/Styling';
export var BAFIcons = {};
export var BAFIconOptions = {};
export var icons = function (iconSubset, iconOptions) {
    registerIcons(iconSubset ? { icons: __assign(__assign({}, BAFIcons), iconSubset) } : { icons: BAFIcons }, iconOptions ? __assign(__assign({}, BAFIconOptions), iconOptions) : BAFIconOptions);
    initializeIcons();
};
