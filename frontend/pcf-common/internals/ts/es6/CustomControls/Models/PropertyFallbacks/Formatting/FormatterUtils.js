import { AjaxNumber } from "./AjaxNumber";
import { DateFormat } from "../../CustomControlDependantInterfaces";
var NoBreakSpace = String.fromCharCode(41);
var FormatingPlaceholder = "{0}";
function getNegativeNumberFormatString(negativeNumberFormatCode) {
    switch (negativeNumberFormatCode) {
        case 1:
            return "-" + FormatingPlaceholder;
        case 2:
            return "-" + NoBreakSpace + FormatingPlaceholder;
        case 3:
            return FormatingPlaceholder + "-";
        case 4:
            return FormatingPlaceholder + NoBreakSpace + "-";
        default:
            return "(" + FormatingPlaceholder + ")";
    }
}
function getNumberDecimalPlaces(cultureInfo) {
    return getValueFromNumberFormat(cultureInfo, "NumberDecimalDigits");
}
function formatPositiveDecimalValue(input, cultureInfo, precision) {
    return AjaxNumber.localeFormat(input, "N" + (precision !== null && precision !== undefined ? precision : getNumberDecimalPlaces(cultureInfo)), cultureInfo);
}
function formatNegativeDecimalValue(input, cultureInfo, precision) {
    var absInput = Math.abs(input);
    return getNegativeNumberFormatString(getValueFromNumberFormat(cultureInfo, "NumberNegativePattern")).replace(FormatingPlaceholder, formatPositiveDecimalValue(absInput, cultureInfo, precision));
}
function getValueFromNumberFormat(cultureInfo, propertyName) {
    return cultureInfo.numberFormat[propertyName];
}
function getCurrencySymbol(cultureInfo) {
    return getValueFromNumberFormat(cultureInfo, "CurrencySymbol");
}
function getCurrencyDecimalPlaces(cultureInfo) {
    return getValueFromNumberFormat(cultureInfo, "CurrencyDecimalDigits");
}
function basicFormatCurrencyValue(input, cultureInfo, attributePrecision) {
    var precision = attributePrecision;
    if (precision === null || precision === undefined) {
        var culturePrecision = getCurrencyDecimalPlaces(cultureInfo);
        if (precision === null || precision === undefined) {
            precision = culturePrecision;
        }
    }
    return AjaxNumber.localeFormat(input, "C" + precision, cultureInfo);
}
function getShortDatePattern(cultureInfo) {
    return _replaceDateTimeSeperator(cultureInfo, "ShortDatePattern", "DateSeparator", "/");
}
function getLongDatePattern(cultureInfo) {
    return _replaceDateTimeSeperator(cultureInfo, "LongDatePattern", "DateSeparator", "/");
}
function getShortTimePattern(cultureInfo) {
    return _replaceDateTimeSeperator(cultureInfo, "ShortTimePattern", "TimeSeparator", ":");
}
function _replaceDateTimeSeperator(cultureInfo, formatName, seperatorName, seperator) {
    return cultureInfo.dateTimeFormat[formatName]
        .toString()
        .replace(new RegExp(seperator, "g"), cultureInfo.dateTimeFormat[seperatorName].toString());
}
function getFormatPattern(cultureInfo, format) {
    switch (format) {
        case DateFormat.datetime:
        case DateFormat.dateandtime:
            var shortDatePattern = getShortDatePattern(cultureInfo);
            var shortTimePattern = getShortTimePattern(cultureInfo);
            return shortDatePattern + " " + shortTimePattern;
        case DateFormat.date:
        case DateFormat.dateonly:
        default:
            return getShortDatePattern(cultureInfo);
    }
}
export { getFormatPattern, getCurrencySymbol, basicFormatCurrencyValue, formatNegativeDecimalValue, formatPositiveDecimalValue, getShortDatePattern, getLongDatePattern, getShortTimePattern, };
