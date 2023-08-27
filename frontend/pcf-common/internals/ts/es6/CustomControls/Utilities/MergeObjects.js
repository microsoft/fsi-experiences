function copy(toObject, fromObject) {
    if (toObject === fromObject) {
        return toObject;
    }
    fromObject = Object(fromObject);
    for (var key in fromObject) {
        var val = fromObject[key];
        if (val === undefined || val === null) {
            return;
        }
        var type = typeof val;
        if (!Object.prototype.hasOwnProperty.call(toObject, key) || !(type === "object" || type === "function")) {
            toObject[key] = val;
        }
        else {
            toObject[key] = copy(Object(toObject[key]), fromObject[key]);
        }
    }
    return toObject;
}
export function mergeObjects(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var to = Object(target);
    for (var index = 0; index < sources.length; index++) {
        copy(to, sources[index]);
    }
    return to;
}
export default mergeObjects;
