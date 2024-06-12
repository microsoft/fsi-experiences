import { IFinancialProduct } from '../../interfaces/FHEntity/IFinancialProduct';

export const createFinancialProduct = (entity: any): IFinancialProduct => {
    return {
        currentValue: entity['FIP.msfsi_currentvalue'],
        financialMarketProductType: entity['FMP.msfsi_financialmarketproducttype'],
        fipStatecode: entity['FIP.statecode'],
        fmpStatecode: entity['FMP.statecode'],
    };
};
