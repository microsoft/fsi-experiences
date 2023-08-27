import FinancialHoldingFields from '../../../../../interfaces/FHEntity/FinancialHoldingFields';
import { FHDataBoxDetails } from '../../FHDataBox';

export interface ISIDFooterDataBoxProps {
    boxDetails: FHDataBoxDetails;
    fontSize: string;
    entity?: FinancialHoldingFields;
    isExtended?: boolean;
}
