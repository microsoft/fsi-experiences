import { instance as XrmProxy } from "../../Utilities/XrmProxy";
import { OPT_OUT_CONTROLS } from "./PreventUnnecessaryRendersOptOutControls";
export function canPreventUnnecessaryRenders(controlName, solutionVersion) {
    var _a, _b;
    var preventUnnecessaryRenders = (_b = (_a = XrmProxy === null || XrmProxy === void 0 ? void 0 : XrmProxy.Utils) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled) === null || _b === void 0 ? void 0 : _b.call(_a, "PCF.PreventUnnecessaryRenders");
    if (preventUnnecessaryRenders) {
        if (!OPT_OUT_CONTROLS.hasOwnProperty(controlName)) {
            return true;
        }
        var fixedVersion = OPT_OUT_CONTROLS[controlName];
        if (solutionVersion && fixedVersion && _isVersionAtLeast(solutionVersion, fixedVersion)) {
            return true;
        }
    }
    return false;
}
function _isVersionAtLeast(version, minimum) {
    var versionParts = version.split(".");
    var minimumParts = minimum.split(".");
    for (var i = 0; i < versionParts.length; i++) {
        var versionPart = +(versionParts[i] || 0);
        var minimumPart = +(minimumParts[i] || 0);
        if (versionPart > minimumPart) {
            return true;
        }
        else if (versionPart < minimumPart) {
            return false;
        }
    }
    return true;
}
