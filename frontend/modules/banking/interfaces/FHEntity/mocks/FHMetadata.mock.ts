import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { FHMetadata } from '../FHMetadata';

export const FHMetadataMock: FHMetadata = {
    financialMarketProductType: {
        optionSet: {
            '104800000': {
                text: 'Equity',
                value: 104800000,
            },
            '104800001': {
                text: 'Bond',
                value: 104800001,
            },
            '104800002': {
                text: 'Option',
                value: 104800002,
            },
            '104800003': {
                text: 'Mutual fund',
                value: 104800003,
            },
            '104800004': {
                text: 'Exchange-traded fund (ETF)',
                value: 104800004,
            },
            '104800005': {
                text: 'Cash',
                value: 104800005,
            },
            '104800006': {
                text: 'Foreign currency',
                value: 104800006,
            },
            '104800007': {
                text: 'Cryptocurrency',
                value: 104800007,
            },
            '105000000': {
                text: 'Other',
                value: 105000000,
            },
        },
        displayName: 'Type',
    },
    role: {
        optionSet: {
            '104800000': {
                text: 'Owner',
                value: 104800000,
            },
            '104800001': {
                text: 'Card holder',
                value: 104800001,
            },
            '104800002': {
                text: 'Signatory',
                value: 104800002,
            },
            '104800003': {
                text: 'Co-signer',
                value: 104800003,
            },
            '104800004': {
                text: 'Joint owner',
                value: 104800004,
            },
            '104800005': {
                text: 'Beneficiary',
                value: 104800005,
            },
            '104800006': {
                text: 'Guarantor',
                value: 104800006,
            },
        },
        displayName: 'Financial holding role',
    },
    types: {
        optionSet: {
            '104800000': {
                text: 'Brokerage',
                value: 104800000,
            },
            '104800001': {
                text: 'Discretionary',
                value: 104800001,
            },
            '104800002': {
                text: 'Retirement',
                value: 104800002,
            },
            '104800003': {
                text: 'Education',
                value: 104800003,
            },
            '104800004': {
                text: 'Custodial',
                value: 104800004,
            },
            '104800006': {
                text: 'Secured',
                value: 104800006,
            },
            '104800007': {
                text: 'Unsecured',
                value: 104800007,
            },
            '104800008': {
                text: 'Mortgage',
                value: 104800008,
            },
            '104800009': {
                text: 'Checking',
                value: 104800009,
            },
            '104800010': {
                text: 'Saving',
                value: 104800010,
            },
            '104800011': {
                text: 'Deposit',
                value: 104800011,
            },
            '104800012': {
                text: 'Provident fund',
                value: 104800012,
            },
            '104800013': {
                text: 'Revolving',
                value: 104800013,
            },
            '104800014': {
                text: 'Other',
                value: 104800014,
            },
        },
        displayName: 'Financial holding type',
    },
    categories: {
        optionSet: {
            '104800000': {
                text: 'Lines of credit',
                value: 104800000,
            },
            '104800001': {
                text: 'Loans',
                value: 104800001,
            },
            '104800002': {
                text: 'Investments',
                value: 104800002,
            },
            '104800003': {
                text: 'Long-term savings',
                value: 104800003,
            },
            '104800004': {
                text: 'Accounts',
                value: 104800004,
            },
        },
        displayName: 'Financial holding category',
    },
    fhAccountBlockedAmount: {
        displayName: 'Blocked amount',
    },
    fhAccountInterestRate: {
        displayName: 'Interest rate',
    },
    fhInterestType: {
        optionSet: {
            '104800000': {
                text: 'Fixed',
                value: 104800000,
            },
            '104800001': {
                text: 'Periodical',
                value: 104800001,
            },
            '104800002': {
                text: 'Floating',
                value: 104800002,
            },
        },
        displayName: 'Interest type',
    },
    fhAverageBalance: {
        displayName: 'Average balance',
    },
    fhUnclearedBalance: {
        displayName: 'Uncleared balance',
    },
    fhNumberOfTransactions: {
        displayName: 'Number of transactions',
    },
    fhAvailableBalance: {
        displayName: 'Available balance',
    },
    fhLastPaymentDueDate: {
        displayName: 'Last payment due date',
    },
    fhNextStatementDate: {
        displayName: 'Next statement date',
    },
    fhCreditInterestRate: {
        displayName: 'Interest rate',
    },
    fhMinPaymentDue: {
        displayName: 'Minimum payment due',
    },
    fhNextInterestReviewDate: {
        displayName: 'Next interest review date',
    },
    fhLastStatementBalance: {
        displayName: 'Last statement balance',
    },
    fhNextPaymentDueDate: {
        displayName: 'Next payment date',
    },
    fhMonthlyPayment: {
        displayName: 'Monthly payment percentage',
    },
    fhCreditLimit: {
        displayName: 'Credit limit',
    },
    fhLastStatementDate: {
        displayName: 'Last Statement date',
    },
    fhOpenedDate: {
        displayName: 'Valid from',
    },
    fhOverdueDate: {
        displayName: 'Overdue date',
    },
    fhCashBalance: {
        displayName: 'Cash balance',
    },
    fhGainLoss: {
        displayName: 'Gain/Loss',
    },
    fhInvestmentObjectives: {
        optionSet: {
            '104800000': {
                text: 'Safety',
                value: 104800000,
            },
            '104800001': {
                text: 'Growth',
                value: 104800001,
            },
            '104800002': {
                text: 'Retirement',
                value: 104800002,
            },
            '104800003': {
                text: 'Tax optimization',
                value: 104800003,
            },
            '104800004': {
                text: 'Liquidity',
                value: 104800004,
            },
        },
        displayName: 'Investment objectives',
    },
    fhInvestmentRiskCategory: {
        optionSet: {
            '104800000': {
                text: 'High',
                value: 104800000,
            },
            '104800001': {
                text: 'Medium',
                value: 104800001,
            },
            '104800002': {
                text: 'Low',
                value: 104800002,
            },
        },
        displayName: 'Investment risk',
    },
    fhInvestmentTimeFrame: {
        optionSet: {
            '104800000': {
                text: 'Long',
                value: 104800000,
            },
            '104800001': {
                text: 'Medium',
                value: 104800001,
            },
            '104800002': {
                text: 'Short',
                value: 104800002,
            },
        },
        displayName: 'Investment time frame',
    },
    fhPerformance: {
        displayName: 'Performance',
    },
    fhPerformance1Y: {
        displayName: 'Performance 1Y',
    },
    fhPerformance3Y: {
        displayName: 'Performance 3Y',
    },
    fhPerformanceYTD: {
        displayName: 'Performance YTD',
    },
    fhPortfolioName: {
        displayName: 'Portfolio name',
    },
    fhLoanPrincipalAmount: {
        displayName: 'Principal amount',
    },
    fhCollectionRisk: {
        optionSet: {
            '104800000': {
                text: 'Low',
                value: 104800000,
            },
            '104800001': {
                text: 'Medium',
                value: 104800001,
            },
            '104800002': {
                text: 'High',
                value: 104800002,
            },
        },
        displayName: 'Collection risk',
    },
    fhDisbursementDate: {
        displayName: 'Disbursement date',
    },
    fhInstallmentAmount: {
        displayName: 'Installment amount',
    },
    fhDisbursedAmount: {
        displayName: 'Disbursed amount',
    },
    fhNextPaymentAmount: {
        displayName: 'Next payment amount',
    },
    fhLoanInterestRate: {
        displayName: 'Interest rate',
    },
    fhInterestReviewPeriod: {
        displayName: 'Review period',
    },
    fhRepaymentAccount: {
        displayName: 'Repayment account',
    },
    fhModeOfPayment: {
        optionSet: {
            '104800000': {
                text: 'checking account',
                value: 104800000,
            },
            '104800001': {
                text: 'current account',
                value: 104800001,
            },
            '104800002': {
                text: 'fund transfer',
                value: 104800002,
            },
            '104800003': {
                text: 'check',
                value: 104800003,
            },
        },
        displayName: 'Mode of payment',
    },
    fhLoanNextPaymentDate: {
        displayName: 'Next payment date',
    },
    fhLoanStartDate: {
        displayName: 'Start date',
    },
    fhLoanMaturityDate: {
        displayName: 'Maturity date',
    },
    fhTotalInterestPaid: {
        displayName: 'Total interest paid',
    },
    fhCapitalArrears: {
        displayName: 'Capital arrears',
    },
    fhFeeArrears: {
        displayName: 'Fee arrears',
    },
    fhInterestArrears: {
        displayName: 'Interest arrears',
    },
    fhNumberOfInstallmentPaid: {
        displayName: 'Number of installments paid',
    },
    fhDaysPastDue: {
        displayName: 'Days past due',
    },
    fhDelinquencyStatus: {
        optionSet: {
            '0': {
                text: 'No',
                value: 0,
            },
            '1': {
                text: 'Yes',
                value: 1,
            },
        },
        displayName: 'Delinquency status',
    },
    fhLastPaymentAmount: {
        displayName: 'Last payment amount',
    },
    fhLastPaymentDate: {
        displayName: 'Last payment date',
    },
    fhTotalArrear: {
        displayName: 'Total arrear',
    },
    fhInitialSource: {
        displayName: 'Initial source',
    },
    fhTerm: {
        displayName: 'Term',
    },
    fhSavingsBlockedAmount: {
        displayName: 'Blocked amount',
    },
    fhMaturityInstructionsDetails: {
        displayName: 'Maturity instructions details',
    },
    fhSavingsInterestRate: {
        displayName: 'Interest rate',
    },
    fhMaturityDate: {
        displayName: 'Maturity date',
    },
    fhProjectedInterestAmount: {
        displayName: 'Projected interest amount',
    },
    fhBalanceAtMaturity: {
        displayName: 'Balance at maturity',
    },
    fhAccruedInterest: {
        displayName: 'Accrued interest amount',
    },
    financialHoldingInstrumentType: {
        optionSet: {
            '104800000': {
                text: 'Direct debit',
                value: 104800000,
            },
            '104800001': {
                text: 'Standing order',
                value: 104800001,
            },
            '104800002': {
                text: 'Card',
                value: 104800002,
            },
            '104800003': {
                text: 'Overdraft',
                value: 104800003,
            },
        },
        displayName: 'Financial instrument type',
    },
    fhiCardType: {
        optionSet: {
            '104800000': {
                text: 'Debit',
                value: 104800000,
            },
            '104800001': {
                text: 'Credit',
                value: 104800001,
            },
            '104800002': {
                text: 'Charge card',
                value: 104800002,
            },
        },
        displayName: 'Card type',
    },
    fhiIssueDate: {
        displayName: 'Issue date',
    },
    statecode: {
        displayName: 'statecode',
    },
    fhiCardNumber: {
        displayName: 'Card number',
    },
    fhiNumberOfCashWithdrawal: {
        displayName: 'Number of cash withdrawals',
    },
    fhiExpiryDate: {
        displayName: 'Expiry date',
    },
    fhiEmbossingName: {
        displayName: 'Embossing name',
    },
    fhiActivationDate: {
        displayName: 'Activation date',
    },
    fsiCardNetwork: {
        displayName: 'Card network',
    },
    fhiPurchasingLimit: {
        displayName: 'Purchasing limit',
    },
    fsiProductName: {
        displayName: 'Product name',
    },
    fhiNumberOfTransactions: {
        displayName: 'Number of transactions',
    },
    fhiStatus: {
        optionSet: {
            '104800000': {
                text: 'Active',
                value: 104800000,
            },
            '104800001': {
                text: 'Card stolen',
                value: 104800001,
            },
            '104800002': {
                text: 'Not activated',
                value: 104800002,
            },
            '104800003': {
                text: 'Card lost',
                value: 104800003,
            },
            '104800004': {
                text: 'Expires soon',
                value: 104800004,
            },
            '104800005': {
                text: 'Expired',
                value: 104800005,
            },
        },
        displayName: 'Status',
    },
    fhiWithdrawalLimit: {
        displayName: 'Withdrawal limit',
    },
    fhiCardholder: {
        displayName: 'Cardholder',
    },
    fhiLastItemAmount: {
        displayName: 'Last item amount',
    },
    fhiLastItemStatusReason: {
        displayName: 'Last item status reason',
    },
    fhiDebtorAccount: {
        displayName: 'Debtor account',
    },
    fhiMandateLimit: {
        displayName: 'Mandate limit',
    },
    fhiMandateStartDate: {
        displayName: 'Mandate start date',
    },
    fhiCreditorIdentifier: {
        displayName: 'Creditor identifier',
    },
    fhiNextItemCount: {
        displayName: 'Next item amount',
    },
    fhiLastItemStatus: {
        optionSet: {
            '104800000': {
                text: 'Successful',
                value: 104800000,
            },
            '104800001': {
                text: 'Rejected',
                value: 104800001,
            },
            '104800002': {
                text: 'Failed',
                value: 104800002,
            },
        },
        displayName: 'Last item status',
    },
    fhiCreditorName: {
        displayName: 'Creditor name',
    },
    fhiLastItemDate: {
        displayName: 'Last item date',
    },
    fhiMandateEndDate: {
        displayName: 'Mandate end date',
    },
    fsiOrderEndDate: {
        displayName: 'Order end date',
    },
    fhiTotalAmount: {
        displayName: 'Amount',
    },
    fhiMandateId: {
        displayName: 'Mandate id',
    },
    fhiOverdraftLimit: {
        displayName: 'Overdraft limit',
    },
    fhiOverdraftLimitUsed: {
        displayName: 'Overdraft limit used',
    },
    fhiOverdraftRate: {
        displayName: 'Overdraft rate',
    },
    fhiNextItemDate: {
        displayName: 'Next item date',
    },
    fhiFrequency: {
        optionSet: {
            '104800000': {
                text: 'Daily',
                value: 104800000,
            },
            '104800001': {
                text: 'Weekly',
                value: 104800001,
            },
            '104800002': {
                text: 'Monthly',
                value: 104800002,
            },
            '104800003': {
                text: 'Quarterly',
                value: 104800003,
            },
            '104800004': {
                text: 'Yearly',
                value: 104800004,
            },
        },
        displayName: 'Frequency',
    },
    fhiFirstPaymentDate: {
        displayName: 'First payment date',
    },
    fsiDayOfMonth: {
        displayName: 'Day of month',
    },
    fsiDayOfWeek: {
        optionSet: {
            '1': {
                text: 'Sunday',
                value: 1,
            },
            '2': {
                text: 'Monday',
                value: 2,
            },
            '3': {
                text: 'Tuesday',
                value: 3,
            },
            '4': {
                text: 'Wednesday',
                value: 4,
            },
            '5': {
                text: 'Thursday',
                value: 5,
            },
            '6': {
                text: 'Friday',
                value: 6,
            },
            '7': {
                text: 'Saturday',
                value: 7,
            },
        },
        displayName: 'Day of week',
    },
    financialHoldingInstrumentName: {
        displayName: '',
    },
};

export const categoriesMetadataMock: { [entityName: string]: HttpStatusCode } = {
    msfsi_FH_Account: HttpStatusCode.OK,
    msfsi_FH_Creditline: HttpStatusCode.OK,
    msfsi_FH_Investment: HttpStatusCode.OK,
    msfsi_FH_Loan: HttpStatusCode.OK,
    msfsi_FH_Saving: HttpStatusCode.OK,
};

export const forbiddenCategoriesMetadataMock: { [entityName: string]: HttpStatusCode } = {
    msfsi_FH_Account: HttpStatusCode.FORBIDEN,
    msfsi_FH_Creditline: HttpStatusCode.FORBIDEN,
    msfsi_FH_Investment: HttpStatusCode.FORBIDEN,
    msfsi_FH_Loan: HttpStatusCode.FORBIDEN,
    msfsi_FH_Saving: HttpStatusCode.FORBIDEN,
};
