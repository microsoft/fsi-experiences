import { buildUniqueCustomControlId, buildTabIndexValue, buildTooltipValue, focusElementById, blurElementById, getHighContrastEnabled, } from "../../Utilities/CustomControlHelper";
var Accessibility = (function () {
    function Accessibility(customControlProperties) {
        this._customControlProperties = customControlProperties;
        this.assignedTabIndex = buildTabIndexValue(this._customControlProperties);
        this.assignedTooltip = buildTooltipValue(this._customControlProperties);
        this.accessibilityInternalData = { keyboardShortcuts: [] };
        this.isHighContrastEnabled = getHighContrastEnabled();
    }
    Accessibility.prototype.registerShortcut = function (keyCombination, shortcutHandler, isGlobal, areaName, shortcutDescription, srcElementId) {
        var keyboardShortcut = this._customControlProperties.actions.createKeyboardShortcut(keyCombination, shortcutHandler, isGlobal, areaName, shortcutDescription, srcElementId);
        this.accessibilityInternalData.keyboardShortcuts.push(keyboardShortcut);
    };
    Accessibility.prototype.getUniqueId = function (id) {
        return buildUniqueCustomControlId(this._customControlProperties, id);
    };
    Accessibility.prototype.focusElementById = function (id, isAbsoluteId) {
        focusElementById(this._customControlProperties, id, isAbsoluteId);
    };
    Accessibility.prototype.blurElementById = function (id, isAbsoluteId) {
        blurElementById(this._customControlProperties, id, isAbsoluteId);
    };
    return Accessibility;
}());
export { Accessibility };
