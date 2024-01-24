import { PreferredContactMethod } from '../../../enums/PreferredContactMethod';

export enum FieldType {
    Text = 'Text',
    TextArea = 'TextArea',
    Email = 'Email',
    Phone = 'Phone',
    Boolean = 'Boolean',
    Integer = 'Integer',
    Number = 'Number',
    DateTime = 'DateTime',
    Lookup = 'Lookup',
    Currency = 'Currency',
    Money = 'Money',
    Address = 'Address',
}

export interface IFieldLayout {
    name: string; // filed logical name
    label?: string;
    hideLabel?: boolean;
}
export interface IFieldMetadata {
    type: FieldType;
    displayName: string; // display name of the field
    target?: string; // lookup target entity
}

export interface IFieldData {
    formattedValue?: string;
    value?: boolean | string | number | Date;
    fieldName: string;
}

export interface ICustomerSnapshotData {
    fields: {
        [fieldName: string]: IFieldData;
    };
    currencyId?: string;
    preferredContactMethod?: PreferredContactMethod;
}
export interface ICustomerSnapshotMetadata {
    [fieldName: string]: IFieldMetadata;
}
export interface ICustomerSnapshotHeader {
    titleField?: IFieldLayout;
    subtitleFields?: IFieldLayout[];
}

export interface ICustomerSnapshotSection {
    displayName?: string;
    fields: IFieldLayout[];
}

export interface ICustomerSnapshotLayout {
    headerSection: ICustomerSnapshotHeader;
    sections: ICustomerSnapshotSection[];
    cardTitle?: string;
}
export interface ICustomerSnapshot {
    data: ICustomerSnapshotData;
    layout: ICustomerSnapshotLayout;
    metadata: ICustomerSnapshotMetadata;
    entityName: string;
}
