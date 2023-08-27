import { ICustomControlHostProps } from "./../CustomControlDataInterfaces";
import { ICommunicationChannel } from "./../CustomControlExposedInterfaces";
export declare class Communication implements ICommunicationChannel {
    constructor(customControlProperties: ICustomControlHostProps);
    getPresenceMappedField(_entityName: string): string;
    isPresenceEnabled(_entityName: string): boolean;
}
