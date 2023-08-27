import { ApplicantFinancialCategoryOption } from '../../constants/ApplicantFinancialItemCategories.consts';
import { ILoanApplicationCustomer } from '../ILoanApplicationCustomer/ILoanApplicationCustomer';
import { ILoanInformationFetcher } from '../ILoanInformation/ILoanInformationFetcher';

export interface ILoanApplicantFetcher extends ILoanInformationFetcher {
    getLoanApplicationCustomers(applicationId: string): Promise<ILoanApplicationCustomer[]>;
    updateCustomerVerifiedInformation(customer: ILoanApplicationCustomer): Promise<ILoanApplicationCustomer>;
    getRoles(): Promise<Array<{ key: string | number; text: string }>>;
    hasApplicantPrivilege(operation: number): boolean;
    hasFinancialItemPrivilege(category: ApplicantFinancialCategoryOption, operation: number): boolean;
}
