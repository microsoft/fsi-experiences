import { ILoanInformation, LoanInformationMetadata } from './ILoanInformation';

export interface ILoanInformationFetcher {
    getLoanInformation(): Promise<ILoanInformation>;
    getLoanInformationMetadata(): Promise<LoanInformationMetadata>;
}
