import { IApplicantListFetcher } from '../IApplicantListFetcher';
import { MockOnboardingApplicationTasksFetcher, MockOnboardingApplicationTasksFetcherCanceledTasks } from './MockOnboardingApplicationTasksFetcher';
import { mockApplicants, mockCanceledTasksApplicants } from './ApplicantList.mock';

export class MockApplicantListFetcher extends MockOnboardingApplicationTasksFetcher implements IApplicantListFetcher {
    fetchApplicants(applicationId: string, taskDefinitionId?: string) {
        return Promise.resolve(mockApplicants);
    }
}

export class MockApplicantListFetcherCanceledTasks extends MockOnboardingApplicationTasksFetcherCanceledTasks implements IApplicantListFetcher {
    fetchApplicants(applicationId: string, taskDefinitionId?: string) {
        return Promise.resolve(mockCanceledTasksApplicants);
    }
}

export class MockErrorApplicantListFetcher extends MockOnboardingApplicationTasksFetcher implements IApplicantListFetcher {
    fetchApplicants(applicationId: string, taskDefinitionId?: string) {
        return Promise.reject('error');
    }
}
