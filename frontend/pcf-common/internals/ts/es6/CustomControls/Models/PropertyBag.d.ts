import * as CustomControlBagInterfaces from "./CustomControlExposedInterfaces";
import { ICustomControlHostProps, IExternalUtils, IHostData } from "./CustomControlDataInterfaces";
export declare class PropertyBag {
    private _memoizedChildrenRaw;
    private _memoizedChildrenConverted;
    private _accessibilityInternalData;
    private _bagObject;
    private _memoizedFileObjects;
    constructor(ownProps: ICustomControlHostProps, externalUtils: IExternalUtils);
    generateBag(ownProps: ICustomControlHostProps, hostData: IHostData): CustomControlBagInterfaces.IPropBag<{
        [key: string]: CustomControlInterfaces.IPropertyParameter;
    }>;
    private _getChildren;
    private _updateLatestParameters;
    private _getBagEvents;
    getAccessibilityData(): CustomControlBagInterfaces.AccessibilityInternalData;
    getLearningPathBag(): CustomControlBagInterfaces.ILearningPath;
    getCommunicationBag(): CustomControlBagInterfaces.ICommunicationChannel;
    private _getLearningPathBag;
    private _getUpdatedPropertiesBag;
}
