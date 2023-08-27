import { ILoanFinancialCategory } from './ILoanFinancialCategory';

export interface ILoanFinancialCategoryFetcher {
    getItems(): Promise<ILoanFinancialCategory[]>;
    addItem(item: ILoanFinancialCategory): Promise<ILoanFinancialCategory>;
    updateItem(item: ILoanFinancialCategory): Promise<boolean>;
    deleteItem(id: string): Promise<boolean>;
    getItemTypes(): Promise<Array<{ key: string | number; text: string }>>;
}
