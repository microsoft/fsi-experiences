import { ICustomControlHostProps } from "./CustomControlDataInterfaces";
import { ICCFConnectedCommandManagerProps } from "./CustomControlDependantInterfaces";
export declare class CommandingWrapper {
    private _commandManagerPromises;
    private _commandManagerIds;
    private _ownProps;
    private _memoizedProps;
    private _commandManagerId;
    private _datasetWrappers;
    private _externalCommandManagerId;
    private _externalCommandManagerPromise;
    private _externalCommandInitialized;
    private _createCommandManagerUXComponent;
    constructor(ownProps: ICustomControlHostProps);
    addDataSetWrapper(datasetWrapper: CustomControlInterfaces.ICustomControlDataSetWrapper): void;
    retrieveRecordCommandForDatasetWrapper(allRecords: {
        [id: string]: CustomControlInterfaces.DataSetRecord;
    }, etn: string, records: string[], commandButtonIds?: string[], filterByPriority?: boolean, useNestedFormat?: boolean, refreshAllRules?: boolean): Promise<CustomControlInterfaces.ICommandObjectWrapper[]>;
    retrieveRecordCommand(viewId: string, etn: string, records: string[], commandButtonIds?: string[], filterByPriority?: boolean, useNestedFormat?: boolean, refreshAllRules?: boolean): Promise<CustomControlInterfaces.ICommandObjectWrapper[]>;
    getRibbonId(etn: string, pageType: string, related: boolean): string;
    getDefaultConfigParameters(ownProps: ICustomControlHostProps): CustomControlInterfaces.IDataSetCustomControlParameterDefinition;
    populateCommandManagerProps(props: ICCFConnectedCommandManagerProps, ownProps: ICustomControlHostProps, entityTypeName?: string): void;
    createCommandBar(props: ICCFConnectedCommandManagerProps): any;
    createHiddenCommandManager(commandManagerId: string, ribbonId?: string): any;
    static getWrapperByCommandManagerId(commandManagerId: string): CommandingWrapper;
    getCommandManagerId(): string;
    linkParameterMethod(parameter: CustomControlInterfaces.IDataSetParameter): void;
    unmount(): void;
}
