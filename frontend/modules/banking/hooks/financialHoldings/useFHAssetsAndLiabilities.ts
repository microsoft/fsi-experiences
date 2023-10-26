import { useMemo } from 'react';
import { FinancialHoldingFields } from '../../interfaces/FHEntity';

export interface AssetsAndLiabilitiesResponse {
    assets: number;
    liabilities: number;
}

export const calcFHAssetsAndLiabilities = (financialHoldings: FinancialHoldingFields[]): AssetsAndLiabilitiesResponse => {
    return financialHoldings.reduce(
        (sum, fh) => {
            const { balanceDefault } = fh;
            const sumToField: keyof AssetsAndLiabilitiesResponse = balanceDefault < 0 ? 'liabilities' : 'assets';
            return {
                ...sum,
                [sumToField]: sum[sumToField] + balanceDefault,
            };
        },
        {
            assets: 0,
            liabilities: 0,
        }
    );
};

export const useFHAssetsAndLiabilities = (financialHoldings: FinancialHoldingFields[]): AssetsAndLiabilitiesResponse => {
    return useMemo(() => calcFHAssetsAndLiabilities(financialHoldings), [financialHoldings]);
};
