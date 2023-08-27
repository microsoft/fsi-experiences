import { StringBuilder } from "../../../Utilities/StringBuilder";
var AjaxDate = (function () {
    function AjaxDate() {
    }
    AjaxDate.localeFormat = function (value, format, culture) {
        return _toFormattedString(value, format, culture);
    };
    AjaxDate.parse = function (value, format, cultureInfo) {
        value = value.trim();
        var dtf = cultureInfo.dateTimeFormat, parseInfo = _getParseRegExp(dtf, format), match = new RegExp(parseInfo.regExp).exec(value);
        if (match === null)
            return null;
        var groups = parseInfo.groups;
        var era = null;
        var year = null;
        var month = null;
        var date = null;
        var weekDay = null;
        var hour = 0;
        var hourOffset;
        var min = 0;
        var sec = 0;
        var msec = 0;
        var tzMinOffset = null;
        var pmHour = false;
        for (var j = 0, jl = groups.length; j < jl; j++) {
            var matchGroup = match[j + 1];
            if (matchGroup) {
                switch (groups[j]) {
                    case "dd":
                    case "d":
                        date = parseInt(matchGroup, 10);
                        if (date < 1 || date > 31)
                            return null;
                        break;
                    case "MMMM":
                        month = _getMonthIndex(cultureInfo, matchGroup);
                        if (month < 0 || month > 11)
                            return null;
                        break;
                    case "MMM":
                        month = _getAbbrMonthIndex(cultureInfo, matchGroup);
                        if (month < 0 || month > 11)
                            return null;
                        break;
                    case "M":
                    case "MM":
                        month = parseInt(matchGroup, 10) - 1;
                        if (month < 0 || month > 11)
                            return null;
                        break;
                    case "y":
                    case "yy":
                        year = _expandYear(dtf, parseInt(matchGroup, 10));
                        if (year < 0 || year > 9999)
                            return null;
                        break;
                    case "yyyy":
                        year = parseInt(matchGroup, 10);
                        if (year < 0 || year > 9999)
                            return null;
                        break;
                    case "h":
                    case "hh":
                        hour = parseInt(matchGroup, 10);
                        if (hour === 12)
                            hour = 0;
                        if (hour < 0 || hour > 11)
                            return null;
                        break;
                    case "H":
                    case "HH":
                        hour = parseInt(matchGroup, 10);
                        if (hour < 0 || hour > 23)
                            return null;
                        break;
                    case "m":
                    case "mm":
                        min = parseInt(matchGroup, 10);
                        if (min < 0 || min > 59)
                            return null;
                        break;
                    case "s":
                    case "ss":
                        sec = parseInt(matchGroup, 10);
                        if (sec < 0 || sec > 59)
                            return null;
                        break;
                    case "tt":
                    case "t":
                        var upperToken = matchGroup.toUpperCase();
                        pmHour = upperToken === _getValueFromDictionary(dtf, "PMDesignator").toUpperCase();
                        if (!pmHour && upperToken !== _getValueFromDictionary(dtf, "AMDesignator").toUpperCase())
                            return null;
                        break;
                    case "f":
                        msec = parseInt(matchGroup, 10) * 100;
                        if (msec < 0 || msec > 999)
                            return null;
                        break;
                    case "ff":
                        msec = parseInt(matchGroup, 10) * 10;
                        if (msec < 0 || msec > 999)
                            return null;
                        break;
                    case "fff":
                        msec = parseInt(matchGroup, 10);
                        if (msec < 0 || msec > 999)
                            return null;
                        break;
                    case "dddd":
                        weekDay = _getDayIndex(cultureInfo, matchGroup);
                        if (weekDay < 0 || weekDay > 6)
                            return null;
                        break;
                    case "ddd":
                        weekDay = _getAbbrDayIndex(cultureInfo, matchGroup);
                        if (weekDay < 0 || weekDay > 6)
                            return null;
                        break;
                    case "zzz":
                        var offsets = matchGroup.split(/:/);
                        if (offsets.length !== 2)
                            return null;
                        hourOffset = parseInt(offsets[0], 10);
                        if (hourOffset < -12 || hourOffset > 13)
                            return null;
                        var minOffset = parseInt(offsets[1], 10);
                        if (minOffset < 0 || minOffset > 59)
                            return null;
                        tzMinOffset = hourOffset * 60 + (matchGroup.startsWith("-") ? -minOffset : minOffset);
                        break;
                    case "z":
                    case "zz":
                        hourOffset = parseInt(matchGroup, 10);
                        if (hourOffset < -12 || hourOffset > 13)
                            return null;
                        tzMinOffset = hourOffset * 60;
                        break;
                    case "g":
                    case "gg":
                        var eraName = matchGroup;
                        var eras = _getValueFromDictionary(dtf, "eras");
                        if (!eraName || !eras)
                            return null;
                        eraName = eraName.toLowerCase().trim();
                        for (var i = 0, l = Object.keys(eras).length; i < l; i += 4) {
                            if (eraName === eras[i + 1].toLowerCase()) {
                                era = i;
                                break;
                            }
                        }
                        if (era === null)
                            return null;
                        break;
                }
            }
        }
        var result = new Date();
        var defaultYear;
        var temp = "convert";
        var convert = _getValueFromDictionary(dtf, "Calendar")[temp];
        if (convert) {
            defaultYear = convert.fromGregorian(result)[0];
        }
        else {
            defaultYear = result.getFullYear();
        }
        if (year === null) {
            year = defaultYear;
        }
        else if (_getValueFromDictionary(dtf, "eras")) {
            year += _getValueFromDictionary(dtf, "eras")[(era || 0) + 3];
        }
        if (month === null) {
            month = 0;
        }
        if (date === null) {
            date = 1;
        }
        if (convert) {
            result = convert.toGregorian(year, month, date);
            if (result === null)
                return null;
        }
        else {
            result.setFullYear(year, month, date);
            if (result.getDate() !== date)
                return null;
            if (weekDay !== null && result.getDay() !== weekDay) {
                return null;
            }
        }
        if (pmHour && hour < 12) {
            hour += 12;
        }
        result.setHours(hour, min, sec, msec);
        if (tzMinOffset !== null) {
            var adjustedMin = result.getMinutes() - (tzMinOffset + result.getTimezoneOffset());
            result.setHours(result.getHours() + adjustedMin / 60, adjustedMin % 60);
        }
        return result;
    };
    return AjaxDate;
}());
export { AjaxDate };
function _getValueFromDictionary(dict, propertyName) {
    return dict[propertyName];
}
function _appendPreOrPostMatch(preMatch, strBuilder) {
    var quoteCount = 0;
    var escaped = false;
    for (var i = 0, il = preMatch.length; i < il; i++) {
        var c = preMatch.charAt(i);
        switch (c) {
            case "'":
                if (escaped)
                    strBuilder.append("'");
                else
                    quoteCount++;
                escaped = false;
                break;
            case "\\":
                if (escaped)
                    strBuilder.append("\\");
                escaped = !escaped;
                break;
            default:
                strBuilder.append(c);
                escaped = false;
                break;
        }
    }
    return quoteCount;
}
function _expandFormat(dtf, format) {
    if (!format) {
        format = "F";
    }
    var len = format.length;
    if (len === 1) {
        switch (format) {
            case "d":
                return _getValueFromDictionary(dtf, "ShortDatePattern");
            case "D":
                return _getValueFromDictionary(dtf, "LongDatePattern");
            case "t":
                return _getValueFromDictionary(dtf, "ShortTimePattern");
            case "T":
                return _getValueFromDictionary(dtf, "LongTimePattern");
            case "f":
                return _getValueFromDictionary(dtf, "LongDatePattern") + " " + _getValueFromDictionary(dtf, "ShortTimePattern");
            case "F":
                return _getValueFromDictionary(dtf, "FullDateTimePattern");
            case "M":
            case "m":
                return _getValueFromDictionary(dtf, "MonthDayPattern");
            case "s":
                return _getValueFromDictionary(dtf, "SortableDateTimePattern");
            case "Y":
            case "y":
                return _getValueFromDictionary(dtf, "YearMonthPattern");
            default:
                throw Error("Res.formatInvalidString");
        }
    }
    else if (len === 2 && format.charAt(0) === "%") {
        format = format.charAt(1);
    }
    return format;
}
function _getEra(date, eras) {
    if (!eras)
        return 0;
    var start;
    var ticks = date.getTime();
    for (var i = 0, l = 4; i < l; i += 4) {
        start = eras[i + 2];
        if (start === null || ticks >= start) {
            return i;
        }
    }
    return 0;
}
function _getEraYear(date, dtf, era, sortable) {
    var year = date.getFullYear();
    if (!sortable && _getValueFromDictionary(dtf, "eras")) {
        year -= _getValueFromDictionary(dtf, "eras")[era + 3];
    }
    return year;
}
function _getTokenRegExp() {
    return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g;
}
function _toFormattedString(value, format, cultureInfo) {
    var dtf = cultureInfo.dateTimeFormat;
    var temp = "convert";
    var convert = _getValueFromDictionary(dtf, "Calendar")[temp];
    if (!format || !format.length || format === "i") {
        if (cultureInfo && cultureInfo.name.length) {
            if (convert) {
                return _toFormattedString(value, _getValueFromDictionary(dtf, "FullDateTimePattern"), cultureInfo);
            }
            var eraDate = new Date(value.getTime());
            var era = _getEra(value, _getValueFromDictionary(dtf, "eras"));
            eraDate.setFullYear(_getEraYear(value, dtf, era));
            return eraDate.toLocaleString();
        }
        return value.toString();
    }
    var eras = _getValueFromDictionary(dtf, "eras"), sortable = format === "s";
    format = _expandFormat(dtf, format);
    var ret = new StringBuilder();
    var hour;
    function addLeadingZero(num) {
        if (num < 10) {
            return "0" + num;
        }
        return num.toString();
    }
    function addLeadingZeros(num) {
        if (num < 10) {
            return "00" + num;
        }
        if (num < 100) {
            return "0" + num;
        }
        return num.toString();
    }
    function padYear(year) {
        if (year < 10) {
            return "000" + year;
        }
        else if (year < 100) {
            return "00" + year;
        }
        else if (year < 1000) {
            return "0" + year;
        }
        return year.toString();
    }
    var foundDay;
    var checkedDay;
    var dayPartRegExp = /([^d]|^)(d|dd)([^d]|$)/g;
    function hasDay() {
        if (foundDay || checkedDay) {
            return foundDay;
        }
        foundDay = dayPartRegExp.test(format);
        checkedDay = true;
        return foundDay;
    }
    var quoteCount = 0;
    var tokenRegExp = _getTokenRegExp();
    var converted;
    if (!sortable && convert) {
        converted = convert.fromGregorian(value);
    }
    function getPart(date, part) {
        if (converted) {
            return converted[part];
        }
        switch (part) {
            case 0:
                return date.getFullYear();
            case 1:
                return date.getMonth();
            case 2:
                return date.getDate();
        }
    }
    for (;;) {
        var index = tokenRegExp.lastIndex;
        var ar = tokenRegExp.exec(format);
        var preMatch = format.slice(index, ar ? ar.index : format.length);
        quoteCount += _appendPreOrPostMatch(preMatch, ret);
        if (!ar)
            break;
        if (quoteCount % 2 === 1) {
            ret.append(ar[0]);
            continue;
        }
        switch (ar[0]) {
            case "dddd":
                ret.append(_getValueFromDictionary(dtf, "DayNames")[value.getDay()]);
                break;
            case "ddd":
                ret.append(_getValueFromDictionary(dtf, "AbbreviatedDayNames")[value.getDay()]);
                break;
            case "dd":
                foundDay = true;
                ret.append(addLeadingZero(getPart(value, 2)));
                break;
            case "d":
                foundDay = true;
                ret.append(getPart(value, 2).toString());
                break;
            case "MMMM":
                ret.append(_getValueFromDictionary(dtf, "MonthGenitiveNames") && hasDay()
                    ? _getValueFromDictionary(dtf, "MonthGenitiveNames")[getPart(value, 1)]
                    : _getValueFromDictionary(dtf, "MonthNames")[getPart(value, 1)]);
                break;
            case "MMM":
                ret.append(_getValueFromDictionary(dtf, "AbbreviatedMonthGenitiveNames") && hasDay()
                    ? _getValueFromDictionary(dtf, "AbbreviatedMonthGenitiveNames")[getPart(value, 1)]
                    : _getValueFromDictionary(dtf, "AbbreviatedMonthNames")[getPart(value, 1)]);
                break;
            case "MM":
                ret.append(addLeadingZero(getPart(value, 1) + 1));
                break;
            case "M":
                ret.append((getPart(value, 1) + 1).toString());
                break;
            case "yyyy":
                ret.append(padYear(converted ? converted[0] : _getEraYear(value, dtf, _getEra(value, eras), sortable)));
                break;
            case "yy":
                ret.append(addLeadingZero((converted ? converted[0] : _getEraYear(value, dtf, _getEra(value, eras), sortable)) % 100));
                break;
            case "y":
                ret.append(converted
                    ? converted[0].toString()
                    : (_getEraYear(value, dtf, _getEra(value, eras), sortable) % 100).toString());
                break;
            case "hh":
                hour = value.getHours() % 12;
                if (hour === 0)
                    hour = 12;
                ret.append(addLeadingZero(hour));
                break;
            case "h":
                hour = value.getHours() % 12;
                if (hour === 0)
                    hour = 12;
                ret.append(hour.toString());
                break;
            case "HH":
                ret.append(addLeadingZero(value.getHours()));
                break;
            case "H":
                ret.append(value.getHours().toString());
                break;
            case "mm":
                ret.append(addLeadingZero(value.getMinutes()));
                break;
            case "m":
                ret.append(value.getMinutes().toString());
                break;
            case "ss":
                ret.append(addLeadingZero(value.getSeconds()));
                break;
            case "s":
                ret.append(value.getSeconds().toString());
                break;
            case "tt":
                ret.append(value.getHours() < 12
                    ? _getValueFromDictionary(dtf, "AMDesignator")
                    : _getValueFromDictionary(dtf, "PMDesignator"));
                break;
            case "t":
                ret.append((value.getHours() < 12
                    ? _getValueFromDictionary(dtf, "AMDesignator")
                    : _getValueFromDictionary(dtf, "PMDesignator")).charAt(0));
                break;
            case "f":
                ret.append(addLeadingZeros(value.getMilliseconds()).charAt(0));
                break;
            case "ff":
                ret.append(addLeadingZeros(value.getMilliseconds()).substr(0, 2));
                break;
            case "fff":
                ret.append(addLeadingZeros(value.getMilliseconds()));
                break;
            case "z":
                hour = value.getTimezoneOffset() / 60;
                ret.append((hour <= 0 ? "+" : "-") + Math.floor(Math.abs(hour)));
                break;
            case "zz":
                hour = value.getTimezoneOffset() / 60;
                ret.append((hour <= 0 ? "+" : "-") + addLeadingZero(Math.floor(Math.abs(hour))));
                break;
            case "zzz":
                hour = value.getTimezoneOffset() / 60;
                ret.append((hour <= 0 ? "+" : "-") + addLeadingZero(Math.floor(Math.abs(hour))) + ":" + addLeadingZero(Math.abs(value.getTimezoneOffset() % 60)));
                break;
            case "g":
            case "gg":
                if (_getValueFromDictionary(dtf, "eras")) {
                    ret.append(_getValueFromDictionary(dtf, "eras")[_getEra(value, eras) + 1]);
                }
                break;
            case "/":
                ret.append(_getValueFromDictionary(dtf, "DateSeparator"));
                break;
            default:
                throw Error("Invalid date format pattern");
        }
    }
    return ret.toString();
}
function _getParseRegExp(dtf, format) {
    var expFormat = _expandFormat(dtf, format);
    expFormat = expFormat.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1");
    var regexp = new StringBuilder("^");
    var groups = [];
    var index = 0;
    var quoteCount = 0;
    var tokenRegExp = _getTokenRegExp();
    var match;
    while ((match = tokenRegExp.exec(expFormat)) !== null) {
        var preMatch = expFormat.slice(index, match.index);
        index = tokenRegExp.lastIndex;
        quoteCount += _appendPreOrPostMatch(preMatch, regexp);
        if (quoteCount % 2 === 1) {
            regexp.append(match[0]);
            continue;
        }
        switch (match[0]) {
            case "dddd":
            case "ddd":
            case "MMMM":
            case "MMM":
            case "gg":
            case "g":
                regexp.append("(\\D+)");
                break;
            case "tt":
            case "t":
                regexp.append("(\\D*)");
                break;
            case "yyyy":
                regexp.append("(\\d{4})");
                break;
            case "fff":
                regexp.append("(\\d{3})");
                break;
            case "ff":
                regexp.append("(\\d{2})");
                break;
            case "f":
                regexp.append("(\\d)");
                break;
            case "dd":
            case "d":
            case "MM":
            case "M":
            case "yy":
            case "y":
            case "HH":
            case "H":
            case "hh":
            case "h":
            case "mm":
            case "m":
            case "ss":
            case "s":
                regexp.append("(\\d\\d?)");
                break;
            case "zzz":
                regexp.append("([+-]?\\d\\d?:\\d{2})");
                break;
            case "zz":
            case "z":
                regexp.append("([+-]?\\d\\d?)");
                break;
            case "/":
                regexp.append("(\\" + _getValueFromDictionary(dtf, "DateSeparator") + ")");
                break;
            default:
                throw Error("Invalid date format pattern");
        }
        groups.push(match[0]);
    }
    _appendPreOrPostMatch(expFormat.slice(index), regexp);
    regexp.append("$");
    var regexpStr = regexp.toString().replace(/\s+/g, "\\s+");
    var parseRegExp = { regExp: regexpStr, groups: groups };
    return parseRegExp;
}
function _toUpper(value) {
    return value.split("\u00A0").join(" ").toUpperCase();
}
function _toUpperArray(arr) {
    var result = [];
    for (var i = 0, il = arr.length; i < il; i++) {
        result[i] = _toUpper(arr[i]);
    }
    return result;
}
function _getIndex(value, a1, a2) {
    var upper = _toUpper(value);
    var i = a1.indexOf(upper);
    if (i === -1) {
        i = a2.indexOf(upper);
    }
    return i;
}
function _getMonthIndex(cultureInfo, value) {
    var monthNames = "MonthNames";
    var monthGenitiveNames = "MonthGenitiveNames";
    var _upperMonths = _toUpperArray(cultureInfo.dateTimeFormat[monthNames]);
    var _upperMonthsGenitive = _toUpperArray(cultureInfo.dateTimeFormat[monthGenitiveNames]);
    return _getIndex(value, _upperMonths, _upperMonthsGenitive);
}
function _getAbbrMonthIndex(cultureInfo, value) {
    var _upperAbbrMonths = _toUpperArray(_getValueFromDictionary(cultureInfo.dateTimeFormat, "AbbreviatedMonthNames"));
    var _upperAbbrMonthsGenitive = _toUpperArray(_getValueFromDictionary(cultureInfo.dateTimeFormat, "AbbreviatedMonthGenitiveNames"));
    return _getIndex(value, _upperAbbrMonths, _upperAbbrMonthsGenitive);
}
function _getDayIndex(cultureInfo, value) {
    var _upperDays = _toUpperArray(_getValueFromDictionary(cultureInfo.dateTimeFormat, "DayNames"));
    return _upperDays.indexOf(_toUpper(value));
}
function _getAbbrDayIndex(cultureInfo, value) {
    var _upperAbbrDays = _toUpperArray(_getValueFromDictionary(cultureInfo.dateTimeFormat, "AbbreviatedDayNames"));
    return _upperAbbrDays.indexOf(_toUpper(value));
}
function _expandYear(dtf, year) {
    var now = new Date(), era = _getEra(now, _getValueFromDictionary(dtf, "eras"));
    if (year < 100) {
        var curr = _getEraYear(now, dtf, era);
        year += curr - (curr % 100);
        if (year > _getValueFromDictionary(_getValueFromDictionary(dtf, "Calendar"), "TwoDigitYearMax")) {
            year -= 100;
        }
    }
    return year;
}
