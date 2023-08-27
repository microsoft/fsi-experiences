export function IsNullOrUndefined(object) {
    return object === null || object === undefined;
}
export function IsNullOrEmptyString(object) {
    return IsNullOrUndefined(object) || !object.length;
}
export function IsArray(object) {
    return !IsNullOrUndefined(object) && object.constructor === Array;
}
