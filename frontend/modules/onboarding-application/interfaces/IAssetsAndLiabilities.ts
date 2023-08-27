import { IFinancialCategory } from './IFinancialCategory';

export interface IAsset extends IFinancialCategory {}
export interface ILiability extends IFinancialCategory {}
export interface IApplicantAssetsAndLiabilities {
    assets: IAsset[];
    liabilities: ILiability[];
    currencyId?: string;
}

export interface IAssetsAndLiabilitiesTypes {
    assetTypes: Array<{ key: string | number; text: string }>;
    liabilityTypes: Array<{ key: string | number; text: string }>;
}

export interface IAssetsAndLiabilities {
    totalAssets: number;
    totalLiabilities: number;
    applicantTotalAssets: number;
    applicantTotalLiabilities: number;
    applicantName: string;
    currencyId: string;
}
