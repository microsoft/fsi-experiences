var InitialApiVersion = "1.1";
var apiVersionRegexStr = "^(\\d+)?\\.?(\\d+)?\\.?(\\d+)?$";
var OperationIsNotSupportedOnThisDevice = "PlatformErrorCodes.OperationIsNotSupportedOnThisDevice";
function modifyDeclaredFunctions(obj, manifest) {
    if (!obj ||
        !manifest ||
        !manifest.ApiVersion ||
        compareVersions(manifest.ApiVersion, InitialApiVersion) < 0 ||
        !obj.getDeclaredFeatures ||
        !obj.getFeatureClassName) {
        return;
    }
    var featureSupport = obj.getDeclaredFeatures();
    if (!featureSupport) {
        return;
    }
    var usesFeatures = manifest.Properties && manifest.Properties.FeatureUsage;
    var getFeatureState = function (featureName) {
        var feature = usesFeatures && usesFeatures.find(function (x) { return x.Name.toLowerCase() === featureName.toLowerCase(); });
        return feature ? (feature.IsRequired ? "required" : "optional") : "unspecified";
    };
    var className = obj.getFeatureClassName();
    var featureState = getFeatureState(className);
    var methodsState = getAllPublicMethodNames(obj)
        .filter(function (name) { return !featureSupport.featureList || featureSupport.featureList[name]; })
        .map(function (name) {
        return {
            name: name,
            featureState: featureSupport.featureList ? getFeatureState(className + "." + name) : featureState,
            versionStatus: getFeatureSupportState(featureSupport, name, manifest.ApiVersion),
        };
    });
    for (var _i = 0, methodsState_1 = methodsState; _i < methodsState_1.length; _i++) {
        var methodState = methodsState_1[_i];
        var methodSupport = featureSupport.featureList && featureSupport.featureList[methodState.name];
        var supportStatus = (methodSupport && methodSupport.supportStatus) ||
            (featureSupport.unspecifiedFeatureFallback && featureSupport.unspecifiedFeatureFallback.supportStatus) ||
            "unsupported";
        overrideMethod(obj, methodState.name, methodState.featureState, methodState.versionStatus, supportStatus);
    }
}
function getAllPublicMethodNames(obj) {
    var protectedMethods = ["constructor", "getFeatureClassName", "getDeclaredFeatures"];
    return Reflect.ownKeys(Reflect.getPrototypeOf(obj))
        .filter(function (x) { return typeof x === "string" && !x.startsWith("_") && protectedMethods.indexOf(x) === -1; })
        .map(function (x) { return x; });
}
function getFeatureSupportState(support, featureName, apiVersion) {
    var supportStatus = (support.featureList && support.featureList[featureName]) || support.unspecifiedFeatureFallback;
    if (!supportStatus || (!supportStatus.minApiVersion && !supportStatus.maxApiVersion)) {
        return "implemented";
    }
    var minApiCompare = supportStatus.minApiVersion && compareVersions(apiVersion, supportStatus.minApiVersion);
    var maxApiCompare = supportStatus.maxApiVersion && compareVersions(apiVersion, supportStatus.maxApiVersion);
    if (minApiCompare !== undefined) {
        if (isNaN(minApiCompare)) {
            return "unknown";
        }
        else if (minApiCompare < 0) {
            return "notimplemented";
        }
    }
    if (maxApiCompare !== undefined) {
        if (isNaN(maxApiCompare)) {
            return "unknown";
        }
        else if (maxApiCompare > 0) {
            return "deprecated";
        }
    }
    return "implemented";
}
function overrideMethod(obj, methodName, featureState, versionStatus, supportStatus) {
    if (versionStatus === "unknown") {
    }
    else if (versionStatus === "deprecated") {
        obj[methodName] = function () {
            throw new Error(getDeprecatedErrorMessage(obj, methodName));
        };
    }
    else if (versionStatus === "notimplemented") {
        obj[methodName] = function () {
            throw new Error(getNotImplementedErrorMessage(obj, methodName));
        };
    }
    else if (featureState === "unspecified") {
        obj[methodName] = function () {
            throw new Error(getUnspecifiedMethodErrorMessage(obj, methodName));
        };
    }
    else if (featureState === "required" && supportStatus === "unsupported") {
        obj[methodName] = function () {
            throw new Error(getRequiredUnsupportedErrorMessage(obj, methodName));
        };
    }
    else if (featureState === "optional" && supportStatus === "unsupported") {
        obj[methodName] = null;
    }
}
function getDeprecatedErrorMessage(obj, methodName) {
    return "Feature '" + obj.getFeatureClassName() + "." + methodName + "' has been deprecated.";
}
function getNotImplementedErrorMessage(obj, methodName) {
    return "Feature '" + obj.getFeatureClassName() + "." + methodName + "' not implemented in this version.";
}
function getUnspecifiedMethodErrorMessage(obj, methodName) {
    return "Feature '" + obj.getFeatureClassName() + "." + methodName + "' is required to be specified in the <uses-feature> section in ControlManifest.xml before use.";
}
function getRequiredUnsupportedErrorMessage(obj, methodName) {
    return "Required method '" + obj.getFeatureClassName() + "." + methodName + "' not supported on this device. Error code: " + OperationIsNotSupportedOnThisDevice;
}
function compareVersions(compareVer, baseVer) {
    var baseMatches = baseVer.match(apiVersionRegexStr);
    var compareMatches = compareVer.match(apiVersionRegexStr);
    if (!baseMatches || !compareMatches) {
        return Number.NaN;
    }
    for (var i = 1; i < 4; i++) {
        var baseVal = (baseMatches.length > i && parseInt(baseMatches[i], 10)) || 0;
        var compareVal = (compareMatches.length > i && parseInt(compareMatches[i], 10)) || 0;
        if (compareVal - baseVal !== 0) {
            return Math.min(Math.max(compareVal - baseVal, -1), 1);
        }
    }
    return 0;
}
function isValidApiVersionFormat(version) {
    if (!version) {
        return true;
    }
    var versionValues = version.match(apiVersionRegexStr);
    return !!versionValues && versionValues.length > 1;
}
export { modifyDeclaredFunctions, isValidApiVersionFormat, getDeprecatedErrorMessage, getNotImplementedErrorMessage, getUnspecifiedMethodErrorMessage, getRequiredUnsupportedErrorMessage, };
