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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { findMax } from "./ArrayHelper";
import * as platformLibraryVersions from "../../resources/PlatformLibraryVersions.json";
export var getLatestPlatformLibrariesData = function () {
    var libNames = Object.keys(platformLibraryVersions);
    return libNames.map(function (libName) { return (__assign({ libName: libName }, findMax(platformLibraryVersions["" + libName], function (l1, l2) { return l1.order - l2.order; }))); });
};
export var getAllPlatformLibrariesData = function () {
    var libNames = Object.keys(platformLibraryVersions);
    return libNames.reduce(function (arr, libName) {
        var supportedLibraryVersions = platformLibraryVersions["" + libName].map(function (libVersion) { return (__assign({ libName: libName }, libVersion)); });
        return __spreadArray(__spreadArray([], arr, true), supportedLibraryVersions, true);
    }, []);
};
export var getMatchingPlatformLibraryData = function (libName, libVersion) {
    var supportedVersions = platformLibraryVersions["" + libName];
    if (!(supportedVersions === null || supportedVersions === void 0 ? void 0 : supportedVersions.length) || !libVersion) {
        return undefined;
    }
    var libVersionArr = toVersionArray(libVersion);
    return supportedVersions.find(function (supportedVersion) {
        return compareVersions(libVersionArr, toVersionArray(supportedVersion.minVersion)) >= 0 &&
            compareVersions(libVersionArr, toVersionArray(supportedVersion.maxVersion)) <= 0;
    });
};
var toVersionArray = function (version) {
    return version.split(".").map(function (v) {
        var num = Number(v.trim());
        return isNaN(num) ? -1 : num;
    });
};
var compareVersions = function (versionA, versionB) {
    var _a, _b;
    for (var i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        var aval = (_a = versionA[i]) !== null && _a !== void 0 ? _a : 0;
        var bval = (_b = versionB[i]) !== null && _b !== void 0 ? _b : 0;
        var diff = aval - bval;
        if (diff) {
            return diff;
        }
    }
    return 0;
};
