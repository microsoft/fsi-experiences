// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IPropBag } from 'CustomControls/Models/CustomControlExposedInterfaces';

export interface IContactIdInput {
    dummy: ComponentFramework.PropertyTypes.StringProperty;
    contactId: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IContactIdOutput {
    dummy?: string;
}

export type CommonPCFContext = IPropBag<IContactIdInput> | IPropBag<any>;
