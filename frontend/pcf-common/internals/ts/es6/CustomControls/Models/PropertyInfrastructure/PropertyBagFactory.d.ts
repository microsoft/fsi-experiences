import { ICustomControlHostProps, IExternalUtils, IHostData } from "./../CustomControlDataInterfaces";
export declare class PropertyBagFactory {
    private _externalUtils;
    private _customControlProperties;
    private _hostData;
    constructor(customControlProperties: ICustomControlHostProps, externalUtils: IExternalUtils, hostData?: IHostData);
    getInstance<T>(instance: {
        new (customControlProperties: ICustomControlHostProps, externalUtils: IExternalUtils, hostData?: IHostData): T;
    }): T;
    private _modifyDeclaredFunctions;
}
