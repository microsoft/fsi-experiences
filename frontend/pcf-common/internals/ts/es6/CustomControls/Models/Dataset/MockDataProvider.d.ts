import { DataProvider, Query, QueryResult, DataProviderCapabilities, DataSetEntityRecord } from "./CustomControlDataProviderInterfaces";
import { DataSetColumn, DataSet, DataSetRecord, ColumnInfo, onDataSetUpdatedCallback } from "./CustomControlDataSetInterfaces";
import { DataSetMetadata, EntityReference } from "../CustomControlMetadataInterfaces";
declare type MockDataSetEntityRecordType = new (columnNames: string[], id: string, entityName: string) => MockDataSetEntityRecord;
declare class MockDataProvider implements DataProvider {
    private _entityName;
    private _maxRecords;
    private _records;
    private _selectedRecordIds;
    private _newRecord;
    viewId: string;
    constructor(entityName: string, maxRecords: number, newRecord?: MockDataSetEntityRecordType);
    getEntityName(): string;
    saveMultipleRecords(records: DataSetRecord[]): Promise<string[]>;
    getRecords(query: Query): Promise<QueryResult>;
    getMetadata(columnNames?: string[]): Promise<DataSetMetadata>;
    newRecord(): Promise<DataSetEntityRecord>;
    delete(recordIds: string[]): Promise<void>;
    getCapabilities(): DataProviderCapabilities;
    setSelectedRecordIds(_ids: string[]): void;
    getSelectedRecordIds(): string[];
    clearSelectedRecordIds(): void;
    getRelatedDataSet(_column: DataSetColumn, _updateCallback?: onDataSetUpdatedCallback): Promise<DataSet[]>;
    newDataSet(updateCallback: onDataSetUpdatedCallback, initQuery?: Query): Promise<DataSet>;
    destroy(): void;
    getTitle(): string;
    getViewId(): string;
}
declare class MockDataSetEntityRecord implements DataSetRecord {
    private _record;
    private _columns;
    private _recordId;
    private _etn;
    constructor(columnNames: string[], id: string, entityName: string);
    getRecordId(): string;
    getNamedReference(): EntityReference;
    getValue(columnName: string): string | Date | number | number[] | boolean | EntityReference | EntityReference[];
    getFormattedValue(columnName: string): string;
    getColumnInfo(_columnName: string): Promise<ColumnInfo>;
    getChanges(): {
        [fieldName: string]: string | Date | number | number[] | boolean | EntityReference | EntityReference[];
    };
    setValue(_columnName: string, _value: string | Date | number | number[] | boolean | EntityReference | EntityReference[]): Promise<void>;
    isDirty(): boolean;
    isValid(): boolean;
    save(): Promise<DataSetEntityRecord>;
}
declare class MockDataProviderWithCachedDataSet extends MockDataProvider {
    private _cachedDataSet;
    setCachedDataSet(dataSet: DataSet): void;
    getRecords(query: Query): Promise<QueryResult>;
}
declare class MockDataProviderWithOptionalAPIs extends MockDataProvider {
    constructor(entityName: string, maxRecords: number);
    getCapabilities(): DataProviderCapabilities;
}
declare class MockDataSetEntityRecordWithOptionalAPIs extends MockDataSetEntityRecord {
    getCellImageInfo(columnName: string, userLcid?: number): Promise<CustomControlInterfaces.IImageInfo>;
}
declare class MockDataProviderWithDynamicDataSetCapabilities extends MockDataProvider {
    getCapabilities(): DataProviderCapabilities;
}
export { MockDataSetEntityRecordType, MockDataProvider, MockDataSetEntityRecord, MockDataProviderWithCachedDataSet, MockDataProviderWithOptionalAPIs, MockDataSetEntityRecordWithOptionalAPIs, MockDataProviderWithDynamicDataSetCapabilities, };
