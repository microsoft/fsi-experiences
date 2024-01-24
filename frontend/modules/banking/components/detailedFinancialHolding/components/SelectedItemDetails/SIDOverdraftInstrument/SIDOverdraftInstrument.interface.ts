import { FHMetadata } from '../../../../../interfaces/FHEntity/FHMetadata';
import FinancialHoldingFields from '../../../../../interfaces/FHEntity/FinancialHoldingFields';
import FinancialInstrumentFields from '../../../../../interfaces/FHEntity/FinancialInstrumentFields';

export interface ISIDOverdraftInstrumentProps {
    instrument: FinancialInstrumentFields;
    metadata?: FHMetadata;
    entity?: FinancialHoldingFields;
}
