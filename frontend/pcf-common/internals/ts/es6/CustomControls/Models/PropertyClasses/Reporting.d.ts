import { ICustomControlHostProps, IExternalUtils } from "./../CustomControlDataInterfaces";
export declare class Reporting implements ControlAndClientApiInterfaces.Reporting {
    private _externalUtils;
    private _controlId;
    constructor(customControlProperties: ICustomControlHostProps, externalUtils: IExternalUtils);
    addControlId(params?: ControlAndClientApiInterfaces.EventParameter[]): ControlAndClientApiInterfaces.EventParameter[];
    reportSuccess(componentName: string, params?: ControlAndClientApiInterfaces.EventParameter[]): void;
    reportFailure(componentName: string, error: Error, suggestedMitigation?: string, params?: ControlAndClientApiInterfaces.EventParameter[]): void;
    reportEvent(event: ControlAndClientApiInterfaces.ApplicationEvent): void;
}
