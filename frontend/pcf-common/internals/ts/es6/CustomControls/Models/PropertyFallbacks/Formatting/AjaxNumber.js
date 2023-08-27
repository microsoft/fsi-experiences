var AjaxNumber = (function () {
    function AjaxNumber() {
    }
    AjaxNumber.localeFormat = function (num, format, cultureInfo) {
        return _toFormattedString(num, format, cultureInfo);
    };
    return AjaxNumber;
}());
export { AjaxNumber };
function _getValueFromDictionary(dict, propertyName) {
    return dict[propertyName];
}
function _toFormattedString(num, format, cultureInfo) {
    if (!format || format.length === 0 || format === "i") {
        if (cultureInfo && cultureInfo.name.length > 0) {
            return AjaxNumber.toLocaleString();
        }
        return AjaxNumber.toString();
    }
    var _percentPositivePattern = ["n %", "n%", "%n"];
    var _percentNegativePattern = ["-n %", "-n%", "-%n"];
    var _numberNegativePattern = ["(n)", "-n", "- n", "n-", "n -"];
    var _currencyPositivePattern = ["$n", "n$", "$ n", "n $"];
    var _currencyNegativePattern = [
        "($n)",
        "-$n",
        "$-n",
        "$n-",
        "(n$)",
        "-n$",
        "n-$",
        "n$-",
        "-n $",
        "-$ n",
        "n $-",
        "$ n-",
        "$ -n",
        "n- $",
        "($ n)",
        "(n $)",
    ];
    function zeroPad(str, count, left) {
        for (var l = str.length; l < count; l++) {
            str = left ? "0" + str : str + "0";
        }
        return str;
    }
    function expandNumber(numb, precision, groupSizes, sep, decimalChar) {
        var curSize = groupSizes[0];
        var curGroupIndex = 1;
        var factor = Math.pow(10, precision);
        var rounded = Math.round(numb * factor) / factor;
        if (!isFinite(rounded)) {
            rounded = numb;
        }
        numb = rounded;
        var numberString = numb.toString();
        var right = "";
        var exponent;
        var split = numberString.split(/e/i);
        numberString = split[0];
        exponent = split.length > 1 ? parseInt(split[1], 10) : 0;
        split = numberString.split(".");
        numberString = split[0];
        right = split.length > 1 ? split[1] : "";
        if (exponent > 0) {
            right = zeroPad(right, exponent, false);
            numberString += right.slice(0, exponent);
            right = right.substr(exponent);
        }
        else if (exponent < 0) {
            exponent = -exponent;
            numberString = zeroPad(numberString, exponent + 1, true);
            right = numberString.slice(-exponent, numberString.length) + right;
            numberString = numberString.slice(0, -exponent);
        }
        if (precision > 0) {
            if (right.length > precision) {
                right = right.slice(0, precision);
            }
            else {
                right = zeroPad(right, precision, false);
            }
            right = decimalChar + right;
        }
        else {
            right = "";
        }
        var stringIndex = numberString.length - 1;
        var ret = "";
        while (stringIndex >= 0) {
            if (curSize === 0 || curSize > stringIndex) {
                if (ret.length > 0)
                    return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                return numberString.slice(0, stringIndex + 1) + right;
            }
            if (ret.length > 0)
                ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + sep + ret;
            else
                ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1);
            stringIndex -= curSize;
            if (curGroupIndex < groupSizes.length) {
                curSize = groupSizes[curGroupIndex];
                curGroupIndex++;
            }
        }
        return numberString.slice(0, stringIndex + 1) + sep + ret + right;
    }
    var nf = cultureInfo.numberFormat;
    var number = Math.abs(num).toString();
    if (!format)
        format = "D";
    var precision = -1;
    if (format.length > 1)
        precision = parseInt(format.slice(1), 10);
    var pattern;
    switch (format.charAt(0)) {
        case "d":
        case "D":
            pattern = "n";
            if (precision !== -1) {
                number = zeroPad("" + number, precision, true);
            }
            if (num < 0)
                number = (-number).toString();
            break;
        case "c":
        case "C":
            if (num < 0)
                pattern = _currencyNegativePattern[_getValueFromDictionary(nf, "CurrencyNegativePattern")];
            else
                pattern = _currencyPositivePattern[_getValueFromDictionary(nf, "CurrencyPositivePattern")];
            if (precision === -1)
                precision = _getValueFromDictionary(nf, "CurrencyDecimalDigits");
            number = expandNumber(Math.abs(num), precision, _getValueFromDictionary(nf, "CurrencyGroupSizes"), _getValueFromDictionary(nf, "CurrencyGroupSeparator"), _getValueFromDictionary(nf, "CurrencyDecimalSeparator"));
            break;
        case "n":
        case "N":
            if (num < 0)
                pattern = _numberNegativePattern[_getValueFromDictionary(nf, "NumberNegativePattern")];
            else
                pattern = "n";
            if (precision === -1)
                precision = _getValueFromDictionary(nf, "NumberDecimalDigits");
            number = expandNumber(Math.abs(num), precision, _getValueFromDictionary(nf, "NumberGroupSizes"), _getValueFromDictionary(nf, "NumberGroupSeparator"), _getValueFromDictionary(nf, "NumberDecimalSeparator"));
            break;
        case "p":
        case "P":
            if (num < 0)
                pattern = _percentNegativePattern[_getValueFromDictionary(nf, "PercentNegativePattern")];
            else
                pattern = _percentPositivePattern[_getValueFromDictionary(nf, "PercentPositivePattern")];
            if (precision === -1)
                precision = _getValueFromDictionary(nf, "PercentDecimalDigits");
            number = expandNumber(Math.abs(num) * 100, precision, _getValueFromDictionary(nf, "PercentGroupSizes"), _getValueFromDictionary(nf, "PercentGroupSeparator"), _getValueFromDictionary(nf, "PercentDecimalSeparator"));
            break;
        default:
            throw Error("Res.formatBadFormatSpecifier");
    }
    var regex = /n|\$|-|%/g;
    var ret = "";
    for (;;) {
        var index = regex.lastIndex;
        var ar = regex.exec(pattern);
        ret += pattern.slice(index, ar ? ar.index : pattern.length);
        if (!ar)
            break;
        switch (ar[0]) {
            case "n":
                ret += number;
                break;
            case "$":
                ret += _getValueFromDictionary(nf, "CurrencySymbol");
                break;
            case "-":
                if (/[1-9]/.test(number)) {
                    ret += _getValueFromDictionary(nf, "NegativeSign");
                }
                break;
            case "%":
                ret += _getValueFromDictionary(nf, "PercentSymbol");
                break;
            default:
                throw Error("Invalid number format pattern");
        }
    }
    return ret;
}
