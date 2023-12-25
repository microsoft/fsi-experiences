import { IOnboardingApplicationTasksFetcher } from '../../interfaces/IOnboardingApplicationTasksFetcher';

export interface ITaskVerificationProps {
    fetcher: IOnboardingApplicationTasksFetcher;
    taskDefinitionId: string;
    applicationId: string;
}
