import { SimpleFormatter } from "./../PropertyFallbacks/Formatting/SimpleFormatters";
import { CultureInfo } from "../../Utilities/CultureInfo";
import { instance as XrmProxy } from "../../Utilities/XrmProxy";
import { isNullOrUndefined } from "../../Utilities/DefaultControlMapper";
export function GenerateDefaultFormattingData(overrides) {
    var defaultFormatting = {
        timeZoneUtcOffsetMinutes: 0,
        dateTimeFormatInfo: CultureInfo.CurrentCulture.dateTimeFormat,
        numberFormatInfo: CultureInfo.CurrentCulture.numberFormat,
        timeZoneAdjusters: [],
        formatInfoCultureName: CultureInfo.CurrentCulture.name,
        formatter: SimpleFormatter,
        languagesByCode: {},
        workDayStartTime: "08:00",
    };
    var overrideFormatter = (overrides === null || overrides === void 0 ? void 0 : overrides.formatter) || defaultFormatting.formatter;
    return Object.assign(defaultFormatting, overrides, {
        formatter: overrideFormatter,
    });
}
var Formatting = (function () {
    function Formatting(customControlProperties) {
        this._formattingData = GenerateDefaultFormattingData(customControlProperties.propBagData.formattingData);
        this._utilsData = customControlProperties.propBagData.utilsData;
        this._adjusters = this._formattingData.timeZoneAdjusters;
        this._dateTimeFormatInfo = this._formattingData.dateTimeFormatInfo;
        this._currentCultureInfo = new CultureInfo(this._formattingData.formatInfoCultureName, this._formattingData.numberFormatInfo, this._formattingData.dateTimeFormatInfo);
        this._timeZoneOffsetMinutes = this._formattingData.timeZoneUtcOffsetMinutes;
    }
    Formatting.prototype.parseDateFromString = function (value, format) {
        var formatterProperties = { cultureInfo: this._currentCultureInfo };
        return this._formattingData.formatter.ParseDateFromString(value, format, this._currentCultureInfo, formatterProperties);
    };
    Formatting.prototype.parseDateFromInput = function (value, controlAttributes) {
        return this._formattingData.formatter.parseDateFromInput(value, controlAttributes);
    };
    Formatting.prototype.formatDateShort = function (value, showTime) {
        if (showTime) {
            return this._formattingData.formatter.formatShortDateTimeValue(value, this._currentCultureInfo, 0, this._timeZoneOffsetMinutes, this._adjusters);
        }
        return this._formattingData.formatter.formatShortDateValue(value, this._currentCultureInfo, 0, this._timeZoneOffsetMinutes, this._adjusters);
    };
    Formatting.prototype.formatDateLongAbbreviated = function (value) {
        return this._formattingData.formatter.formatDateLongAbbreviated(value, this._currentCultureInfo, 0, this._timeZoneOffsetMinutes, this._adjusters);
    };
    Formatting.prototype.formatDateLong = function (value) {
        return this._formattingData.formatter.formatLongDateValue(value, this._currentCultureInfo, 0, this._timeZoneOffsetMinutes, this._adjusters);
    };
    Formatting.prototype.formatDateYearMonth = function (value) {
        return this._formattingData.formatter.formatDateYearMonthValue(value, this._currentCultureInfo, 0, this._timeZoneOffsetMinutes, this._adjusters);
    };
    Formatting.prototype.parseFormatted = function (input, formatterProperties, format, resourceStrings) {
        if (formatterProperties && !formatterProperties.cultureInfo) {
            formatterProperties.cultureInfo = this._currentCultureInfo;
        }
        return this._formattingData.formatter.parseFormatted(input, formatterProperties, this._currentCultureInfo, format, resourceStrings);
    };
    Formatting.prototype.formatInteger = function (value) {
        return this._formattingData.formatter.formatIntegerValue(value, this._currentCultureInfo);
    };
    Formatting.prototype.formatDecimal = function (value, precision) {
        return this._formattingData.formatter.formatDecimalValue(value, this._currentCultureInfo, precision);
    };
    Formatting.prototype.formatCurrency = function (value, precision, symbol) {
        return this._formattingData.formatter.formatCurrencyValue(value, this._currentCultureInfo, symbol, precision);
    };
    Formatting.prototype.formatTime = function (value, behavior) {
        return this._formattingData.formatter.formatShortDateTimeValue(value, this._currentCultureInfo, behavior, this._timeZoneOffsetMinutes, this._adjusters);
    };
    Formatting.prototype.getWeekOfYear = function (value) {
        return this._utilsData.dateTimeUtils.getWeekOfYear(value, this._dateTimeFormatInfo.firstDayOfWeek, this._dateTimeFormatInfo.calendarWeekRule, !isNullOrUndefined(XrmProxy) &&
            !isNullOrUndefined(XrmProxy.Utils) &&
            !isNullOrUndefined(XrmProxy.Utils.isFeatureEnabled) &&
            XrmProxy.Utils.isFeatureEnabled("UseLegacyFunctionForWeekNumbering"));
    };
    Formatting.prototype.getTimeZoneOffsetInMinutes = function (value) {
        var adjustmentMinutes = this._utilsData.dateTimeUtils.getDSTAdjustmentMinutes(value, this._adjusters);
        return this._timeZoneOffsetMinutes + adjustmentMinutes;
    };
    Formatting.prototype.formatDateAsFilterStringInUTC = function (value, showTime) {
        if (showTime) {
            return this._formattingData.formatter.formatSortableDateTimeValue(value, this._currentCultureInfo, 0, this._timeZoneOffsetMinutes, this._adjusters);
        }
        return this._formattingData.formatter.formatSortableDateValue(value, this._currentCultureInfo, 0);
    };
    Formatting.prototype.formatLanguage = function (value) {
        return this._formattingData.formatter.formatLanguageValue(value, this._formattingData.languagesByCode);
    };
    Formatting.prototype.formatUserDateTimeToUTC = function (userDateTime, behavior) {
        return this._formattingData.formatter.formatUserDateTimeToUTC(userDateTime, behavior);
    };
    Formatting.prototype.formatUTCDateTimeToUserDate = function (utcDateTime, behavior) {
        return this._formattingData.formatter.formatUTCDateTimeToUserDate(utcDateTime, behavior);
    };
    Formatting.prototype.formatUserInput = function (input, controlAttributes) {
        return this._formattingData.formatter.formatUserInput(input, controlAttributes);
    };
    return Formatting;
}());
export { Formatting };
