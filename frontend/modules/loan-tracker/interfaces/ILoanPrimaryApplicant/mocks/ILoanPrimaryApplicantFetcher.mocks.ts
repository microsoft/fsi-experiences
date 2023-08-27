import { ILoanPrimaryApplicant, LoanPrimaryApplicantMetadata } from '../../ILoanPrimaryApplicant/ILoanPrimaryApplicant';
import { loanPrimaryApplicantMock, loanPrimaryApplicantMockMetadata } from './ILoanPrimaryApplicant.mocks';
import { ILoanPrimaryApplicantFetcher } from '../ILoanPrimaryApplicantFetcher';

export class MockLoanPrimaryApplicantFetcher implements ILoanPrimaryApplicantFetcher {
    public async getLoanPrimaryApplicant(): Promise<ILoanPrimaryApplicant> {
        return loanPrimaryApplicantMock;
    }

    public async getLoanPrimaryApplicantMetadata(): Promise<LoanPrimaryApplicantMetadata> {
        return loanPrimaryApplicantMockMetadata;
    }
}
