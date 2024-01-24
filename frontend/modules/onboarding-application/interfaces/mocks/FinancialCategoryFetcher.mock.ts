import { FINANCIAL_CATEGORY_TYPES, IFinancialCategory, IFinancialType } from '../IFinancialCategory';
import { IFinancialCategoryFetcher } from '../IFinancialCategoryFetcher';
import { assetsAndLiabilitiesMock, mockAssetTypes, mockLiabilityTypes } from './IAssetsAndLiabilities.mock';
import { incomeAndExpensesMock } from './IIncomeAndExpenses.mocks';

export class MockFinancialCategoryFetcher implements IFinancialCategoryFetcher {
    private category;
    public constructor(category: IFinancialType) {
        this.category = category;
    }
    async getItems(): Promise<IFinancialCategory[]> {
        const itemsCategory = this.category === 'liability' ? 'liabilities' : this.category + 's';

        return this.category === 'asset' || this.category == 'liability'
            ? assetsAndLiabilitiesMock[itemsCategory]
            : incomeAndExpensesMock[itemsCategory];
    }
    async getFinancialCategoriesTypes(financialCategory: IFinancialType): Promise<{ key: string | number; text: string }[]> {
        return (await financialCategory) === FINANCIAL_CATEGORY_TYPES.ASSET ? mockAssetTypes : mockLiabilityTypes;
    }

    public async addItem(item: IFinancialCategory) {
        return item;
    }

    public async updateItem(item: IFinancialCategory) {
        return true;
    }

    public async deleteItem(id: string) {
        return true;
    }
}
