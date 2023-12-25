import { FinancialInstrumentFields } from '../../../../interfaces/FHEntity';

export const getCard = (): FinancialInstrumentFields => {
    return {
        financialHoldingInstrumentType: 104800002,
        financialHoldingInstrumentName: 'card2',
        fhiActivationDate: new Date('2020-01-23T22:00:00Z'),
        fhiCardNumber: '***3211',
        fhiCardType: 104800000,
        fhiEmbossingName: 'Monica Thomson',
        fhiExpiryDate: new Date('2024-01-23T22:00:00Z'),
        fhiIssueDate: new Date('2020-01-23T22:00:00Z'),
        fhiNumberOfCashWithdrawal: 4,
        fhiNumberOfTransactions: 5,
        fhiPurchasingLimit: 3000,
        fhiStatus: 104800000,
        fhiWithdrawalLimit: 500,
        fsiProductName: 'Freedon Flex',
        fsiCardNetwork: 'Visa',
    };
};

export const getDirectDebit = (): FinancialInstrumentFields => {
    return {
        financialHoldingInstrumentType: 104800000,
        financialHoldingInstrumentName: 'direct debit',
        fhiCreditorName: 'Ben Gold',
        fhiCreditorIdentifier: '33554646',
        fhiMandateId: '123456789',
        fhiDebtorAccount: '998-998',
        fhiMandateLimit: 360,
        fhiMandateStartDate: new Date('2020-01-23T22:00:00Z'),
        fhiMandateEndDate: new Date('2022-01-23T22:00:00Z'),
        fhiNextItemDate: new Date('2022-01-23T22:00:00Z'),
        fhiNextItemCount: 85,
        fhiLastItemDate: new Date('2022-01-23T22:00:00Z'),
        fhiLastItemAmount: 79,
        fhiLastItemStatus: 104800000,
    };
};

export const getStandingOrder = (): FinancialInstrumentFields => {
    return {
        financialHoldingInstrumentType: 104800001,
        financialHoldingInstrumentName: 'standing order',
        fhiDebtorAccount: 'A345B66',
        fhiCreditorIdentifier: '33554646',
        fhiFirstPaymentDate: new Date('2020-01-23T22:00:00Z'),
        fhiFrequency: 104800001,
        fsiDayOfMonth: 4,
        fsiDayOfWeek: 4,
        fhiTotalAmount: 3000,
        fhiNextItemDate: new Date('2022-01-23T22:00:00Z'),
        fhiNextItemCount: 85,
        fhiLastItemDate: new Date('2022-01-23T22:00:00Z'),
        fhiLastItemAmount: 79,
    };
};

export const getOverDraft = (): FinancialInstrumentFields => {
    return {
        financialHoldingInstrumentType: 104800003,
        financialHoldingInstrumentName: 'overdraft',
        fhiOverdraftLimit: 2000,
        fhiOverdraftLimitUsed: 500,
        fhiOverdraftRate: 10,
        fhiCreditorIdentifier: '33554646',
        fhiMandateId: '123456789',
    };
};
