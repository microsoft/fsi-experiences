var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var arraysEqualIgnoringOrder = function (a, b) {
    if (a.length === b.length) {
        var acopy = __spreadArray([], a, true).sort();
        var bcopy_1 = __spreadArray([], b, true).sort();
        return acopy.every(function (val, index) { return val === bcopy_1[Number(index)]; });
    }
    return false;
};
export var findMax = function (arr, compareFn) {
    if (!(arr === null || arr === void 0 ? void 0 : arr.length)) {
        return null;
    }
    var max = arr[0];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var val = arr_1[_i];
        if (compareFn(val, max) > 0) {
            max = val;
        }
    }
    return max;
};
