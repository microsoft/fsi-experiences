import { FHBaseCategory } from './FHBaseCategory';
import FinancialInstrumentFields from './FinancialInstrumentFields';

export interface FinancialHoldingFields {
    id: string;
    name: string;
    category: number;
    balance: number;
    statecode: number;
    balanceDisplay: number;
    balanceDefault: number;
    balanceDefaultDisplay: number;
    balanceExchangeRate?: number;
    currencyId?: string;
    type: number;
    role?: number;
    description?: string;
    fhCode?: string;
    fhCategoryEntity?: FHBaseCategory;
    financialInstruments: Array<FinancialInstrumentFields>;
}
export default FinancialHoldingFields;
