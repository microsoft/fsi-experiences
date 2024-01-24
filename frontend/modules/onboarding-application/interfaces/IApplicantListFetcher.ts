import { IApplicantWithTask } from './IApplicantWithTask';
import { IOnboardingApplicationTasksFetcher } from './IOnboardingApplicationTasksFetcher';

export interface IApplicantListFetcher extends IOnboardingApplicationTasksFetcher {
    fetchApplicants: (applicationId: string, taskDefinitionId?: string) => Promise<IApplicantWithTask[]>;
}
