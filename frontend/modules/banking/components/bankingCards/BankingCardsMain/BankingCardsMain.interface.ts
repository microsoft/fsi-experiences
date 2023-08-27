import { FHMetadata } from '../../../interfaces/FHEntity/FHMetadata';
import { FinancialHoldingFields } from '../../../interfaces/FHEntity/FinancialHoldingFields';

export interface BankingCardsMainProps {
    entities: Map<string, FinancialHoldingFields>;
    isError: boolean;
    isLoading: boolean;
    metadata?: FHMetadata;
    hasAccess?: boolean;
}
