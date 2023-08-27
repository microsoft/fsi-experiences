import { ILoanApplicationAssetsAndLiabilities, IAssetsAndLiabilitiesTypes } from './ILoanAssetsAndLiabilities';
import { ILoanFinancialCategory } from './ILoanFinancialCategory';
import { ILoanApplicant } from '../ILoanApplicant/ILoanApplicant';

export type AssetOrLiabilityType = 'asset' | 'liability';
export interface ILoanAssetsAndLiabilitiesFetcher {
    getAssetsAndLiabilities(): Promise<ILoanApplicationAssetsAndLiabilities>;
    getPrimaryApplicantData(): Promise<ILoanApplicant>;
    getAssetsAndLiabilitiesTypes(): Promise<IAssetsAndLiabilitiesTypes>;
    addItem(item: ILoanFinancialCategory, category: AssetOrLiabilityType): Promise<ILoanFinancialCategory>;
    updateItem(item: ILoanFinancialCategory, category: AssetOrLiabilityType): Promise<boolean>;
    deleteItem(id: string, category: AssetOrLiabilityType): Promise<boolean>;
}
