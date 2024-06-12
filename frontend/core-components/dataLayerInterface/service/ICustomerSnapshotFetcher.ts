import { ICustomerSnapshotData, ICustomerSnapshotLayout, ICustomerSnapshotMetadata } from '../entity/CustomerSnapshot/CustomerSnapshot';
export interface ILayoutResponse {
    entityName: string;
    layout: ICustomerSnapshotLayout;
}

export interface ICustomerSnapshotFetcher {
    fetchSnapshotLayout(formId: string): Promise<ILayoutResponse>;
    fetchSnapshotData(entityName: string, entityId: string, fields: string[]): Promise<ICustomerSnapshotData>;
    fetchSnapshotMetadata(entityName: string, fields: string[]): Promise<ICustomerSnapshotMetadata>;
}
