import { IQueueGroup } from '../IQueueGroup.interface';
import { IOnboardingApplicationQueueFetcher } from '../IOnboardingApplicationQueueFetcher';
import { IQueueData } from '../IQueueData.interface';
import { queueItemsMock, queueGroupsMock, mockBPFName } from './Queue.mock';
import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';

export class MockOnboardingApplicationQueueFetcher implements IOnboardingApplicationQueueFetcher {
    async archiveApplication(actionName: string, applicationId: string, reasonKey: string, comment?: string | undefined): Promise<void> {}
    async fetchArchiveReasons(): Promise<{ [key: string]: string }> {
        return {};
    }
    fetchActiveBPFStage(bpfName: string): Promise<string | undefined> {
        return Promise.resolve('');
    }
    fetchActiveStageName(bpfstage: string): Promise<string | undefined> {
        return Promise.resolve('');
    }
    fetchBPFName(): Promise<string> {
        return Promise.resolve(mockBPFName);
    }
    async fetchItems(steps: IQueueGroup, bpfName: string): Promise<IQueueData[]> {
        return queueItemsMock;
    }

    async getSteps(bpfName: string): Promise<IQueueGroup> {
        return queueGroupsMock;
    }
    async fetchQueueMetadata(): Promise<{ [key: string]: EntityMetadata }> {
        return {};
    }
}

export class MockFailureOnboardingApplicationQueueFetcher implements IOnboardingApplicationQueueFetcher {
    archiveApplication(actionName: string, applicationId: string, reasonKey: string, comment?: string | undefined): Promise<void> {
        throw new Error();
    }
    fetchArchiveReasons(): Promise<{ [key: string]: string }> {
        throw new Error();
    }
    fetchActiveBPFStage(bpfName: string): Promise<string | undefined> {
        return Promise.resolve('');
    }
    fetchActiveStageName(bpfstage: string): Promise<string | undefined> {
        return Promise.resolve('');
    }
    fetchBPFName(): Promise<string> {
        throw new Error();
    }
    async fetchItems(steps: IQueueGroup, bpfName: string): Promise<IQueueData[]> {
        throw new Error();
    }

    async getSteps(bpfName: string): Promise<IQueueGroup> {
        throw new Error();
    }
    async fetchQueueMetadata(): Promise<{ [key: string]: EntityMetadata }> {
        throw new Error();
    }
}
