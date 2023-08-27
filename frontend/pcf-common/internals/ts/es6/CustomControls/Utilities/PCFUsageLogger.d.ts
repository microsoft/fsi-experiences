import { ICustomControlHostProps } from "../Models/CustomControlDataInterfaces";
declare class PCFUsageLogger {
    private _isSuccessLogged;
    private _isFailureLogged;
    private _isOutputChangedButDestroyedLogged;
    constructor();
    logUsageSuccessEvent(props: ICustomControlHostProps): void;
    logUsageFailureEvent(props: ICustomControlHostProps): void;
    logUsageOutputChanged(props: ICustomControlHostProps): void;
    logFailureEvent(props: ICustomControlHostProps, exception: Error, apiName: string, parentId?: string, suggestedMitigation?: string, failureType?: string, additionalEventParams?: ControlAndClientApiInterfaces.EventParameter[]): void;
}
export { PCFUsageLogger };
