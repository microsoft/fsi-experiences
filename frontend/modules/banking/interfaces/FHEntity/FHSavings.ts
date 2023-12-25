import { FHBaseCategory } from './FHBaseCategory';

export interface FHSavings extends FHBaseCategory {
    // Savings fields
    fhInitialSource?: string;
    fhTerm?: string;
    fhMaturityInstructionsDetails?: string;
    fhSavingsInterestRate?: number;
    fhMaturityDate?: Date;
    fhAccruedInterest?: number;
    fhProjectedInterestAmount?: number;
    fhBalanceAtMaturity?: number;
    fhSavingsBlockedAmount?: number;
}

export default FHSavings;
