import { ICustomerSnapshotLayout, ICustomerSnapshotData, ICustomerSnapshotMetadata } from '../../entity/CustomerSnapshot/CustomerSnapshot';
import { MockSnapshotLayout } from '../../entity/CustomerSnapshot/mocks/CustomerSnapshotLayout.mock';
import { MockSnapshotMetadata } from '../../entity/CustomerSnapshot/mocks/CustomerSnapshotMetadata.mock';
import { MockSnapshotData } from '../../entity/CustomerSnapshot/mocks/CustomerSnapshotData.mock';
import { ICustomerSnapshotFetcher } from '../ICustomerSnapshotFetcher';

export class MockCustomerSnapshotFetcher implements ICustomerSnapshotFetcher {
    fetchSnapshotLayout(formId: string): Promise<{ entityName: string; layout: ICustomerSnapshotLayout }> {
        return Promise.resolve({
            entityName: 'contact',
            layout: MockSnapshotLayout,
        });
    }
    fetchSnapshotData(entityName: string, entityId: string, fields: string[]): Promise<ICustomerSnapshotData> {
        return Promise.resolve(MockSnapshotData);
    }
    fetchSnapshotMetadata(entityName: string, fields: string[]): Promise<ICustomerSnapshotMetadata> {
        return Promise.resolve(MockSnapshotMetadata);
    }
}
