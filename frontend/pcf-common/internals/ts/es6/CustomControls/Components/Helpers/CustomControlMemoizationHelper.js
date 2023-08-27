import { COMPONENT_NAME } from "../../Utilities/TelemetryManager";
import { instance as XrmProxy } from "../../Utilities/XrmProxy";
var CustomControlMemoizationHelper = (function () {
    function CustomControlMemoizationHelper() {
        this._memoizedMap = {};
        this._newMemoizedMap = {};
        this._isCompositing = false;
        this._newIsCompositing = false;
        this._midRender = false;
        this._memoizedRoot = null;
        this._DOMIdIndex = 0;
        this._wrapperMap = {};
        this.addCommandWrapper = this.addCommandWrapper.bind(this);
    }
    CustomControlMemoizationHelper.prototype.startRenderFunction = function () {
        if (this._midRender) {
            var error = new Error("Start render called without start");
            XrmProxy.Reporting.reportFailure(COMPONENT_NAME + ".Components", error, "Start Render, midRender " + this._midRender, [{ name: "APIName", value: COMPONENT_NAME + ".Components.CustomControlMemoizationHelper.startRenderFunction" }]);
            throw error;
        }
        this._isCompositing = false;
        this._midRender = true;
    };
    CustomControlMemoizationHelper.prototype.stopRenderFunction = function () {
        if (!this._midRender) {
            var error = new Error("Stop render called without start");
            XrmProxy.Reporting.reportFailure(COMPONENT_NAME + ".Components", error, "Stop Render, midRender " + this._midRender, [{ name: "APIName", value: COMPONENT_NAME + ".Components.CustomControlMemoizationHelper.stopRenderFunction" }]);
            throw error;
        }
        this._isCompositing = this._newIsCompositing;
        this._memoizedMap = this._newMemoizedMap;
        this._newMemoizedMap = {};
        this._midRender = false;
    };
    CustomControlMemoizationHelper.prototype.destroy = function () {
        for (var key in this._wrapperMap) {
            this._wrapperMap[key].unmount();
        }
        this._wrapperMap = null;
        this._memoizedMap = null;
        this._newMemoizedMap = null;
        this._memoizedRoot = null;
        this._midRender = false;
    };
    CustomControlMemoizationHelper.prototype.getVirtualComponentByKey = function (key) {
        if (this._memoizedMap && this._memoizedMap[key]) {
            return this._memoizedMap[key].virtualComponent;
        }
        return null;
    };
    CustomControlMemoizationHelper.prototype.getDOMIdIndexByKey = function (key) {
        if (this._memoizedMap && this._memoizedMap[key]) {
            return this._memoizedMap[key].idIndex;
        }
        return this.getNextIndex();
    };
    CustomControlMemoizationHelper.prototype.getReactElementByKey = function (key) {
        if (this._memoizedMap && this._memoizedMap[key]) {
            return this._memoizedMap[key].reactElement;
        }
        return null;
    };
    CustomControlMemoizationHelper.prototype.retainElement = function (key) {
        if (this._midRender && this._memoizedMap) {
            this._newMemoizedMap[key] = this._memoizedMap[key];
        }
    };
    CustomControlMemoizationHelper.prototype.addUpdatedEntry = function (key, element, vc, idIndex) {
        if (this._midRender && this._newMemoizedMap) {
            this._newMemoizedMap[key] = {
                reactElement: element,
                virtualComponent: vc,
                idIndex: idIndex,
            };
        }
        else if (this._memoizedMap) {
            this._memoizedMap[key] = {
                reactElement: element,
                virtualComponent: vc,
                idIndex: idIndex,
            };
        }
    };
    CustomControlMemoizationHelper.prototype.setIsCompositing = function (value) {
        this._newIsCompositing = value;
    };
    CustomControlMemoizationHelper.prototype.getIsCompositing = function () {
        return this._isCompositing;
    };
    CustomControlMemoizationHelper.prototype.setRoot = function (element) {
        this._memoizedRoot = element;
    };
    CustomControlMemoizationHelper.prototype.getRoot = function () {
        return this._memoizedRoot;
    };
    CustomControlMemoizationHelper.prototype.addCommandWrapper = function (key, cw) {
        this._wrapperMap[key] = cw;
    };
    CustomControlMemoizationHelper.prototype.getNextIndex = function () {
        return this._DOMIdIndex++;
    };
    return CustomControlMemoizationHelper;
}());
export { CustomControlMemoizationHelper };
