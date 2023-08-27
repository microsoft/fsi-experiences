var JsonHelper = (function () {
    function JsonHelper() {
    }
    JsonHelper.prototype.stringify = function (value) {
        try {
            return JSON.stringify(value);
        }
        catch (e) {
            if (e.message.indexOf("circular") === -1 || typeof value !== "object") {
                throw e;
            }
            var shallowObject = {};
            for (var key in value) {
                if (!value.hasOwnProperty(key)) {
                    continue;
                }
                if (typeof value[key] === "object" && value[key]) {
                    shallowObject[key] = "object pruned";
                }
                else {
                    shallowObject[key] = value[key];
                }
            }
            return JSON.stringify(shallowObject);
        }
    };
    return JsonHelper;
}());
export { JsonHelper };
