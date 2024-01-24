import { IOnboardingApplicationQueueFetcher } from '../../interfaces/IOnboardingApplicationQueueFetcher';

export interface IArchiveApplicationWrapperProps {
    fetcher: IOnboardingApplicationQueueFetcher;
    selectedApplication: { id: string; name?: string };
    actionName: string;
}
