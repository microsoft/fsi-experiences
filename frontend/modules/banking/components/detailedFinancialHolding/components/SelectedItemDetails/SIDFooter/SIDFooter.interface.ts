import { FinancialHoldingFields } from '../../../../../interfaces/FHEntity';
import { FHDataBoxDetails } from '../../FHDataBox/FHDataBox.interface';

export interface ISIDFooterProps {
    data: FHDataBoxDetails[][] | undefined;
    entity?: FinancialHoldingFields;
}
