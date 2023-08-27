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
import { instance as TelemetryReporter } from "../Reporting/TelemetryReporter";
import { arraysEqualIgnoringOrder } from "../../Utilities/ArrayHelper";
import { instance as RootAppProxy } from "../../Utilities/RootAppProxy";
import { LinkEntityDetailsList } from "./LinkEntityDetailsList";
import { GroupingDetailsList } from "./GroupingDetailsList";
import { AggregationDetailsList } from "./AggregationDetailsList";
import { TelemetryUsageCounter } from "../Reporting/TelemetryUsageCounter";
var DEFAULT_PAGE_SIZE = 25;
var DEFAULT_PAGE_NUMBER = 1;
var NO_DATA_SOURCE_ERROR_MESSAGE = "Data source is not configured";
var TELEMETRY_COMPONENT_NAME = "ModernDataSet";
var OPTIONAL_RECORD_API_FLAGS = {
    getCellImageInfo: "hasCellImageInfo",
};
var DataSetState;
(function (DataSetState) {
    DataSetState[DataSetState["Available"] = 0] = "Available";
    DataSetState[DataSetState["Busy"] = 1] = "Busy";
    DataSetState[DataSetState["Error"] = 2] = "Error";
    DataSetState[DataSetState["Destroyed"] = 3] = "Destroyed";
})(DataSetState || (DataSetState = {}));
var lookupTypes = ["lookup", "customer", "owner", "regarding", "partylist"];
var DataSetObjectWrapper = (function () {
    function DataSetObjectWrapper(provider, configuration, previousWrapper) {
        this._updatedProperties = [];
        this._columns = [];
        this._records = {};
        this._sortedRecordIds = [];
        this._error = false;
        this._errorMessage = "";
        this._loading = false;
        this._updateOnQueryId = -1;
        this._commandSelectionOnlySelection = [];
        this._additionalColumns = [];
        this._usageCounter = new TelemetryUsageCounter(TELEMETRY_COMPONENT_NAME);
        this._dataProvider = provider;
        this._configuration = configuration;
        var addUpdatedProperty = this._addUpdatedProperty.bind(this);
        this._linkingDetails = new LinkEntityDetailsList(addUpdatedProperty);
        this._groupingDetails = new GroupingDetailsList(addUpdatedProperty);
        this._aggregationDetails = new AggregationDetailsList(addUpdatedProperty);
        if (this._configuration.initQuery) {
            this._setupFromInitQuery(previousWrapper);
        }
        if (configuration.initializeCommanding) {
            this._commandingIntialization = this._initializeCommanding();
        }
        if (!this._dataProvider) {
            this._moveToState({ uniqueId: -1, state: DataSetState.Error, message: NO_DATA_SOURCE_ERROR_MESSAGE });
        }
        else {
            this._moveToState({ uniqueId: -1, state: DataSetState.Available });
        }
    }
    DataSetObjectWrapper.prototype.getDataSet = function (forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (!this._dataset || forceRefresh) {
            this._dataset = this._generateDataset();
        }
        return this._dataset;
    };
    DataSetObjectWrapper.prototype.setControlReRender = function (controlReRender) {
        this.requestRerender = controlReRender;
    };
    DataSetObjectWrapper.prototype.requestRerender = function (_callback) { };
    DataSetObjectWrapper.prototype.destroy = function () {
        this._moveToState({ uniqueId: -1, state: DataSetState.Destroyed });
        if (!this._isReplaced) {
            this._usageCounter.reportUsageCounters("PCF_dataset_usage");
        }
        this._pagingDetails = null;
        this._filteringDetails = null;
        this._linkingDetails = null;
        this._groupingDetails = null;
        this._aggregationDetails = null;
        this._sortingDetails = null;
        this._configuration = null;
        this._updatedProperties = null;
        this._setColumns(null);
        this._records = null;
        this._sortedRecordIds = null;
        if (this._dataSetCommandManager) {
            this._dataSetCommandManager.dispose();
            this._dataSetCommandManager = null;
        }
        if (this._dataSetRecordCommandManager) {
            this._dataSetRecordCommandManager.dispose();
            this._dataSetRecordCommandManager = null;
        }
    };
    DataSetObjectWrapper.prototype._addControlNameToTelemetry = function (eventParameters) {
        if (!eventParameters) {
            eventParameters = [];
        }
        eventParameters.push({
            name: "controlName",
            value: TELEMETRY_COMPONENT_NAME,
        });
        return eventParameters;
    };
    DataSetObjectWrapper.prototype._reportEventSuccess = function (eventName, eventParameters) {
        TelemetryReporter.reportEventSuccess(eventName, this._addControlNameToTelemetry(eventParameters));
    };
    DataSetObjectWrapper.prototype._reportEventFailure = function (eventName, eventParameters) {
        TelemetryReporter.reportEventFailure(eventName, this._addControlNameToTelemetry(eventParameters));
    };
    DataSetObjectWrapper.prototype._setupFromInitQuery = function (previousWrapper) {
        var _a = this._configuration.initQuery, columns = _a.columns, sortDetails = _a.sortDetails, pagingDetails = _a.pagingDetails, filters = _a.filters, linkingDetails = _a.linkingDetails, grouping = _a.grouping, aggregation = _a.aggregation;
        this._setColumns(columns);
        this._sortingDetails = sortDetails;
        var _b = pagingDetails || {}, pageSize = _b.pageSize, pageNumber = _b.pageNumber, firstPageNumber = _b.firstPageNumber, lastPageNumber = _b.lastPageNumber;
        this._pagingDetails = {
            pageSize: pageSize || DEFAULT_PAGE_SIZE,
            firstPageNumber: firstPageNumber || pageNumber || DEFAULT_PAGE_NUMBER,
            lastPageNumber: lastPageNumber || firstPageNumber || pageNumber || DEFAULT_PAGE_NUMBER,
            totalResultCount: -1,
            hasNextPage: false,
            hasPreviousPage: false,
        };
        this._filteringDetails = {
            filterExpression: filters,
        };
        this._linkingDetails.addRange(linkingDetails);
        this._groupingDetails.addRange(grouping);
        this._aggregationDetails.addRange(aggregation);
        this.getDataSet();
        if (previousWrapper && previousWrapper._state !== DataSetState.Destroyed) {
            this._checkIfColumnsUpdatedAndAddToList(previousWrapper._dataset.columns);
            this._checkIfSortingUpdatedAndAddToList(previousWrapper._getSortingDetails());
            this._checkIfFilteringUpdatedAndAddToList(previousWrapper._filteringDetails.filterExpression);
            this._checkIfPagingUpdatedAndAddToList(previousWrapper._pagingDetails);
            this._usageCounter = previousWrapper._usageCounter;
            previousWrapper._isReplaced = true;
        }
    };
    DataSetObjectWrapper.prototype.injectDummyRecord = function (id, record) {
        if (this._records[id])
            return false;
        this._records[id] = record;
        this._sortedRecordIds.push(id);
        this.getDataSet(true);
        return true;
    };
    DataSetObjectWrapper.prototype.removeDummyRecords = function (expectedStartId) {
        if (expectedStartId === void 0) { expectedStartId = "DUMMY0"; }
        var dummyStartIdx = this._sortedRecordIds.indexOf(expectedStartId);
        if (dummyStartIdx < 0)
            return;
        var dummyIndexes = this._sortedRecordIds.splice(dummyStartIdx);
        for (var _i = 0, dummyIndexes_1 = dummyIndexes; _i < dummyIndexes_1.length; _i++) {
            var idx = dummyIndexes_1[_i];
            delete this._records[idx];
        }
        this.getDataSet(true);
    };
    DataSetObjectWrapper.prototype._generateDataset = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        var dataset = this._usageCounter
            .makeBuilder()
            .withProperties({
            columns: JSON.parse(JSON.stringify(this._columns)),
            records: this._generateDataSetRecords(),
            sortedRecordIds: this._sortedRecordIds,
            error: this._error,
            loading: this._loading,
            errorMessage: this._errorMessage,
            errorCode: this._errorCode,
            sorting: this._getSortingDetails(true),
            refresh: this.refresh,
            getSelectedRecordIds: this._getSelectedRecordIds,
            setSelectedRecordIds: this._setSelectedRecordIds,
            clearSelectedRecordIds: this._clearSelectedRecordIds,
            addColumn: this._addColumn,
            newRecord: this._newRecord,
            delete: this._delete,
            getDataSetCapabilities: this._getDataSetCapabilities,
            getTargetEntityType: this._getTargetEntityType,
            getRelatedDataSet: this._getRelatedDataSet,
            newDataSet: this._newDataSet,
            cloneDataSet: this._cloneDataSet,
            saveMultipleRecords: this._saveMultipleRecords,
            openDatasetItem: this._openDatasetItem,
            getCommands: this._getCommands,
            getViewId: function () { var _a, _b; return (_b = (_a = _this._dataProvider) === null || _a === void 0 ? void 0 : _a.getViewId) === null || _b === void 0 ? void 0 : _b.call(_a); },
            getTitle: function () { var _a, _b; return (_b = (_a = _this._dataProvider) === null || _a === void 0 ? void 0 : _a.getTitle) === null || _b === void 0 ? void 0 : _b.call(_a); },
        })
            .withNestedProperties("paging", {
            totalResultCount: (_a = this._pagingDetails) === null || _a === void 0 ? void 0 : _a.totalResultCount,
            firstPageNumber: (_b = this._pagingDetails) === null || _b === void 0 ? void 0 : _b.firstPageNumber,
            lastPageNumber: (_c = this._pagingDetails) === null || _c === void 0 ? void 0 : _c.lastPageNumber,
            pageSize: (_d = this._pagingDetails) === null || _d === void 0 ? void 0 : _d.pageSize,
            hasNextPage: (_e = this._pagingDetails) === null || _e === void 0 ? void 0 : _e.hasNextPage,
            hasPreviousPage: ((_f = this._pagingDetails) === null || _f === void 0 ? void 0 : _f.firstPageNumber) > 1,
            loadExactPage: this._loadExactPage,
            loadNextPage: this._loadNextPage,
            loadPreviousPage: this._loadPreviousPage,
            setPageSize: this._setPageSize,
            reset: this._resetPaging,
            pageNumber: (_g = this._pagingDetails) === null || _g === void 0 ? void 0 : _g.firstPageNumber,
        })
            .withNestedProperties("filtering", {
            setFilter: this._setFilter,
            getFilter: this._getFilter,
            clearFilter: this._clearFilter,
        })
            .withNestedProperties("linking", this._linkingDetails.asDataSetLinking())
            .withNestedProperties("grouping", this._groupingDetails.asDataSetGrouping())
            .withNestedProperties("aggregation", this._aggregationDetails.asDataSetAggregation())
            .withReceiver(this)
            .build();
        this._addDataProviderPrivateApisToDataSet(dataset);
        return dataset;
    };
    DataSetObjectWrapper.prototype._setColumns = function (newColumns) {
        var _a;
        this._columns = newColumns;
        var orderedColumns = newColumns === null || newColumns === void 0 ? void 0 : newColumns.filter(function (_a) {
            var name = _a.name, order = _a.order;
            return name && order > -1;
        }).sort(function (lhs, rhs) { return lhs.order - rhs.order; });
        this._defaultSortingColumnName = (_a = orderedColumns === null || orderedColumns === void 0 ? void 0 : orderedColumns[0]) === null || _a === void 0 ? void 0 : _a.name;
    };
    DataSetObjectWrapper.prototype._getSortingDetails = function (copy) {
        var _a;
        if ((_a = this._sortingDetails) === null || _a === void 0 ? void 0 : _a.length) {
            return copy ? JSON.parse(JSON.stringify(this._sortingDetails)) : this._sortingDetails;
        }
        if (this._defaultSortingColumnName) {
            return [
                {
                    name: this._defaultSortingColumnName,
                    sortDirection: 0,
                },
            ];
        }
        return [];
    };
    DataSetObjectWrapper.prototype._addDataProviderPrivateApisToDataSet = function (dataset) {
        var dataprovider = this._dataProvider;
        var datasetWithPrivateApis = dataset;
        if (dataprovider === null || dataprovider === void 0 ? void 0 : dataprovider.privateApis) {
            datasetWithPrivateApis.privateApis = {};
            Object.keys(dataprovider.privateApis).forEach(function (key) {
                datasetWithPrivateApis.privateApis[key] = dataprovider.privateApis[key];
            });
        }
        return datasetWithPrivateApis;
    };
    DataSetObjectWrapper.prototype._commandsUpdated = function () {
        this._addUpdatedProperty("commands");
        this._updateDataSet();
    };
    DataSetObjectWrapper.prototype._initializeCommanding = function () {
        return __awaiter(this, void 0, void 0, function () {
            var createCommandManager, dataProvider, selectionOnlyDataProvider, mainContext, selectionOnlyContext, _a, dataSetCommandManager, dataSetRecordCommandManager, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        createCommandManager = RootAppProxy.Commanding.createCommandManager;
                        if (!createCommandManager)
                            return [2];
                        dataProvider = {
                            getEntityName: function () {
                                return _this._dataProvider.getEntityName();
                            },
                            getSelectedRecordIds: function () {
                                return _this._getSelectedRecordIds();
                            },
                            getRecords: function () {
                                return _this._records;
                            },
                            getRecordCount: function () {
                                return _this._pagingDetails.totalResultCount;
                            },
                            refresh: function () {
                                _this.refresh();
                            },
                        };
                        selectionOnlyDataProvider = {
                            getEntityName: function () {
                                return _this._dataProvider.getEntityName();
                            },
                            getSelectedRecordIds: function () {
                                return _this._commandSelectionOnlySelection;
                            },
                            getRecords: function () {
                                return _this._records;
                            },
                            getRecordCount: function () {
                                return _this._pagingDetails.totalResultCount;
                            },
                            refresh: function () {
                                _this.refresh();
                            },
                        };
                        mainContext = {
                            type: "HomePageGrid",
                            provider: dataProvider,
                            onExternalContextChange: this._commandsUpdated.bind(this),
                        };
                        selectionOnlyContext = {
                            type: "HomePageGrid",
                            provider: selectionOnlyDataProvider,
                            onExternalContextChange: this._commandsUpdated.bind(this),
                        };
                        return [4, Promise.all([
                                createCommandManager(mainContext),
                                createCommandManager(selectionOnlyContext),
                            ])];
                    case 1:
                        _a = _b.sent(), dataSetCommandManager = _a[0], dataSetRecordCommandManager = _a[1];
                        this._dataSetCommandManager = dataSetCommandManager;
                        this._dataSetRecordCommandManager = dataSetRecordCommandManager;
                        return [3, 3];
                    case 2:
                        e_1 = _b.sent();
                        this._reportEventFailure("PCF_dataset_init_commanding", [{ name: "message", value: e_1.message }]);
                        throw e_1;
                    case 3: return [2];
                }
            });
        });
    };
    DataSetObjectWrapper.prototype._getCommands = function (recordIds) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this._commandingIntialization === undefined)
                            throw new Error("Commanding is not initialized");
                        return [4, this._commandingIntialization];
                    case 1:
                        _b.sent();
                        if (recordIds) {
                            this._commandSelectionOnlySelection = recordIds;
                            return [2, this._dataSetRecordCommandManager.getCommands()];
                        }
                        return [2, (_a = this._dataSetCommandManager) === null || _a === void 0 ? void 0 : _a.getCommands()];
                }
            });
        });
    };
    DataSetObjectWrapper.prototype._moveToState = function (newState) {
        switch (newState.state) {
            case DataSetState.Available:
                if (newState.uniqueId && this._updateOnQueryId === newState.uniqueId) {
                    this._loading = false;
                    this._error = false;
                    this._errorMessage = "";
                    this._errorCode = undefined;
                    this.getDataSet().loading = false;
                }
                break;
            case DataSetState.Busy:
                this._loading = true;
                this._error = false;
                this._errorMessage = "";
                this._errorCode = undefined;
                this.getDataSet().loading = true;
                break;
            case DataSetState.Error:
            case DataSetState.Destroyed:
                this._loading = false;
                this._error = true;
                this._errorMessage = newState.message;
                this._errorCode = newState.errorCode;
                this.getDataSet().error = true;
                this.getDataSet().loading = false;
                this.getDataSet().errorMessage = newState.message;
                this.getDataSet().errorCode = newState.errorCode;
                break;
        }
        this._state = newState.state;
    };
    DataSetObjectWrapper.prototype._generateDataSetRecords = function () {
        var datasetRecords = {};
        var recordBuilder = this._usageCounter.makeBuilder();
        for (var id in this._records) {
            var record = this._records[id];
            datasetRecords[id] = this._generateDataSetRecordForDataSet(recordBuilder, record);
        }
        return datasetRecords;
    };
    DataSetObjectWrapper.prototype._generateDataSetRecordForDataSet = function (recordBuilder, record) {
        recordBuilder
            .withProperties({
            getRecordId: record.getRecordId,
            getNamedReference: record.getNamedReference,
            getValue: record.getValue,
            getFormattedValue: record.getFormattedValue,
            getColumnInfo: record.getColumnInfo,
            setValue: record.setValue,
            isDirty: record.isDirty,
            isValid: record.isValid,
            save: record.save,
            getChanges: record.getChanges,
        })
            .withReceiver(record);
        this._addOptionalRecordAPIs(recordBuilder, record);
        return recordBuilder.build();
    };
    DataSetObjectWrapper.prototype._addOptionalRecordAPIs = function (recordBuilder, record) {
        var _this = this;
        var _loop_1 = function (key) {
            var apiName = key;
            var flag = OPTIONAL_RECORD_API_FLAGS[apiName];
            recordBuilder.withProperty(apiName, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var method = record[apiName];
                _this._throwIfNotSupported(apiName, method && !!_this._getDataSetCapabilities()[flag]);
                return method.apply(record, args);
            });
        };
        for (var key in OPTIONAL_RECORD_API_FLAGS) {
            _loop_1(key);
        }
    };
    DataSetObjectWrapper.prototype._runPreRefreshChecks = function () {
        if (!this._ensureDataSetProviderAvailable("refresh")) {
            return;
        }
        if (this._state === DataSetState.Destroyed) {
            var telemetryEventParams = [
                { name: "message", value: "Invoking function from a destroyed dataset" },
            ];
            this._reportEventFailure("PCF_dataset_refresh", telemetryEventParams);
            return;
        }
        this._moveToState({ state: DataSetState.Busy });
        this._tryUpdateSorting();
        this._tryUpdateColumns();
        this._clearSelectedRecordIds();
        this._updateOnQueryId = Math.random();
    };
    DataSetObjectWrapper.prototype._generateRefreshQuery = function () {
        var queryColumns = this._columns.filter(function (column) { return !!column.name; });
        this._additionalColumns.forEach(function (column) {
            if (!queryColumns.find(function (queryColumn) { return queryColumn.name === column.name && queryColumn.alias === column.alias; })) {
                queryColumns.push({
                    name: column.name,
                    displayName: null,
                    dataType: null,
                    alias: column.alias,
                    order: -1,
                    visualSizeFactor: 0,
                });
            }
        });
        return {
            queryId: this._updateOnQueryId,
            columns: queryColumns,
            sortDetails: this._getSortingDetails(),
            pagingDetails: this.getPagingQueryDetails(),
            filters: this._getFilter(),
            linkingDetails: this._linkingDetails.get(),
            grouping: this._groupingDetails.get(),
            aggregation: this._aggregationDetails.get(),
        };
    };
    DataSetObjectWrapper.prototype.refresh = function (forceRefresh) {
        var _this = this;
        if (forceRefresh === void 0) { forceRefresh = true; }
        this._runPreRefreshChecks();
        var query = this._generateRefreshQuery();
        try {
            this._dataProvider
                .getRecords(query, forceRefresh)
                .then(function (queryResult) {
                _this._onGetRecordsSuccess(query.queryId, queryResult, _this._state !== DataSetState.Destroyed);
            })
                .catch(function (e) {
                _this._onGetRecordsFailure(e, query, _this._state !== DataSetState.Destroyed);
            });
        }
        catch (e) {
            this._onGetRecordsFailure(e, query, true);
        }
    };
    DataSetObjectWrapper.prototype.refreshWithAwait = function (forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = true; }
        return __awaiter(this, void 0, void 0, function () {
            var query, queryResult, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._runPreRefreshChecks();
                        query = this._generateRefreshQuery();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this._dataProvider.getRecords(query, forceRefresh)];
                    case 3:
                        queryResult = _a.sent();
                        this._onGetRecordsSuccess(query.queryId, queryResult, this._state !== DataSetState.Destroyed);
                        return [2, this._dataset];
                    case 4:
                        e_2 = _a.sent();
                        this._onGetRecordsFailure(e_2, query, this._state !== DataSetState.Destroyed);
                        return [3, 5];
                    case 5: return [3, 7];
                    case 6:
                        e_3 = _a.sent();
                        this._onGetRecordsFailure(e_3, query, true);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    DataSetObjectWrapper.prototype._onGetRecordsSuccess = function (queryId, queryResult, isStateAvailable) {
        if (isStateAvailable) {
            this._processQueryResult(queryResult);
            this._moveToState({ uniqueId: queryResult.queryId, state: DataSetState.Available });
            this._onDataSetUpdated(queryId);
            this._reportEventSuccess("PCF_dataset_refresh");
        }
    };
    DataSetObjectWrapper.prototype._onGetRecordsFailure = function (e, query, isStateAvailable) {
        var errorMessage = e.message || e.errorMessage || "Unknown error while fetching records";
        if (isStateAvailable) {
            this._moveToState({
                uniqueId: query.queryId,
                state: DataSetState.Error,
                message: errorMessage,
                errorCode: e.errorCode,
            });
            this._onDataSetUpdated(query.queryId);
        }
        var telemetryEventParams = [{ name: "message", value: errorMessage }];
        this._reportEventFailure("PCF_dataset_refresh", telemetryEventParams);
    };
    DataSetObjectWrapper.prototype._onDataSetUpdated = function (uniqueId) {
        if (uniqueId !== this._updateOnQueryId) {
            return;
        }
        this._updateDataSet();
    };
    DataSetObjectWrapper.prototype._updateDataSet = function () {
        var _a, _b;
        this._dataset = this._generateDataset();
        if ((_b = (_a = this._configuration) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.dataSetUpdatedCallback) {
            var clonedUpdateProps = Object.assign([], this._updatedProperties);
            this._reportEventSuccess("PCF_dataset_updatecallback_called");
            this._configuration.events.dataSetUpdatedCallback(this._dataset, clonedUpdateProps);
        }
        this._updatedProperties = [];
    };
    DataSetObjectWrapper.prototype._processQueryResult = function (queryResult) {
        var _this = this;
        this._addUpdatedProperty("records");
        this._records = queryResult.records;
        this._sortedRecordIds = [];
        var tempIdMap = new Map();
        queryResult.sortedRecordIds.forEach(function (id) {
            if (!tempIdMap.has(id)) {
                _this._sortedRecordIds.push(id);
                tempIdMap.set(id, true);
            }
        });
        this._pagingDetails.hasNextPage = queryResult.hasNextPage;
        this._pagingDetails.totalResultCount = queryResult.totalRecordCount;
        this._tryUpdateColumns();
    };
    DataSetObjectWrapper.prototype._setSelectedRecordIds = function (recordIds) {
        if (!this._ensureDataSetProviderAvailable("setSelectedRecordIds")) {
            return;
        }
        this._isNewSelection(recordIds) && this._dataProvider.setSelectedRecordIds(recordIds);
    };
    DataSetObjectWrapper.prototype._getSelectedRecordIds = function () {
        if (!this._ensureDataSetProviderAvailable("getSelectedRecordIds")) {
            return [];
        }
        return this._dataProvider.getSelectedRecordIds();
    };
    DataSetObjectWrapper.prototype._clearSelectedRecordIds = function () {
        if (!this._ensureDataSetProviderAvailable("clearSelectedRecordIds")) {
            return;
        }
        this._isNewSelection() && this._dataProvider.clearSelectedRecordIds();
    };
    DataSetObjectWrapper.prototype._isNewSelection = function (recordIds) {
        var _a;
        if (recordIds === void 0) { recordIds = []; }
        return arraysEqualIgnoringOrder((_a = this._dataProvider.getSelectedRecordIds()) !== null && _a !== void 0 ? _a : [], recordIds) === false;
    };
    DataSetObjectWrapper.prototype._getTargetEntityType = function () {
        if (!this._ensureDataSetProviderAvailable("getTargetEntityType")) {
            return null;
        }
        return this._dataProvider.getEntityName();
    };
    DataSetObjectWrapper.prototype._loadExactPage = function (pageNumber) {
        this._loadPageRange(pageNumber, pageNumber, true);
    };
    DataSetObjectWrapper.prototype._loadPreviousPage = function (loadOnlyNewPage) {
        var _a = this._pagingDetails, firstPageNumber = _a.firstPageNumber, lastPageNumber = _a.lastPageNumber;
        var newPage = firstPageNumber - 1;
        if (loadOnlyNewPage) {
            this._loadPageRange(newPage, newPage, true);
        }
        else {
            this._loadPageRange(newPage, lastPageNumber);
        }
    };
    DataSetObjectWrapper.prototype._loadNextPage = function (loadOnlyNewPage) {
        var _a = this._pagingDetails, firstPageNumber = _a.firstPageNumber, lastPageNumber = _a.lastPageNumber;
        var newPage = lastPageNumber + 1;
        if (loadOnlyNewPage) {
            this._loadPageRange(newPage, newPage, true);
        }
        else {
            this._loadPageRange(firstPageNumber, newPage);
        }
    };
    DataSetObjectWrapper.prototype._loadPageRange = function (firstPageNumber, lastPageNumber, forceRefresh) {
        var _a;
        if (forceRefresh === void 0) { forceRefresh = false; }
        if (isNaN(firstPageNumber) || firstPageNumber <= 0) {
            firstPageNumber = this._pagingDetails.firstPageNumber;
        }
        if (isNaN(lastPageNumber) || lastPageNumber <= 0) {
            lastPageNumber = this._pagingDetails.lastPageNumber;
        }
        if (firstPageNumber > lastPageNumber) {
            _a = [lastPageNumber, firstPageNumber], firstPageNumber = _a[0], lastPageNumber = _a[1];
        }
        this._pagingDetails.firstPageNumber = firstPageNumber;
        this._pagingDetails.lastPageNumber = lastPageNumber;
        this._addUpdatedProperty("page");
        this.refresh(forceRefresh);
    };
    DataSetObjectWrapper.prototype._setPageSize = function (pageSize) {
        if (pageSize > 0) {
            this._pagingDetails.pageSize = pageSize;
        }
    };
    DataSetObjectWrapper.prototype._setFilter = function (filter) {
        if (this._filteringDetails) {
            this._filteringDetails.filterExpression = filter;
        }
        else {
            this._filteringDetails = { filterExpression: filter };
        }
        this._addUpdatedProperty("filter");
    };
    DataSetObjectWrapper.prototype._getFilter = function () {
        var _a;
        return (_a = this._filteringDetails) === null || _a === void 0 ? void 0 : _a.filterExpression;
    };
    DataSetObjectWrapper.prototype._clearFilter = function () {
        this._setFilter(null);
    };
    DataSetObjectWrapper.prototype._getDataSetCapabilities = function () {
        if (!this._ensureDataSetProviderAvailable("getDataSetCapabilities")) {
            return {
                isEditable: false,
                isFilterable: false,
                isSortable: false,
                canPaginate: false,
                canCreateNewRecords: false,
                hasRecordNavigation: false,
                hasCellImageInfo: false,
            };
        }
        return this._dataProvider.getCapabilities();
    };
    DataSetObjectWrapper.prototype._saveMultipleRecords = function (records) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._throwIfNoDataProvider("saveMultipleRecords");
                return [2, this._dataProvider.saveMultipleRecords(records)];
            });
        });
    };
    DataSetObjectWrapper.prototype._addColumn = function (name, columnAlias) {
        if (columnAlias === void 0) { columnAlias = null; }
        if (name && !this._additionalColumns.find(function (column) { return column.alias === columnAlias && column.name === name; })) {
            this._additionalColumns.push({ alias: columnAlias || name, name: name });
        }
    };
    DataSetObjectWrapper.prototype._newRecord = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initialColumns;
            var _this = this;
            return __generator(this, function (_a) {
                this._throwIfNoDataProvider("newRecord");
                initialColumns = this._columns.map(function (column) { return column.name; });
                return [2, this._dataProvider.newRecord(initialColumns).then(function (record) {
                        var datasetRecord = _this._generateDataSetRecordForDataSet(_this._usageCounter.makeBuilder(), record);
                        _this._reportEventSuccess("PCF_dataset_newrecord_created");
                        return datasetRecord;
                    })];
            });
        });
    };
    DataSetObjectWrapper.prototype._delete = function (recordIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._throwIfNoDataProvider("delete");
                return [2, this._dataProvider.delete(recordIds)];
            });
        });
    };
    DataSetObjectWrapper.prototype._getRelatedDataSet = function (columnName, updateCallback, targetEntityName) {
        return __awaiter(this, void 0, void 0, function () {
            var column;
            return __generator(this, function (_a) {
                if (!this._ensureDataSetProviderAvailable("getRelatedDataSet")) {
                    return [2, null];
                }
                column = this._columns.find(function (c) { return c.name === columnName && lookupTypes.indexOf(c.dataType) > -1; });
                if (!column) {
                    return [2, null];
                }
                return [2, this._dataProvider.getRelatedDataSet(column, updateCallback, targetEntityName).then(function (dataset) {
                        return dataset;
                    })];
            });
        });
    };
    DataSetObjectWrapper.prototype._newDataSet = function (updateCallback, initQuery) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this._throwIfNotSupported("newDataSet", (_a = this._getDataSetCapabilities().dynamicDataSets) === null || _a === void 0 ? void 0 : _a.canCreateDynamicDataSets);
                return [2, this._dataProvider.newDataSet(updateCallback, initQuery)];
            });
        });
    };
    DataSetObjectWrapper.prototype._cloneDataSet = function (updateCallback, initQueryChanges) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var initQuery;
            return __generator(this, function (_b) {
                this._throwIfNotSupported("cloneDataSet", (_a = this._getDataSetCapabilities().dynamicDataSets) === null || _a === void 0 ? void 0 : _a.canCreateDynamicDataSets);
                initQuery = __assign(__assign({}, this._generateRefreshQuery()), { queryId: Math.random(), viewId: this._dataProvider.getViewId() });
                return [2, this._newDataSet(updateCallback, initQueryChanges ? __assign(__assign({}, initQuery), initQueryChanges) : initQuery)];
            });
        });
    };
    DataSetObjectWrapper.prototype._openDatasetItem = function (recordId) {
        this._configuration.events.recordSelectedCallback(recordId);
    };
    DataSetObjectWrapper.prototype._ensureDataSetProviderAvailable = function (methodName) {
        if (!this._dataProvider) {
            var telemetryEventParams = [
                { name: "message", value: "calling " + methodName + " without a data provider" },
            ];
            this._reportEventFailure("PCF_dataset_" + methodName, telemetryEventParams);
            return false;
        }
        return true;
    };
    DataSetObjectWrapper.prototype._throwIfNoDataProvider = function (methodName) {
        if (!this._ensureDataSetProviderAvailable(methodName)) {
            var error = { errorMessage: NO_DATA_SOURCE_ERROR_MESSAGE };
            throw error;
        }
    };
    DataSetObjectWrapper.prototype._throwIfNotSupported = function (methodName, isSupported) {
        this._throwIfNoDataProvider(methodName);
        if (!isSupported) {
            var error = {
                errorMessage: methodName + " is not supported on this dataset",
            };
            throw error;
        }
    };
    DataSetObjectWrapper.prototype.getPagingQueryDetails = function () {
        var _a, _b, _c;
        return {
            pageNumber: this._pagingDetails.firstPageNumber,
            firstPageNumber: this._pagingDetails.firstPageNumber,
            lastPageNumber: this._pagingDetails.lastPageNumber,
            pageSize: this._pagingDetails.pageSize,
            retrieveTotalRecordCount: ((_c = (_b = (_a = this._configuration) === null || _a === void 0 ? void 0 : _a.initQuery) === null || _b === void 0 ? void 0 : _b.pagingDetails) === null || _c === void 0 ? void 0 : _c.retrieveTotalRecordCount) || false,
        };
    };
    DataSetObjectWrapper.prototype.getUpdatedProperties = function () {
        return this._updatedProperties;
    };
    DataSetObjectWrapper.prototype._resetPaging = function () {
        this._pagingDetails.firstPageNumber = DEFAULT_PAGE_NUMBER;
        this._pagingDetails.lastPageNumber = DEFAULT_PAGE_NUMBER;
        this._loadExactPage(DEFAULT_PAGE_NUMBER);
    };
    DataSetObjectWrapper.prototype._tryUpdateColumns = function () {
        if (this._checkIfColumnsUpdatedAndAddToList()) {
            this._setColumns(this.getDataSet().columns);
        }
    };
    DataSetObjectWrapper.prototype._checkIfColumnsUpdatedAndAddToList = function (compareColumns) {
        return this._checkIfPropertyUpdatedAndAddToList("columns", this._columns, compareColumns || this._dataset.columns);
    };
    DataSetObjectWrapper.prototype._tryUpdateSorting = function () {
        if (this._checkIfSortingUpdatedAndAddToList()) {
            this._sortingDetails = this.getDataSet().sorting;
        }
    };
    DataSetObjectWrapper.prototype._checkIfSortingUpdatedAndAddToList = function (compareSorting) {
        return this._checkIfPropertyUpdatedAndAddToList("sortorder", this._getSortingDetails(), compareSorting || this._dataset.sorting);
    };
    DataSetObjectWrapper.prototype._checkIfFilteringUpdatedAndAddToList = function (compareFiltering) {
        return this._checkIfPropertyUpdatedAndAddToList("filter", this._filteringDetails.filterExpression, compareFiltering);
    };
    DataSetObjectWrapper.prototype._checkIfPagingUpdatedAndAddToList = function (_a) {
        var compareFirstPageNumber = _a.firstPageNumber, compareLastPageNumber = _a.lastPageNumber;
        var _b = this._pagingDetails, firstPageNumber = _b.firstPageNumber, lastPageNumber = _b.lastPageNumber;
        if (firstPageNumber !== compareFirstPageNumber || lastPageNumber !== compareLastPageNumber) {
            this._addUpdatedProperty("page");
            return true;
        }
        return false;
    };
    DataSetObjectWrapper.prototype._checkIfPropertyUpdatedAndAddToList = function (propertyName, currentValue, compareValue) {
        if (JSON.stringify(currentValue) !== JSON.stringify(compareValue)) {
            this._addUpdatedProperty(propertyName);
            return true;
        }
        return false;
    };
    DataSetObjectWrapper.prototype._addUpdatedProperty = function (propertyName) {
        if (this._updatedProperties.indexOf(propertyName) === -1) {
            this._updatedProperties.push(propertyName);
        }
    };
    return DataSetObjectWrapper;
}());
export { DataSetObjectWrapper };
