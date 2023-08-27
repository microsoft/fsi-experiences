import { ILoanPrimaryApplicant, LoanPrimaryApplicantMetadata } from './ILoanPrimaryApplicant';

export interface ILoanPrimaryApplicantFetcher {
    getLoanPrimaryApplicant(): Promise<ILoanPrimaryApplicant>;
    getLoanPrimaryApplicantMetadata(): Promise<LoanPrimaryApplicantMetadata>;
}
