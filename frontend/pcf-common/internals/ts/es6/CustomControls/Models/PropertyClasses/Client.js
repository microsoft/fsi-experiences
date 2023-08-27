import * as CCFUtils from "./../CustomControlUtilityPointers";
import { GenerateDefaultFormattingData } from "./Formatting";
import { GenerateDefaultUtilityData } from "./Utility";
var Client = (function () {
    function Client(customControlProperties, externalUtils) {
        this._externalUtils = externalUtils;
        this._customControlProperties = customControlProperties;
        this._xrmProxy = externalUtils.xrmProxy;
    }
    Client.prototype.getClient = function () {
        return this._externalUtils.xrmProxy.Client.getClient();
    };
    Client.prototype.isOffline = function () {
        return this._externalUtils.xrmProxy.Client.getClientState() === "Offline";
    };
    Client.prototype.getFormFactor = function () {
        return this._externalUtils.xrmProxy.Client.getFormFactor();
    };
    Client.prototype.getClientState = function () {
        return null;
    };
    Client.prototype.updateClientBag = function (hostData) {
        var formattingData = GenerateDefaultFormattingData(this._customControlProperties.propBagData.formattingData);
        var clientData = this._customControlProperties.propBagData.clientData;
        var utilsData = GenerateDefaultUtilityData(this._customControlProperties.propBagData.utilsData);
        this.formFactor = clientData.formFactor || this.getFormFactor();
        this.userAgent = clientData.userAgent;
        this.languageCode = clientData.languageCode ? clientData.languageCode.toString() : null;
        this.isRTL = this._xrmProxy.UserSettings.isRTL;
        this.locale = clientData.locale;
        this.orgSettings = clientData.orgSettingsData;
        this.dateFormattingInfo = formattingData.dateTimeFormatInfo;
        this.numberFormattingInfo = formattingData.numberFormatInfo;
        this.userTimeZoneUtcOffsetMinutes = formattingData.timeZoneUtcOffsetMinutes;
        this.getUserTimeZoneUtcOffset = function (d) {
            return (formattingData.timeZoneUtcOffsetMinutes +
                utilsData.dateTimeUtils.getDSTAdjustmentMinutes(d, formattingData.timeZoneAdjusters));
        };
        this.allocatedWidth = CCFUtils.IsNullOrUndefined(hostData.allocatedWidth) ? -1 : hostData.allocatedWidth;
        this.allocatedHeight = CCFUtils.IsNullOrUndefined(hostData.allocatedHeight) ? -1 : hostData.allocatedHeight;
        this.trackContainerResize = hostData.trackResize;
        this.setFullScreen = hostData.updateFullscreen;
        this.setFullscreen = hostData.updateFullscreen;
        this.ignoreSelfUpdates = hostData.ignoreUpdates;
        this.disableScroll = clientData.disableScroll || false;
        this.fnoDetails = clientData.fnoDetails;
    };
    return Client;
}());
export { Client };
