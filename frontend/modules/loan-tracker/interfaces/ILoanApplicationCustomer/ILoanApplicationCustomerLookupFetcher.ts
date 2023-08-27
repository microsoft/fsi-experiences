import { ILoanApplicationCustomer } from './ILoanApplicationCustomer';
import { ILoanApplicantFetcher } from '../ILoanApplicant/ILoanApplicantFetcher';

export interface ILoanCustomerLookupFetcher extends ILoanApplicantFetcher {
    addApplicant(applicationId: string, applicantData: ILoanApplicationCustomer): Promise<ILoanApplicationCustomer>;
    removeApplicant(applicantId: string): Promise<void>;
}
