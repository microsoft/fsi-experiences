import { FinancialHoldingMap } from '../FHEntity/FinancialHoldingMap';

export type FHCardsResponse = {
    financialHoldings: FinancialHoldingMap;
    hasAccess: boolean;
};
