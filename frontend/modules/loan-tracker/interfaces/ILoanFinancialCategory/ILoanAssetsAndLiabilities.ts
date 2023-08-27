import { ILoanFinancialCategory } from './ILoanFinancialCategory';

export interface IAsset extends ILoanFinancialCategory {}

export interface ILiability extends ILoanFinancialCategory {}

export interface ILoanApplicationAssetsAndLiabilities {
    assets: IAsset[];
    liabilities: ILiability[];
    currencyId: string;
}

export interface IAssetsAndLiabilitiesTypes {
    assetTypes: Array<{ key: string | number; text: string }>;
    liabilityTypes: Array<{ key: string | number; text: string }>;
}

export interface ILoanAssetsAndLiabilities {
    totalAssets: number;
    totalLiabilities: number;
    primaryApplicantTotalAssets: number;
    primaryApplicantTotalLiabilities: number;
    primaryApplicantName: string;
    currencyId: string;
}

export interface IAssetsAndLiabilitiesData extends ILoanApplicationAssetsAndLiabilities {
    currencyId: string;
}
