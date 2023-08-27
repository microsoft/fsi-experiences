import { FinancialHoldingFields } from '../../../interfaces/FHEntity';
import { FHMetadata } from '../../../interfaces/FHEntity/FHMetadata';

export interface BankingCardsRowProps {
    financialHoldings: Map<string, FinancialHoldingFields>;
    cardsNumber: number;
    focusedIndex: number;
    metadata?: FHMetadata;
}
