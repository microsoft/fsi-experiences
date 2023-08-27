var guidRegex = /^\{?([0-9a-f]{8}(-?)[0-9a-f]{4}\2[a-f\d]{4}\2[0-9a-f]{4}\2[0-9a-f]{12})}?$/;
function areGuidsSame(a, b) {
    var aMatch = guidRegex.exec(a.toLocaleLowerCase());
    var bMatch = guidRegex.exec(b.toLocaleLowerCase());
    return aMatch[1] === bMatch[1];
}
function guidV4String() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
export { areGuidsSame, guidV4String };
