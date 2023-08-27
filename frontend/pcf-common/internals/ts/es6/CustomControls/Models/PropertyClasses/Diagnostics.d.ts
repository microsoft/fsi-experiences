import { ICustomControlHostProps, IExternalUtils } from "./../CustomControlDataInterfaces";
import * as CustomControlBagInterfaces from "./../CustomControlExposedInterfaces";
export declare class Diagnostics implements CustomControlBagInterfaces.IDiagnostics {
    private _externalUtils;
    private _controlId;
    constructor(customControlProperties: ICustomControlHostProps, externalUtils: IExternalUtils);
    addControlId(message: string): string;
    traceError(componentName: string, message: string, parameters?: CustomControlBagInterfaces.IEventParameter[], keepOriginalContent?: boolean): void;
    traceWarning(componentName: string, message: string, parameters?: CustomControlBagInterfaces.IEventParameter[], keepOriginalContent?: boolean): void;
    traceInfo(componentName: string, message: string, parameters?: CustomControlBagInterfaces.IEventParameter[], keepOriginalContent?: boolean): void;
    traceDebug(componentName: string, message: string, parameters?: CustomControlBagInterfaces.IEventParameter[], keepOriginalContent?: boolean): void;
    isInMonitorSession(): boolean;
    private _addControlIdParameter;
}
