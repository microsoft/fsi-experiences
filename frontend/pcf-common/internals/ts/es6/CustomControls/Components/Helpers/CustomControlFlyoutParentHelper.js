var _instance;
var CustomControlFlyoutParentHelper = (function () {
    function CustomControlFlyoutParentHelper() {
        this._parentFlyoutNameToChildRootNameMap = {};
    }
    CustomControlFlyoutParentHelper.getInstance = function () {
        if (!_instance) {
            _instance = new CustomControlFlyoutParentHelper();
        }
        return _instance;
    };
    CustomControlFlyoutParentHelper.prototype.mountChildFlyout = function (parentKey, childKey) {
        if (!this._parentFlyoutNameToChildRootNameMap.hasOwnProperty(parentKey)) {
            this._parentFlyoutNameToChildRootNameMap[parentKey] = [];
        }
        this._parentFlyoutNameToChildRootNameMap[parentKey].push(childKey);
    };
    CustomControlFlyoutParentHelper.prototype.unmountChildFlyout = function (parentKey, childKey) {
        if (this._parentFlyoutNameToChildRootNameMap.hasOwnProperty(parentKey)) {
            var parent_1 = this._parentFlyoutNameToChildRootNameMap[parentKey];
            var index = parent_1.indexOf(childKey);
            if (index > -1) {
                parent_1.splice(index, 1);
                if (parent_1.length < 1) {
                    delete this._parentFlyoutNameToChildRootNameMap[parentKey];
                }
            }
            return false;
        }
        return false;
    };
    CustomControlFlyoutParentHelper.prototype.getChildRoots = function (parentKey) {
        return this._parentFlyoutNameToChildRootNameMap.hasOwnProperty(parentKey)
            ? this._parentFlyoutNameToChildRootNameMap[parentKey]
            : [];
    };
    return CustomControlFlyoutParentHelper;
}());
export { CustomControlFlyoutParentHelper };
