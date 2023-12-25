import { IFinancialCategory, IFinancialType } from './IFinancialCategory';

export interface IFinancialCategoryFetcher {
    getItems(): Promise<IFinancialCategory[]>;
    addItem(item: IFinancialCategory, createIntersectionEntity?: (financialItemEntity: Object) => Object): Promise<IFinancialCategory>;
    updateItem(item: IFinancialCategory): Promise<boolean>;
    deleteItem(id: string): Promise<boolean>;
    getFinancialCategoriesTypes(financialCategory: IFinancialType): Promise<Array<{ key: string | number; text: string }>>;
}
