import { BusinessFlowStepsMap } from '../BusinessFlowStepsMap';
import { ILoanApplication } from '../../ILoanApplication/ILoanApplication';
import {
    loanArchiveReasonsMock,
    mockApplications,
    mockCurrentApplicationId,
    mockUpdatedLoanApplication,
    stepsMock,
} from '../../ILoanApplication/mocks/ILoanApplication.mocks';
import { ILoanOnboardingFetcher } from '../ILoanOnboardingFetcher';

export class MockLoanOnboardingFetcher implements ILoanOnboardingFetcher {
    public async fetchApplications(steps: BusinessFlowStepsMap): Promise<ILoanApplication[]> {
        return mockApplications;
    }

    public async fetchCurrentApplicationId(): Promise<string> {
        return mockCurrentApplicationId;
    }

    public async getBusinessFlowSteps(): Promise<BusinessFlowStepsMap> {
        return stepsMock;
    }

    public async getUpdatedLoanApplicationData(loanId: string): Promise<ILoanApplication | undefined> {
        return mockUpdatedLoanApplication;
    }

    public async getLoanArchiveReasons(): Promise<{ [key: string]: string }> {
        return loanArchiveReasonsMock;
    }

    public async archiveApplication(loanId: string, reasonKey: string, comment?: string): Promise<void> {}
}
