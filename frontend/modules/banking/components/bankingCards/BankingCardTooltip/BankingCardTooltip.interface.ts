import { FHMetadata } from '../../../interfaces/FHEntity/FHMetadata';

export interface IBankingCardTooltipProps {
    embossingName?: string;
    withdrawalLimit?: number;
    purchasingLimit?: number;
    currencyId?: string;
    metadata?: FHMetadata;
}
