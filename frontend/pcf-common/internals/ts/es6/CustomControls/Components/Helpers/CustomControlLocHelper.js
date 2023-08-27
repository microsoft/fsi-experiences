var DEFAULT_STRINGS = {
    ERROR_LOADING_CONTROL: "Error loading control",
    VALIDATION_FAILED_EMAIL: "Value is not a valid email",
    VALIDATION_FAILED_BOOL: "Value is not a valid boolean",
    VALIDATION_FAILED_DATE: "Value is not a valid Date object",
    VALIDATION_FAILED_NUM: "Value is not a valid number",
    VALIDATION_FAILED_INT: "Number is not a valid integer",
    VALIDATION_FAILED_RANGE: "Value is not within the defined range for this property. Range is {0} to {1}",
    SELECT_TO_ENTER_DATA: "Select to enter data.",
};
var CUSTOM_CONTROL_GLOBAL_STRINGS = DEFAULT_STRINGS;
function getLocalizedString(key) {
    return CUSTOM_CONTROL_GLOBAL_STRINGS[key];
}
function updateLocStrings(newStrings) {
    CUSTOM_CONTROL_GLOBAL_STRINGS = Object.assign(CUSTOM_CONTROL_GLOBAL_STRINGS, newStrings);
}
function resetStrings() {
    CUSTOM_CONTROL_GLOBAL_STRINGS = DEFAULT_STRINGS;
}
export { getLocalizedString, updateLocStrings, resetStrings };
