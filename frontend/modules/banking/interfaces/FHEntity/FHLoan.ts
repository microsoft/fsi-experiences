import { FHBaseCategory } from './FHBaseCategory';

export interface FHLoan extends FHBaseCategory {
    // Loan fields
    fhLoanPrincipalAmount?: number;
    fhLastPaymentAmount?: number;
    fhDisbursementDate?: Date;
    fhInstallmentAmount?: number;
    fhDisbursedAmount?: number;
    fhNextPaymentAmount?: number;
    fhInterestType?: number;
    fhLoanInterestRate?: number;
    fhNextInterestReviewDate?: Date;
    fhInterestReviewPeriod?: string;
    fhRepaymentAccount?: string;
    fhModeOfPayment?: number;
    fhCollectionRisk?: number;
    fhLastPaymentDate?: Date;
    fhLoanNextPaymentDate?: Date;
    fhNumberOfInstallmentPaid?: number;
    fhLoanStartDate?: Date;
    fhLoanMaturityDate?: Date;
    fhTotalInterestPaid?: number;
    fhCapitalArrears?: number;
    fhFeeArrears?: number;
    fhInterestArrears?: number;
    fhDelinquencyStatus?: boolean;
    fhDaysPastDue?: number;
    fhOverdueDate?: Date;
    fhTotalArrear?: number;
}

export default FHLoan;
