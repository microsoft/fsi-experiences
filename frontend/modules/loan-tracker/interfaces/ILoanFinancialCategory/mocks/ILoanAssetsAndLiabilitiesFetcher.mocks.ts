import { ILoanApplicationAssetsAndLiabilities } from '../ILoanAssetsAndLiabilities';
import { assetsAndLiabilitiesMock, mockAssetTypes, mockLiabilityTypes } from './ILoanAssetsAndLiabilities.mocks';
import { mockLoanCustomers } from '../../ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { ILoanFinancialCategory } from '../ILoanFinancialCategory';
import { ILoanAssetsAndLiabilitiesFetcher } from '../ILoanAssetsAndLiabilitiesFetcher';
import { MockLoanApplicantFetcher } from '../../ILoanApplicant/mocks/ILoanApplicantFetcher.mocks';
import { ILoanApplicant } from '../../ILoanApplicant/ILoanApplicant';

export class MockLoanAssetsAndLiabilitiesFetcher extends MockLoanApplicantFetcher implements ILoanAssetsAndLiabilitiesFetcher {
    public async getAssetsAndLiabilities(): Promise<ILoanApplicationAssetsAndLiabilities> {
        return assetsAndLiabilitiesMock;
    }

    public async getPrimaryApplicantData(): Promise<ILoanApplicant> {
        return mockLoanCustomers[0];
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
}
