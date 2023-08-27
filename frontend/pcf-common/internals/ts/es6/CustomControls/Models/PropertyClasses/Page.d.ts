import { ICustomControlHostProps, IExternalUtils } from "./../CustomControlDataInterfaces";
import { IPage } from "./../CustomControlExposedInterfaces";
export declare class Page implements IPage {
    appId: string;
    entityTypeName: string;
    entityId: string;
    isPageReadOnly: boolean;
    getClientUrl: () => string;
    constructor(customControlProperties: ICustomControlHostProps, externalUtils: IExternalUtils);
    updateBag(customControlProperties: ICustomControlHostProps): void;
}
