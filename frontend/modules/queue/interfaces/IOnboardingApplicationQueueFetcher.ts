import { IQueueGroup } from './IQueueGroup.interface';
import { IQueueData } from './IQueueData.interface';
import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { IOnboardingApplicationCommonFetcher } from '@fsi/onboarding-application/interfaces/IOnboardingApplicationCommonFetcher';

export interface IOnboardingApplicationQueueFetcher extends IOnboardingApplicationCommonFetcher {
    fetchItems(steps: IQueueGroup, bpfName: string): Promise<IQueueData[]>;
    getSteps(bpfName: string): Promise<IQueueGroup>;
    fetchQueueMetadata(): Promise<{ [key: string]: EntityMetadata }>;
    fetchArchiveReasons(): Promise<{ [key: string]: string }>;
    archiveApplication(actionName: string, applicationId: string, reasonKey: string, comment?: string): Promise<void>;
}
