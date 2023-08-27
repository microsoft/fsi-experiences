import * as CCFUtils from "./../CustomControlUtilityPointers";
import { instance as RootAppProxy } from "../../Utilities/RootAppProxy";
var Mode = (function () {
    function Mode(customControlProperties, _externalUtils, hostData) {
        this.hasFocus = true;
        this.isPreview = false;
        this.isAuthoringMode = false;
        this.isActive = false;
        this.isRead = false;
        this._customControlProperties = customControlProperties;
        var descriptor = customControlProperties ? customControlProperties.descriptor : null;
        this._modeData = customControlProperties ? customControlProperties.propBagData.modeData : null;
        this.allocatedWidth = CCFUtils.IsNullOrUndefined(hostData.allocatedWidth) ? -1 : hostData.allocatedWidth;
        this.allocatedHeight = CCFUtils.IsNullOrUndefined(hostData.allocatedHeight) ? -1 : hostData.allocatedHeight;
        this.trackContainerResize = hostData.trackResize;
        this.setFullScreen = hostData.updateFullscreen;
        this.isControlDisabled = descriptor ? descriptor.Disabled : false;
        this.isVisible = descriptor ? descriptor.Visible : true;
        this.label = descriptor ? (descriptor.ShowLabel ? descriptor.Label : "") : "";
        this.accessibilityLabel = descriptor ? (!descriptor.ShowLabel ? descriptor.Label : null) : null;
        this.isOffline = this._modeData.isOffline;
        this.isAuthoringMode = this._modeData.isAuthoringMode;
        this.isRead = !!this._modeData.isRead;
        this.fullPageParam =
            customControlProperties &&
                customControlProperties.descriptor &&
                customControlProperties.descriptor.FullPageParamers
                ? customControlProperties.descriptor.FullPageParamers
                : null;
        this.rowSpan = this._customControlProperties ? this._customControlProperties.rowSpan : 0;
        this.contextInfo = {
            entityTypeName: this._modeData && this._modeData.entityTypeName,
            entityId: this._modeData && this._modeData.entityId,
            entityRecordName: this._modeData && this._modeData.entityRecordName,
        };
    }
    Mode.prototype.setNotification = function (message, id) {
        if (message &&
            message.trim().length > 0 &&
            this.isVisible &&
            !this.isControlDisabled &&
            this._customControlProperties.descriptor.parentFieldSectionItem) {
            var baseControlName = this._customControlProperties.descriptor.parentFieldSectionItem;
            return this._customControlProperties.propBagMethods.mode.setNotification(message, id, this._customControlProperties.id, baseControlName, this._customControlProperties.contextToken, this._modeData.entityTypeName, this._modeData.entityId);
        }
        return false;
    };
    Mode.prototype.clearNotification = function (id) {
        if (this._customControlProperties.descriptor.parentFieldSectionItem) {
            var baseControlName = this._customControlProperties.descriptor.parentFieldSectionItem;
            return this._customControlProperties.propBagMethods.mode.clearNotification(this._customControlProperties.id, baseControlName, this._customControlProperties.contextToken, this._modeData.entityTypeName, this._modeData.entityId, id);
        }
        return false;
    };
    Mode.prototype.requestAlwaysRender = function (shouldAlwaysRender) {
        if (RootAppProxy.IsAvailable) {
            RootAppProxy.requestAlwaysRender(this._customControlProperties.id, shouldAlwaysRender);
        }
    };
    Mode.prototype.setControlState = function (state, globalSetting, pageLevel) {
        var personalizationConfig = this._customControlProperties.personalizationConfiguration;
        if (personalizationConfig) {
            if (globalSetting) {
                if (this._customControlProperties.manifest.CustomControlId) {
                    this._customControlProperties.actions.setGlobalControlPersonalization(this._customControlProperties.manifest.CustomControlId, state);
                }
                return;
            }
            if (personalizationConfig.areaType === "form") {
                this._customControlProperties.actions.setFieldControlPersonalization(personalizationConfig, state, pageLevel ? this._customControlProperties.id : null);
            }
            else if (personalizationConfig.areaType === "grid") {
                this._customControlProperties.actions.setGridControlPersonalization(personalizationConfig, state, pageLevel ? this._customControlProperties.id : null);
            }
            else if (personalizationConfig.areaType === "dashboard") {
                this._customControlProperties.actions.setDashboardControlPersonalization(personalizationConfig, state, pageLevel ? this._customControlProperties.id : null);
            }
            else if (pageLevel) {
                this._customControlProperties.actions.setGenericControlPersonalization(personalizationConfig.controlUniqueId, state, this._customControlProperties.id);
            }
        }
        return this._customControlProperties.propBagMethods.utils.setState(state);
    };
    Mode.prototype.blur = function () { };
    Mode.prototype.focus = function () { };
    return Mode;
}());
export { Mode };
