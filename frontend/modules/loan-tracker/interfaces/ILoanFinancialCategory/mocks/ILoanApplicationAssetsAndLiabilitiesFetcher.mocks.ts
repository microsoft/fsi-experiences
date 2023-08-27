import { ILoanApplicationCustomer } from '../../ILoanApplicationCustomer/ILoanApplicationCustomer';
import { mockAssetTypes, mockLiabilityTypes } from '../../ILoanFinancialCategory/mocks/ILoanAssetsAndLiabilities.mocks';
import { mockLoanCustomers, rolesMock } from '../../ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { ILoanApplicationAssetsAndLiabilitiesFetcher } from '../../ILoanFinancialCategory/ILoanApplicationAssetsAndLiabilitiesFetcher';
import { ILoanFinancialCategory } from '../../ILoanFinancialCategory/ILoanFinancialCategory';
import { MockLoanAssetsAndLiabilitiesFetcher } from './ILoanAssetsAndLiabilitiesFetcher.mocks';

export class MockLoanApplicationAssetsAndLiabilitiesFetcher
    extends MockLoanAssetsAndLiabilitiesFetcher
    implements ILoanApplicationAssetsAndLiabilitiesFetcher
{
    public async getLoanApplicationCustomers(applicationId: string): Promise<ILoanApplicationCustomer[]> {
        return mockLoanCustomers;
    }
    public async updateCustomerVerifiedInformation(customer: ILoanApplicationCustomer): Promise<ILoanApplicationCustomer> {
        return customer;
    }
    public async getAssetsAndLiabilitiesTypes() {
        return { assetTypes: mockAssetTypes, liabilityTypes: mockLiabilityTypes };
    }
    public async addItem(item: ILoanFinancialCategory) {
        return item;
    }

    public async updateItem(item: ILoanFinancialCategory) {
        return true;
    }

    public async deleteItem(id: string) {
        return true;
    }

    public async getRoles(): Promise<Array<{ key: string | number; text: string }>> {
        return rolesMock;
    }
}
