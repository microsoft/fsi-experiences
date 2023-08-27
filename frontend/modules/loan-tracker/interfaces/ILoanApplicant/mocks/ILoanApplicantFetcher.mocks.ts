import { ApplicantFinancialCategoryOption } from '../../../constants/ApplicantFinancialItemCategories.consts';
import { ILoanApplicationCustomer } from '../../ILoanApplicationCustomer/ILoanApplicationCustomer';
import { ILoanApplicantFetcher } from '../ILoanApplicantFetcher';
import { MockLoanInformationFetcher } from '../../ILoanInformation/mocks/ILoanInformationFetcher.mock';
import { mockLoanCustomers, rolesMock } from '../../ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';

export class MockLoanApplicantFetcher extends MockLoanInformationFetcher implements ILoanApplicantFetcher {
    public async getLoanApplicationCustomers(applicationId: string): Promise<ILoanApplicationCustomer[]> {
        return mockLoanCustomers;
    }
    public async getRoles(): Promise<Array<{ key: string | number; text: string }>> {
        return rolesMock;
    }
    public async updateCustomerVerifiedInformation(customer: ILoanApplicationCustomer): Promise<ILoanApplicationCustomer> {
        return customer;
    }
    public hasFinancialItemPrivilege(category: ApplicantFinancialCategoryOption, operation: number): boolean {
        return true;
    }
    public hasApplicantPrivilege(operation: number): boolean {
        return true;
    }
}
