import { ManifestType } from "../../../Utilities/ManifestType";
import { generateDefaultAttributeMetadata } from "./DefaultAttributeMetadataGeneration";
import { getLocalizedString } from "../../../Components/Helpers/CustomControlLocHelper";
function _getValueValidator(type) {
    switch (type) {
        case ManifestType.Decimal:
        case ManifestType.FP:
        case ManifestType.Currency:
            return _validateNumberObject;
        case ManifestType.WholeNone:
            return _validateInteger;
        case ManifestType.TwoOptions:
            return _validateBoolean;
        case ManifestType.DateAndTimeDateAndTime:
        case ManifestType.DateAndTimeDateOnly:
            return _validateDateTimeObject;
        case ManifestType.SingleLineEmail:
            return _validateEmail;
    }
    return null;
}
function _getValueAttributeValidator(type) {
    switch (type) {
        case ManifestType.Decimal:
        case ManifestType.FP:
        case ManifestType.Currency:
        case ManifestType.WholeNone:
            return [_validateRange];
    }
    return [];
}
function _validateBoolean(value) {
    var isValidBool = typeof value === "boolean";
    return isValidBool
        ? null
        : {
            error: true,
            errorMessage: getLocalizedString("VALIDATION_FAILED_BOOL"),
        };
}
function _validateDateTimeObject(value) {
    var isValidDate = value instanceof Date;
    return isValidDate
        ? null
        : {
            error: true,
            errorMessage: getLocalizedString("VALIDATION_FAILED_DATE"),
        };
}
function _validateNumberObject(value) {
    var isValidNum = typeof value === "number" && !isNaN(Number(value));
    return isValidNum
        ? null
        : {
            error: true,
            errorMessage: getLocalizedString("VALIDATION_FAILED_NUM"),
        };
}
function _validateInteger(value) {
    var isValidNum = !_validateNumberObject(value);
    var isValidInt = isFinite(value) && Math.floor(value) === value;
    return isValidNum && isValidInt
        ? null
        : {
            error: true,
            errorMessage: isValidNum
                ? getLocalizedString("VALIDATION_FAILED_INT")
                : getLocalizedString("VALIDATION_FAILED_NUM"),
        };
}
var ValidEmailRegEx = /^[^@\s\\"<>)(\[\]+:;,.-]+(([.+-][^@\s\\"<>)(\[\]+:;,.-]+)+?|)@([^@\s\\"<>)(\[\]+:;,.-]+(([.+-][^@\s\\"<>)(\[\]+:;,.-]+)+?|)([.][^0-9@\s\\"<>)(\[\]+:;,.-]+)+?|(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/;
var BackSlashAndDoubleQuoteRegEx = /["\\"]/;
function _validateEmailWithQuotedString(emailAddress) {
    if (typeof emailAddress !== "string") {
        return false;
    }
    var start = emailAddress.indexOf('"');
    var end = emailAddress.indexOf('"@', 1);
    if (start === 0 && end > 1) {
        var strInsideQuote = emailAddress.substring(1, end);
        var pseudoAddress = emailAddress.replace('"' + strInsideQuote + '"', "abc");
        if (!BackSlashAndDoubleQuoteRegEx.test(strInsideQuote) && ValidEmailRegEx.test(pseudoAddress)) {
            return true;
        }
    }
    return false;
}
function _validateEmail(value) {
    var isValidEmail = ValidEmailRegEx.test(value) || _validateEmailWithQuotedString(value);
    return isValidEmail
        ? null
        : {
            error: true,
            errorMessage: getLocalizedString("VALIDATION_FAILED_EMAIL"),
        };
}
function _validateRange(value, attributes) {
    var isValidInRange = value >= attributes.MinValue && value <= attributes.MaxValue;
    return isValidInRange
        ? null
        : {
            error: true,
            errorMessage: getLocalizedString("VALIDATION_FAILED_RANGE")
                .replace("{0}", attributes.MinValue.toString())
                .replace("{1}", attributes.MaxValue.toString()),
        };
}
function getValidation(value, type, attributes, attributeValidation) {
    if (attributeValidation === void 0) { attributeValidation = false; }
    if (value === null || value === undefined || value === "") {
        return null;
    }
    var valueValidator = _getValueValidator(type);
    var validation = valueValidator ? valueValidator(value) : null;
    if (validation) {
        return validation;
    }
    if (attributeValidation) {
        var attributeValidators = _getValueAttributeValidator(type);
        var fullAttributes = generateDefaultAttributeMetadata(type, attributes);
        for (var i = 0; i < attributeValidators.length; i++) {
            validation = attributeValidators[i](value, fullAttributes);
            if (validation) {
                return validation;
            }
        }
    }
    return null;
}
export { getValidation };
