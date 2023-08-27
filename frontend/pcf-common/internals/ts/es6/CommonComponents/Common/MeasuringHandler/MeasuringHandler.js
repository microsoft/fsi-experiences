import * as React from "react";
var _instance;
var DEFAULT_GROUP_ID = "defaultMeasuringHandlerGroup";
var MeasuringHandler = (function () {
    function MeasuringHandler() {
        var _this = this;
        this._previousDimensions = {};
        this._subscribers = {};
        this._groupIdBySubscriber = new Map();
        this._pendingSubscribers = {};
        this._pendingUpdates = {};
        this._schedule = function () {
            _this.takeMeasurements();
            _this.flushPendingMeasuringNotifications();
        };
    }
    MeasuringHandler.getInstance = function () {
        if (!_instance) {
            _instance = new MeasuringHandler();
        }
        return _instance;
    };
    MeasuringHandler.prototype.setSchedulingFunction = function (schedule) {
        this._schedule = schedule;
    };
    MeasuringHandler.prototype.addMeasuringSubscribers = function (subscriber) {
        if (!subscriber) {
            return;
        }
        var groupId = _getGroupId(subscriber.getContext());
        if (!this._subscribers[groupId]) {
            this._subscribers[groupId] = [];
        }
        this._subscribers[groupId].push(subscriber);
        this._groupIdBySubscriber.set(subscriber, groupId);
        this.scheduleMeasuringUpdate();
    };
    MeasuringHandler.prototype.updateMeasuringSubscribers = function (subscriber) {
        if (!subscriber) {
            return;
        }
        var previousGroupId = this._groupIdBySubscriber.get(subscriber);
        if (!previousGroupId) {
            return;
        }
        var groupId = _getGroupId(subscriber.getContext());
        if (groupId === previousGroupId) {
            return;
        }
        this.removeMeasuringSubscribers(subscriber);
        this.addMeasuringSubscribers(subscriber);
    };
    MeasuringHandler.prototype.removeMeasuringSubscribers = function (subscriber) {
        var _a, _b, _c, _d;
        if (!this._subscribers || !subscriber) {
            return;
        }
        var groupId = _getGroupId(subscriber.getContext());
        var subscribersInGroupId = this._subscribers[groupId];
        if (!subscribersInGroupId) {
            return;
        }
        var index = subscribersInGroupId.indexOf(subscriber);
        if (index > -1) {
            subscribersInGroupId.splice(index, 1);
            (_b = (_a = this._previousDimensions) === null || _a === void 0 ? void 0 : _a[groupId]) === null || _b === void 0 ? void 0 : _b.delete(subscriber);
            this._groupIdBySubscriber.delete(subscriber);
            if (subscribersInGroupId.length === 0) {
                delete this._subscribers[groupId];
            }
            if (((_d = (_c = this._previousDimensions) === null || _c === void 0 ? void 0 : _c[groupId]) === null || _d === void 0 ? void 0 : _d.size) === 0) {
                delete this._previousDimensions[groupId];
            }
        }
    };
    MeasuringHandler.prototype.scheduleMeasuringUpdate = function () {
        this._schedule();
    };
    MeasuringHandler.prototype.flushPendingMeasuringNotifications = function (requestedGroupId) {
        var _a, _b;
        var groupsToFlush = [_getGroupId()];
        if (requestedGroupId) {
            groupsToFlush.push(requestedGroupId);
        }
        var numOfUpdates = 0;
        for (var _i = 0, groupsToFlush_1 = groupsToFlush; _i < groupsToFlush_1.length; _i++) {
            var groupId = groupsToFlush_1[_i];
            var numOfUpdatesInGroup = (_b = (_a = this._pendingUpdates[groupId]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            numOfUpdates += numOfUpdatesInGroup;
            for (var i = 0; i < numOfUpdatesInGroup; i++) {
                this._pendingUpdates[groupId][i]();
            }
            delete this._pendingUpdates[groupId];
            delete this._pendingSubscribers[groupId];
        }
        return numOfUpdates;
    };
    MeasuringHandler.prototype.takeMeasurements = function (requestedGroupId) {
        var _a, _b, _c;
        var groupsToFlush = [_getGroupId()];
        if (requestedGroupId) {
            groupsToFlush.push(requestedGroupId);
        }
        for (var _i = 0, groupsToFlush_2 = groupsToFlush; _i < groupsToFlush_2.length; _i++) {
            var groupId = groupsToFlush_2[_i];
            if ((_a = this._subscribers) === null || _a === void 0 ? void 0 : _a[groupId]) {
                for (var i = 0; i < this._subscribers[groupId].length; i++) {
                    var subscriber = this._subscribers[groupId][i];
                    var element = subscriber.getComponent();
                    if (element) {
                        var elementDimension = (_b = this._previousDimensions[groupId]) === null || _b === void 0 ? void 0 : _b.get(subscriber);
                        var dimension = element.getBoundingClientRect();
                        var width = dimension.width;
                        var height = dimension.height;
                        if (!elementDimension ||
                            elementDimension.Width !== width ||
                            elementDimension.Height !== height ||
                            this._subscribers[groupId][i].forceMeasure) {
                            var previousUpdateIndex = (_c = this._pendingSubscribers[groupId]) === null || _c === void 0 ? void 0 : _c.indexOf(subscriber);
                            if (previousUpdateIndex > -1) {
                                this._pendingSubscribers[groupId].splice(previousUpdateIndex, 1);
                                this._pendingUpdates[groupId].splice(previousUpdateIndex, 1);
                            }
                            if (!this._previousDimensions[groupId]) {
                                this._previousDimensions[groupId] = new Map();
                            }
                            if (!this._pendingUpdates[groupId]) {
                                this._pendingUpdates[groupId] = [];
                            }
                            if (!this._pendingSubscribers[groupId]) {
                                this._pendingSubscribers[groupId] = [];
                            }
                            this._previousDimensions[groupId].set(subscriber, { Width: width, Height: height });
                            this._pendingUpdates[groupId].push(subscriber.onMeasure.bind(subscriber, width, height));
                            this._pendingSubscribers[groupId].push(subscriber);
                        }
                    }
                }
            }
        }
    };
    return MeasuringHandler;
}());
function _getGroupId(context) {
    var _a;
    return (_a = context === null || context === void 0 ? void 0 : context.groupId) !== null && _a !== void 0 ? _a : DEFAULT_GROUP_ID;
}
var MeasuringHandlerContext = React.createContext({});
export { MeasuringHandler, MeasuringHandlerContext };
