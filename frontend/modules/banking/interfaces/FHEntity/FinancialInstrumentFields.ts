export interface FinancialInstrumentFields extends FICard, FIDebit, FIOverdraft, FIStanding {
    financialHoldingInstrumentType?: number;
    financialHoldingInstrumentName?: string;
    statecode?: number;
}

export interface FICard {
    fhiCardType?: number;
    fhiIssueDate?: Date;
    fhiCardNumber?: string;
    fhiNumberOfCashWithdrawal?: number;
    fhiExpiryDate?: Date;
    fhiEmbossingName?: string;
    fhiActivationDate?: Date;
    fsiCardNetwork?: string;
    fhiPurchasingLimit?: number;
    fsiProductName?: string;
    fhiNumberOfTransactions?: number;
    fhiStatus?: number;
    fhiWithdrawalLimit?: number;
    fhiCardholder?: string;
}

export interface FIDebit {
    fhiLastItemAmount?: number;
    fhiLastItemStatusReason?: string;
    fhiDebtorAccount?: string;
    fhiMandateLimit?: number;
    fhiMandateStartDate?: Date;
    fhiCreditorIdentifier?: string;
    fhiNextItemCount?: number;
    fhiLastItemStatus?: number;
    fhiCreditorName?: string;
    fhiLastItemDate?: Date;
    fhiMandateEndDate?: Date;
    fsiOrderEndDate?: Date;
    fhiTotalAmount?: number;
    fhiMandateId?: string;
}

export interface FIOverdraft {
    fhiOverdraftLimit?: number;
    fhiOverdraftLimitUsed?: number;
    fhiOverdraftRate?: number;
}

export interface FIStanding {
    fhiNextItemDate?: Date;
    fhiFrequency?: number;
    fhiFirstPaymentDate?: Date;
    fhiLastItemAmount?: number;
    fhiLastItemStatusReason?: string;
    fhiLastItemStatus?: number;
    fhiDebtorAccount?: string;
    fhiTotalAmount?: number;
    fhiCreditorName?: string;
    fsiDayOfMonth?: number;
    fsiDayOfWeek?: number;
}

export default FinancialInstrumentFields;
