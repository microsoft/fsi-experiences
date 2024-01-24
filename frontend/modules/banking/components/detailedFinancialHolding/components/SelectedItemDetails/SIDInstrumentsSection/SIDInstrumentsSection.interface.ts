import { FHMetadata } from '../../../../../interfaces/FHEntity/FHMetadata';
import FinancialHoldingFields from '../../../../../interfaces/FHEntity/FinancialHoldingFields';
import FinancialInstrumentFields from '../../../../../interfaces/FHEntity/FinancialInstrumentFields';

export interface ISIDInstrumentsSectionProps {
    data: FinancialInstrumentFields[] | undefined;
    entity?: FinancialHoldingFields;
    metadata?: FHMetadata;
    isExtended?: boolean;
}
