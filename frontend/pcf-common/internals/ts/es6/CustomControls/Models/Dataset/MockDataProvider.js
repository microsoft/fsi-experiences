var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DataSetFactory } from "./DataSetFactory";
var MockDataProvider = (function () {
    function MockDataProvider(entityName, maxRecords, newRecord) {
        this._selectedRecordIds = [];
        this.viewId = "";
        this._entityName = entityName;
        this._maxRecords = maxRecords;
        this._records = {};
        this._newRecord = newRecord || MockDataSetEntityRecord;
    }
    MockDataProvider.prototype.getEntityName = function () {
        return this._entityName;
    };
    MockDataProvider.prototype.saveMultipleRecords = function (records) {
        var count = records === null || records === void 0 ? void 0 : records.length;
        console.log("saveMultipleRecords called with " + count + " records");
        return Promise.resolve([]);
    };
    MockDataProvider.prototype.getRecords = function (query) {
        if (query.columns.length === 0) {
            var dataseterror = {
                errorMessage: "No columns",
            };
            return Promise.reject(dataseterror);
        }
        var availablePages = this._maxRecords / query.pagingDetails.pageSize;
        if (query.pagingDetails.lastPageNumber > availablePages) {
            var dataseterror = {
                errorMessage: "Incorrect pages",
            };
            return Promise.reject(dataseterror);
        }
        var columnNames = query.columns.map(function (c) { return c.name; });
        var sortedIds = [];
        var pageCount = query.pagingDetails.lastPageNumber - query.pagingDetails.firstPageNumber + 1;
        for (var i = 0; i < query.pagingDetails.pageSize * pageCount; i++) {
            this._records[i] = new this._newRecord(columnNames, i.toString(), this._entityName);
            sortedIds.push(i.toString());
        }
        var queryResult = {
            queryId: query.queryId,
            records: this._records,
            sortedRecordIds: sortedIds,
            hasNextPage: !(query.pagingDetails.lastPageNumber >= availablePages),
            totalRecordCount: this._maxRecords,
        };
        return Promise.resolve(queryResult);
    };
    MockDataProvider.prototype.getMetadata = function (columnNames) {
        console.log("getMetadata called with columnNames ", columnNames);
        return Promise.resolve(null);
    };
    MockDataProvider.prototype.newRecord = function () {
        console.log("newRecord called");
        return Promise.resolve(null);
    };
    MockDataProvider.prototype.delete = function (recordIds) {
        console.log("delete called with recordIds", recordIds);
        return Promise.resolve(null);
    };
    MockDataProvider.prototype.getCapabilities = function () {
        return {
            isEditable: true,
            isFilterable: true,
            isSortable: true,
            canPaginate: true,
            canCreateNewRecords: true,
            hasRecordNavigation: false,
            hasCellImageInfo: false,
        };
    };
    MockDataProvider.prototype.setSelectedRecordIds = function (_ids) {
        this._selectedRecordIds = _ids;
    };
    MockDataProvider.prototype.getSelectedRecordIds = function () {
        return this._selectedRecordIds;
    };
    MockDataProvider.prototype.clearSelectedRecordIds = function () {
        this._selectedRecordIds = [];
    };
    MockDataProvider.prototype.getRelatedDataSet = function (_column, _updateCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var primaryColumn, query, config;
            return __generator(this, function (_a) {
                primaryColumn = {
                    name: "column1",
                    alias: "Column1",
                    dataType: "SingleLine.Text",
                    displayName: "Column1",
                    order: 1,
                    visualSizeFactor: 1,
                    isPrimary: true,
                };
                query = {
                    columns: [primaryColumn],
                    sortDetails: [],
                    filters: null,
                    pagingDetails: {
                        pageNumber: 1,
                        pageSize: 25,
                        retrieveTotalRecordCount: true,
                    },
                };
                config = {
                    initQuery: query,
                    events: {
                        dataSetUpdatedCallback: _updateCallback,
                    },
                };
                return [2, Promise.resolve([DataSetFactory.getDataSet(this, config)])];
            });
        });
    };
    MockDataProvider.prototype.newDataSet = function (updateCallback, initQuery) {
        var _a;
        var config = {
            initQuery: initQuery,
            events: {
                dataSetUpdatedCallback: updateCallback,
            },
        };
        var newProvider = new MockDataProvider(this._entityName, this._maxRecords);
        newProvider.viewId = ((_a = initQuery) === null || _a === void 0 ? void 0 : _a.viewId) || "";
        return Promise.resolve(DataSetFactory.getDataSet(newProvider, config));
    };
    MockDataProvider.prototype.destroy = function () {
        this._records = null;
    };
    MockDataProvider.prototype.getTitle = function () {
        return "";
    };
    MockDataProvider.prototype.getViewId = function () {
        return this.viewId;
    };
    return MockDataProvider;
}());
var randomValue = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
var MockDataSetEntityRecord = (function () {
    function MockDataSetEntityRecord(columnNames, id, entityName) {
        var _this = this;
        this._columns = columnNames;
        this._recordId = { guid: id };
        this._record = {};
        this._etn = entityName;
        this._columns.forEach(function (column) {
            _this._record[column] = randomValue();
        });
    }
    MockDataSetEntityRecord.prototype.getRecordId = function () {
        return this._recordId.guid;
    };
    MockDataSetEntityRecord.prototype.getNamedReference = function () {
        return {
            name: "",
            id: this._recordId,
            etn: this._etn,
        };
    };
    MockDataSetEntityRecord.prototype.getValue = function (columnName) {
        return this._record[columnName];
    };
    MockDataSetEntityRecord.prototype.getFormattedValue = function (columnName) {
        return this._record[columnName];
    };
    MockDataSetEntityRecord.prototype.getColumnInfo = function (_columnName) {
        return Promise.reject("Not implemented");
    };
    MockDataSetEntityRecord.prototype.getChanges = function () {
        return {};
    };
    MockDataSetEntityRecord.prototype.setValue = function (_columnName, _value) {
        return Promise.resolve();
    };
    MockDataSetEntityRecord.prototype.isDirty = function () {
        return false;
    };
    MockDataSetEntityRecord.prototype.isValid = function () {
        return true;
    };
    MockDataSetEntityRecord.prototype.save = function () {
        return Promise.resolve(this);
    };
    return MockDataSetEntityRecord;
}());
var MockDataProviderWithCachedDataSet = (function (_super) {
    __extends(MockDataProviderWithCachedDataSet, _super);
    function MockDataProviderWithCachedDataSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockDataProviderWithCachedDataSet.prototype.setCachedDataSet = function (dataSet) {
        this._cachedDataSet = dataSet;
    };
    MockDataProviderWithCachedDataSet.prototype.getRecords = function (query) {
        var queryResult = _super.prototype.getRecords.call(this, query);
        var extraColumn = {
            name: "extracolumn",
            displayName: "extracolumn",
            dataType: "testType",
            alias: "extracolumn",
            order: 1,
            visualSizeFactor: 0,
        };
        this._cachedDataSet.columns.push(extraColumn);
        return queryResult;
    };
    return MockDataProviderWithCachedDataSet;
}(MockDataProvider));
var MockDataProviderWithOptionalAPIs = (function (_super) {
    __extends(MockDataProviderWithOptionalAPIs, _super);
    function MockDataProviderWithOptionalAPIs(entityName, maxRecords) {
        return _super.call(this, entityName, maxRecords, MockDataSetEntityRecordWithOptionalAPIs) || this;
    }
    MockDataProviderWithOptionalAPIs.prototype.getCapabilities = function () {
        return {
            isEditable: true,
            isFilterable: true,
            isSortable: true,
            canPaginate: true,
            canCreateNewRecords: true,
            hasRecordNavigation: true,
            hasCellImageInfo: true,
        };
    };
    return MockDataProviderWithOptionalAPIs;
}(MockDataProvider));
var MockDataSetEntityRecordWithOptionalAPIs = (function (_super) {
    __extends(MockDataSetEntityRecordWithOptionalAPIs, _super);
    function MockDataSetEntityRecordWithOptionalAPIs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockDataSetEntityRecordWithOptionalAPIs.prototype.getCellImageInfo = function (columnName, userLcid) {
        return Promise.resolve({
            Url: columnName + ".png",
            Tooltip: userLcid + ".resx",
        });
    };
    return MockDataSetEntityRecordWithOptionalAPIs;
}(MockDataSetEntityRecord));
var MockDataProviderWithDynamicDataSetCapabilities = (function (_super) {
    __extends(MockDataProviderWithDynamicDataSetCapabilities, _super);
    function MockDataProviderWithDynamicDataSetCapabilities() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockDataProviderWithDynamicDataSetCapabilities.prototype.getCapabilities = function () {
        var _this = this;
        return __assign(__assign({}, _super.prototype.getCapabilities.call(this)), { dynamicDataSets: {
                canCreateDynamicDataSets: true,
                getDynamicDataSetCapabilities: function () { return _super.prototype.getCapabilities.call(_this); },
            } });
    };
    return MockDataProviderWithDynamicDataSetCapabilities;
}(MockDataProvider));
export { MockDataProvider, MockDataSetEntityRecord, MockDataProviderWithCachedDataSet, MockDataProviderWithOptionalAPIs, MockDataSetEntityRecordWithOptionalAPIs, MockDataProviderWithDynamicDataSetCapabilities, };
