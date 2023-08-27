var DataSetDetailsList = (function () {
    function DataSetDetailsList(makeComparer, propertyName, onUpdated) {
        this._list = [];
        this._makeComparer = makeComparer;
        this._onUpdated = function () { return onUpdated(propertyName); };
    }
    DataSetDetailsList.prototype.get = function () {
        return this._list;
    };
    DataSetDetailsList.prototype.add = function (expression) {
        this._addInternal(expression);
        this._onUpdated();
    };
    DataSetDetailsList.prototype._addInternal = function (expression) {
        if (!this._list.find(this._makeComparer(expression))) {
            this._list.push(expression);
        }
    };
    DataSetDetailsList.prototype.addRange = function (expressions) {
        if (expressions) {
            for (var _i = 0, expressions_1 = expressions; _i < expressions_1.length; _i++) {
                var expression = expressions_1[_i];
                this._addInternal(expression);
            }
        }
    };
    DataSetDetailsList.prototype.remove = function (expression) {
        var index = this._list.findIndex(this._makeComparer(expression));
        if (index !== -1) {
            this._list.splice(index, 1);
        }
        this._onUpdated();
    };
    DataSetDetailsList.prototype.clear = function () {
        this._list = [];
        this._onUpdated();
    };
    DataSetDetailsList.prototype.as = function (get, add, remove, clear) {
        var _a;
        return _a = {},
            _a[get] = this.get.bind(this),
            _a[add] = this.add.bind(this),
            _a[remove] = this.remove.bind(this),
            _a[clear] = this.clear.bind(this),
            _a;
    };
    return DataSetDetailsList;
}());
export { DataSetDetailsList };
