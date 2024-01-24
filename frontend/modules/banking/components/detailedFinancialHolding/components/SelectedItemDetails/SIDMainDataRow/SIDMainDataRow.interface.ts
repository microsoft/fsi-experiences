import { FinancialHoldingFields } from '../../../../../interfaces/FHEntity';
import { FHDataBoxDetails } from '../../FHDataBox/FHDataBox.interface';

export interface ISIDMainDataRowProps {
    list: FHDataBoxDetails[];
    entity?: FinancialHoldingFields;
    compact?: boolean;
    isMobile?: boolean;
}
