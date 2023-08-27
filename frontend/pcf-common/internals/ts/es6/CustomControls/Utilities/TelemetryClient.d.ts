import { ICustomControlHostProps } from "../Models/CustomControlDataInterfaces";
declare class TelemetryClient {
    private _initialized;
    private _logMessage;
    setProps(props: ICustomControlHostProps): void;
    log(control: string, message: string): void;
    warn(control: string, message: string): void;
    error(control: string, message: string): void;
}
declare const instance: TelemetryClient;
export { TelemetryClient, instance };
export default instance;
