var CustomControlEntityReference = (function () {
    function CustomControlEntityReference(entityName, id, name) {
        this._etn = entityName;
        this._id = id || "";
        this._name = name;
        Object.freeze(this);
    }
    Object.defineProperty(CustomControlEntityReference.prototype, "entityName", {
        get: function () {
            return this._etn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomControlEntityReference.prototype, "entityType", {
        get: function () {
            return this._etn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomControlEntityReference.prototype, "logicalName", {
        get: function () {
            return this._etn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomControlEntityReference.prototype, "LogicalName", {
        get: function () {
            return this._etn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomControlEntityReference.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomControlEntityReference.prototype, "Id", {
        get: function () {
            return this._Id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomControlEntityReference.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomControlEntityReference.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    CustomControlEntityReference.toString = function (reference) {
        return reference.entityName + ":" + reference.id;
    };
    CustomControlEntityReference.equals = function (x, y) {
        if (!x && !y) {
            return true;
        }
        else if (!x || !y) {
            return false;
        }
        return x.entityName === y.entityName && x.id === y.id && x.name === y.name;
    };
    CustomControlEntityReference.EMPTY = new CustomControlEntityReference("");
    return CustomControlEntityReference;
}());
export { CustomControlEntityReference };
