import { ICustomControlHostProps } from "./CustomControlDataInterfaces";
import * as CustomControlBagInterfaces from "./CustomControlExposedInterfaces";
export declare class PropertyDependencyManager {
    private _dependencyMapForSchema;
    private _propertyValues;
    constructor(ownProps: ICustomControlHostProps);
    handleDependencyUpdate(ownProps: ICustomControlHostProps, getOutputSchema: CustomControlInterfaces.GetOutputSchemaAction, propertyBag: CustomControlBagInterfaces.IPropBag<CustomControlInterfaces.IInputBag>): Promise<any>;
    private _getRawValue;
    private _getDependencyMapForSchema;
}
