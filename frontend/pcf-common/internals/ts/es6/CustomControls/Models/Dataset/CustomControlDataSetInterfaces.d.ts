import { DataProviderCapabilities as DataSetCapabilites, DataSetEntityRecord, Query } from "./CustomControlDataProviderInterfaces";
import { AttributeMetadata, EntityReference, DateGrouping, AggregationFunction } from "../CustomControlMetadataInterfaces";
import { ICommand } from "../CustomControlCommandingInterfaces";
interface ModernDataSet {
    columns: DataSetColumn[];
    records: {
        [id: string]: DataSetEntityRecord;
    };
    sortedRecordIds: string[];
    error: boolean;
    errorMessage: string;
    errorCode?: number;
    loading: boolean;
    sorting: DataSetColumnSortStatus[];
    filtering: DataSetFiltering;
    paging: DataSetPaging;
    linking: DataSetLinking;
    grouping: DataSetGrouping;
    aggregation: DataSetAggregation;
    addColumn?: (name: string, columnAlias?: string) => void;
    setSelectedRecordIds(ids: string[]): void;
    getSelectedRecordIds(): string[];
    clearSelectedRecordIds(): void;
    refresh(): void;
    getTargetEntityType(): string;
    newRecord(): Promise<DataSetEntityRecord>;
    delete(recordIds: string[]): Promise<void>;
    getCommands(recordIds?: string[]): Promise<ICommand[]>;
    getDataSetCapabilities(): DataSetCapabilites;
    saveMultipleRecords(records: DataSetEntityRecord[]): Promise<string[]>;
    getRelatedDataSet(columnName: string, updateCallback?: onDataSetUpdatedCallback, targetEntityName?: string): Promise<ModernDataSet[]>;
    newDataSet(updateCallback?: onDataSetUpdatedCallback, initQuery?: Query): Promise<ModernDataSet>;
    cloneDataSet(updateCallback?: onDataSetUpdatedCallback, initQueryChanges?: Query): Promise<ModernDataSet>;
    openDatasetItem(recordId: string | EntityReference): void;
    getViewId(): string;
    getTitle(): string;
    retrieveLookupRecordsBySearchString?(primaryEntityName: string, targets: string[], searchString: string): Promise<CustomControlInterfaces.IDataRecord[]>;
    retrieveLookupRecordsByIds?(primaryEntityName: string, targets: string[], selectedIds: string[]): Promise<CustomControlInterfaces.IDataRecord[]>;
}
declare const enum DataSetUpdatePropertyNames {
    Records = "records",
    Columns = "columns",
    SortOrder = "sortorder",
    Page = "page",
    Filter = "filter",
    Commands = "commands",
    Linking = "linking",
    Grouping = "grouping",
    Aggregation = "aggregation",
    Refresh = "refresh"
}
interface onDataSetUpdatedCallback {
    (updatedDataSet: ModernDataSet, updatedProps: DataSetUpdatePropertyNames[]): void;
}
interface DataSetColumn {
    name: string;
    displayName: string;
    dataType: string;
    alias: string;
    order: number;
    visualSizeFactor: number;
    isHidden?: boolean;
    isPrimary?: boolean;
    isGroupBy?: boolean;
    appliedDateGrouping?: DateGrouping;
    isAggregate?: boolean;
    appliedAggregation?: AggregationFunction;
    disableSorting?: boolean;
    attributes?: AttributeMetadata;
}
interface DataSetColumnSortStatus {
    name: string;
    sortDirection: CustomControlInterfaces.ColumnSortDirection;
}
interface ColumnInfo {
    readonly error: boolean;
    readonly errorMessage?: string;
    readonly security?: SecurityValues;
    readonly type: string;
}
interface SecurityValues {
    readonly editable: boolean;
    readonly readable: boolean;
    readonly secured: boolean;
}
interface DataSetFiltering {
    getFilter(): FilterExpression;
    setFilter(expression: FilterExpression): void;
    clearFilter(): void;
}
interface FilterExpression {
    conditions: CustomControlInterfaces.ConditionExpression[];
    filterOperator: CustomControlInterfaces.FilterOperator;
    filters?: FilterExpression[];
}
interface DataSetPaging {
    readonly totalResultCount: number;
    readonly pageNumber: number;
    readonly firstPageNumber: number;
    readonly lastPageNumber: number;
    readonly pageSize: number;
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
    loadNextPage(loadOnlyNewPage?: boolean): void;
    loadPreviousPage(loadOnlyNewPage?: boolean): void;
    loadExactPage(pageNumber: number): void;
    setPageSize(pageSize: number): void;
    reset(): void;
}
interface DataSetLinking {
    getLinkedEntities(): LinkEntityExpression[];
    addLinkedEntity(expression: LinkEntityExpression): void;
    removeLinkedEntity(expression: LinkEntityExpression): void;
    clear(): void;
}
interface LinkEntityExpression {
    name: string;
    from: string;
    to: string;
    linkType: string;
    alias: string;
}
interface DataSetGrouping {
    getGroupBys(): GroupingExpression[];
    addGroupBy(expression: GroupingExpression): void;
    removeGroupBy(expression: GroupingExpression): void;
    clear(): void;
}
interface GroupingExpression {
    columnName: string;
    alias: string;
}
interface DateGroupingExpression extends GroupingExpression {
    dateGrouping: DateGrouping;
}
interface DataSetAggregation {
    getAggregations(): AggregationExpression[];
    addAggregation(expression: AggregationExpression): void;
    removeAggregation(expression: AggregationExpression): void;
    clear(): void;
}
interface AggregationExpression {
    columnName: string;
    alias: string;
    aggregationFunction: AggregationFunction;
}
interface CountColumnDistinctAggregationExpression extends AggregationExpression {
    aggregationFunction: "countcolumn";
    distinct: true;
}
export { ModernDataSet as DataSet, DataSetEntityRecord as DataSetRecord, DataSetColumn, DataSetColumnSortStatus, DataSetFiltering, FilterExpression, DataSetPaging, DataSetLinking, LinkEntityExpression, DataSetGrouping, GroupingExpression, DateGroupingExpression, DataSetAggregation, AggregationExpression, CountColumnDistinctAggregationExpression, ColumnInfo, SecurityValues, DataSetUpdatePropertyNames, onDataSetUpdatedCallback, };
