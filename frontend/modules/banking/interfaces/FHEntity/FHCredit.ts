import { FHBaseCategory } from './FHBaseCategory';

export interface FHCredit extends FHBaseCategory {
    fhNextInterestReviewDate?: Date;
    fhLastPaymentDueDate?: Date;
    fhNextStatementDate?: Date;
    fhCreditInterestRate?: number;
    fhLastStatementDate?: Date;
    fhMinPaymentDue?: number;
    fhLastStatementBalance?: number;
    fhNextPaymentDueDate?: Date;
    fhMonthlyPayment?: number;
    fhCreditLimit?: number;
}

export default FHCredit;
