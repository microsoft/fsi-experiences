import { DataProvider, Query } from "./CustomControlDataProviderInterfaces";
import { DataSetObjectWrapper } from "./DataSetObjectWrapper";
import { DataSet, onDataSetUpdatedCallback } from "./CustomControlDataSetInterfaces";
import { EntityReference } from "../CustomControlMetadataInterfaces";
declare class DataSetFactory {
    static getDataSet(dataProvider: DataProvider, configuration: DataSetFactoryConfiguration): DataSet;
    static createDataSetObjectWrapper(dataProvider: DataProvider, configuration: DataSetFactoryConfiguration, previousWrapperToReplace?: DataSetObjectWrapper): DataSetObjectWrapper;
}
interface DataSetFactoryConfiguration {
    initQuery?: Query;
    events?: DataSetEventConfiguration;
    initializeCommanding?: boolean;
}
interface DataSetEventConfiguration {
    dataSetUpdatedCallback?: onDataSetUpdatedCallback;
    recordSelectedCallback?: onRecordSelected;
}
interface onRecordSelected {
    (recordId: string | EntityReference): void;
}
export { DataSetFactory, DataSetFactoryConfiguration, onRecordSelected, DataSetEventConfiguration };
