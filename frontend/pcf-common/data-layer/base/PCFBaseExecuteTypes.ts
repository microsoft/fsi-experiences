export interface IMetaData {
    boundParameter?: any;
    parameterTypes: Object;
    operationType: number;
    operationName: string;
}

export interface IExecuteRequest {
    getMetadata: () => IMetaData;
}
