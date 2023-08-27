import { ILoanApplication } from '../ILoanApplication/ILoanApplication';
import { BusinessFlowStepsMap } from './BusinessFlowStepsMap';

export interface ILoanOnboardingFetcher {
    fetchApplications: (steps: BusinessFlowStepsMap) => Promise<ILoanApplication[]>;
    fetchCurrentApplicationId: () => Promise<string>;
    getBusinessFlowSteps: () => Promise<BusinessFlowStepsMap>;
    getUpdatedLoanApplicationData(loanId: string): Promise<ILoanApplication | undefined>;
    getLoanArchiveReasons(): Promise<{ [key: string]: string }>;
    archiveApplication(loanId: string, reasonKey: string, comment?: string): Promise<void>;
}
