import { FHBaseCategory } from './FHBaseCategory';

export interface FHAccount extends FHBaseCategory {
    // Account Fields
    fhInterestType?: number;
    fhAccountBlockedAmount?: number;
    fhAccountInterestRate?: number;
    fhAverageBalance?: number;
    fhUnclearedBalance?: number;
    fhNumberOfTransactions?: number;
    fhAvailableBalance?: number;
}

export default FHAccount;
