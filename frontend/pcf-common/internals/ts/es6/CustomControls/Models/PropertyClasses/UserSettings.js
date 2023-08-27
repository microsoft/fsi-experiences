import { GenerateDefaultFormattingData } from "./Formatting";
import { GenerateDefaultUtilityData } from "./Utility";
var UserSettings = (function () {
    function UserSettings(customControlProperties, externalUtils) {
        this._formattingData = GenerateDefaultFormattingData(customControlProperties.propBagData.formattingData);
        var userSettings = externalUtils.xrmProxy.UserSettings;
        this._utilsData = GenerateDefaultUtilityData(customControlProperties.propBagData.utilsData);
        this.userId = userSettings.userId;
        this.userName = userSettings.userName;
        this.dateFormattingInfo = this._formattingData.dateTimeFormatInfo;
        this.numberFormattingInfo = this._formattingData.numberFormatInfo;
        this.isRTL = userSettings.isRTL;
        this.languageId = userSettings.languageId;
        this.locale = userSettings.locale;
        this.securityRoles = userSettings.securityRoles;
        this.isHighContrastEnabled = userSettings.isHighContrastEnabled;
        this.timeZoneUtcOffsetMinutes = this._formattingData.timeZoneUtcOffsetMinutes;
        this.pagingLimit = userSettings.pagingLimit;
        this.workDayStartTime = this._formattingData.workDayStartTime;
        this.formatInfoCultureName = this._formattingData.formatInfoCultureName;
        this.formatInfoCultureId = userSettings.formatInfoCultureId;
    }
    UserSettings.prototype.updateBag = function (customControlProperties) {
        this.isRTL = customControlProperties.propBagData.clientData.isRTL;
    };
    UserSettings.prototype.getTimeZoneOffsetMinutes = function (date) {
        if (!date) {
            return this._formattingData.timeZoneUtcOffsetMinutes;
        }
        return (this._formattingData.timeZoneUtcOffsetMinutes +
            this._utilsData.dateTimeUtils.getDSTAdjustmentMinutes(date, this._formattingData.timeZoneAdjusters));
    };
    return UserSettings;
}());
export { UserSettings };
