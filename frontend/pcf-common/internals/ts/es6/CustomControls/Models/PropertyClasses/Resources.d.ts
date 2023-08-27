import { ICustomControlHostProps } from "./../CustomControlDataInterfaces";
import { IResources } from "./../CustomControlExposedInterfaces";
export declare class Resources implements IResources {
    private _manifest;
    private _getResource;
    private _bagPropsResource;
    constructor(customControlProperties: ICustomControlHostProps);
    getString(id: string): string;
    getResource(id: string, success: (data: string) => void, failure: () => void): void;
}
