import { DataSetMetadata, Dictionary, EntityReference } from "../CustomControlMetadataInterfaces";
import { FilterExpression, DataSetColumnSortStatus, LinkEntityExpression, DataSetColumn, ColumnInfo, onDataSetUpdatedCallback, DataSet, GroupingExpression, AggregationExpression } from "./CustomControlDataSetInterfaces";
declare type FileObject = ControlAndClientApiInterfaces.FileObject;
declare type ImageObject = ControlAndClientApiInterfaces.ImageObject;
interface Query {
    queryId?: number;
    columns: DataSetColumn[];
    filters?: FilterExpression;
    sortDetails?: DataSetColumnSortStatus[];
    pagingDetails?: PagingQueryDetails;
    linkingDetails?: LinkEntityExpression[];
    grouping?: GroupingExpression[];
    aggregation?: AggregationExpression[];
}
interface ViewQuery extends Query {
    viewId?: string;
}
interface DataProvider {
    getEntityName(): string;
    getRecords(query: Query, forceRefresh?: boolean): Promise<QueryResult>;
    getMetadata(columnNames?: string[]): Promise<DataSetMetadata>;
    newRecord(initialColumns?: string[]): Promise<DataSetEntityRecord>;
    delete(recordIds: string[]): Promise<void>;
    getCapabilities(): DataProviderCapabilities;
    setSelectedRecordIds(ids: string[]): void;
    getSelectedRecordIds(): string[];
    clearSelectedRecordIds(): void;
    saveMultipleRecords(records: DataSetEntityRecord[]): Promise<string[]>;
    getRelatedDataSet(column: DataSetColumn, updateCallback?: onDataSetUpdatedCallback, targetEntityName?: string): Promise<DataSet[]>;
    newDataSet?(updateCallback?: onDataSetUpdatedCallback, initQuery?: Query): Promise<DataSet>;
    destroy(): void;
    getViewId(): string;
    getTitle(): string;
}
interface DataProviderCapabilities {
    isEditable: boolean;
    isFilterable: boolean;
    isSortable: boolean;
    canPaginate: boolean;
    canCreateNewRecords: boolean;
    hasRecordNavigation: boolean;
    hasCellImageInfo?: boolean;
    canGroup?: boolean;
    canAggregate?: boolean;
    dynamicDataSets?: DataProviderDynamicDataSetCapabilities;
}
interface DataProviderDynamicDataSetCapabilities {
    canCreateDynamicDataSets: boolean;
    getDynamicDataSetCapabilities?(): DataProviderCapabilities;
}
interface DataSetEntityRecord {
    getRecordId(): string;
    getNamedReference(): EntityReference;
    getValue(columnName: string): string | Date | number | number[] | boolean | EntityReference | EntityReference[] | FileObject | ImageObject;
    getFormattedValue(columnName: string, value?: string | Date | number | number[] | boolean | EntityReference | EntityReference[] | FileObject | ImageObject): string;
    getColumnInfo(columnName: string): Promise<ColumnInfo>;
    setValue(columnName: string, value: string | Date | number | number[] | boolean | EntityReference | EntityReference[] | FileObject | ImageObject): Promise<void>;
    isDirty(): boolean;
    isValid(): boolean;
    save(): Promise<DataSetEntityRecord>;
    getChanges(): {
        [fieldName: string]: string | Date | number | number[] | boolean | EntityReference | EntityReference[] | FileObject | ImageObject;
    };
    getCellImageInfo?(columnName: string, userLcid?: number): Promise<CustomControlInterfaces.IImageInfo>;
}
interface QueryResult {
    queryId?: number;
    records: Dictionary<DataSetEntityRecord>;
    hasNextPage: boolean;
    totalRecordCount?: number;
    sortedRecordIds: string[];
}
interface PagingQueryDetails {
    pageSize: number;
    pageNumber?: number;
    firstPageNumber?: number;
    lastPageNumber?: number;
    retrieveTotalRecordCount?: boolean;
}
interface DataErrorObject {
    errorMessage: string;
    errorTitle?: string;
    errorCode?: number;
}
export { Query, ViewQuery, DataProvider, DataProviderCapabilities, DataSetEntityRecord, QueryResult, PagingQueryDetails, DataErrorObject, };
