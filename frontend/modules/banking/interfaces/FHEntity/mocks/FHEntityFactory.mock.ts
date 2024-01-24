import { FH_NAME_TO_CATEGORY_MAP } from '../../../constants/FHValueMaps';
import FHAccount from '../FHAccount';
import FHBaseEntity from '../FHBaseCategory';
import FHCredit from '../FHCredit';
import FHInvestment from '../FHInvestment';
import FHLoan from '../FHLoan';
import FHSavings from '../FHSavings';
import FinancialHoldingFields from '../FinancialHoldingFields';

const FH_CATEGORY_MAP = {
    [FH_NAME_TO_CATEGORY_MAP.Account]: createAccount,
    [FH_NAME_TO_CATEGORY_MAP.Investments]: createInvestments,
    [FH_NAME_TO_CATEGORY_MAP.Loans]: createLoan,
    [FH_NAME_TO_CATEGORY_MAP.Credit]: createCredit,
    [FH_NAME_TO_CATEGORY_MAP.Saving]: createSavings,
};

export function FHEntityFactory(entity: FinancialHoldingFields, arrearsLoan?: boolean): FHBaseEntity | undefined {
    const category = entity.category || '';

    if (!FH_CATEGORY_MAP[category]) {
        return undefined;
    }
    if (arrearsLoan) {
        return createArrearsLoan();
    }
    return FH_CATEGORY_MAP[category](entity);
}

function createAccount(): FHAccount {
    return {
        fhAccountBlockedAmount: 444,
        fhAccountInterestRate: 2.4,
        fhInterestType: 104800000,
        fhAverageBalance: 144,
        fhUnclearedBalance: 24,
        fhNumberOfTransactions: 66,
        fhAvailableBalance: 2244,
    };
}

function createLoan(): FHLoan {
    return {
        fhLoanPrincipalAmount: 999,
        fhLastPaymentAmount: 100,
        fhDisbursementDate: new Date('2022-01-29T22:00:00Z'),
        fhInstallmentAmount: 15000,
        fhDisbursedAmount: 15,
        fhNextPaymentAmount: 21,
        fhInterestType: 104800000,
        fhLoanInterestRate: 1.2,
        fhNextInterestReviewDate: new Date('2022-02-02T22:00:00Z'),
        fhInterestReviewPeriod: '3 months',
        fhRepaymentAccount: '123-44823/12',
        fhModeOfPayment: 104800000,
        fhCollectionRisk: 104800000,
        fhLastPaymentDate: new Date('2022-02-02T22:00:00Z'),
        fhLoanNextPaymentDate: new Date('2022-02-02T22:00:00Z'),
        fhNumberOfInstallmentPaid: 20,
        fhLoanStartDate: new Date('2022-02-02T22:00:00Z'),
        fhLoanMaturityDate: new Date('2022-02-02T22:00:00Z'),
        fhTotalInterestPaid: 100000,
        fhCapitalArrears: 202,
        fhFeeArrears: 200,
        fhInterestArrears: 0,
        fhDelinquencyStatus: false,
        fhDaysPastDue: 20,
        fhTotalArrear: 402,
    };
}

function createArrearsLoan(): FHLoan {
    return {
        fhLoanPrincipalAmount: 150000,
        fhLastPaymentAmount: 100,
        fhDisbursementDate: new Date('2022-01-29T22:00:00Z'),
        fhInstallmentAmount: 15000,
        fhDisbursedAmount: 9999,
        fhNextPaymentAmount: 21,
        fhInterestType: 104800000,
        fhLoanInterestRate: 1.2,
        fhNextInterestReviewDate: new Date('2022-02-02T22:00:00Z'),
        fhInterestReviewPeriod: '3 months',
        fhRepaymentAccount: '123-44823/12',
        fhModeOfPayment: 104800000,
        fhCollectionRisk: 104800000,
        fhLastPaymentDate: new Date('2022-02-02T22:00:00Z'),
        fhLoanNextPaymentDate: new Date('2022-02-02T22:00:00Z'),
        fhNumberOfInstallmentPaid: 20,
        fhLoanStartDate: new Date('2022-02-02T22:00:00Z'),
        fhLoanMaturityDate: new Date('2022-02-02T22:00:00Z'),
        fhTotalInterestPaid: 10000,
        fhCapitalArrears: 202,
        fhFeeArrears: 200,
        fhInterestArrears: 2,
        fhDelinquencyStatus: true,
        fhDaysPastDue: 20,
        fhTotalArrear: 402,
    };
}

function createCredit(): FHCredit {
    return {
        fhLastPaymentDueDate: new Date('2019-12-29T22:00:00Z'),
        fhNextStatementDate: new Date('2019-12-23T22:00:00Z'),
        fhCreditInterestRate: 1.3,
        fhLastStatementDate: new Date('2019-11-13T22:00:00Z'),
        fhMinPaymentDue: 33,
        fhNextInterestReviewDate: new Date('2020-12-23T22:00:00Z'),
        fhLastStatementBalance: 333,
        fhNextPaymentDueDate: new Date('2021-01-23T22:00:00Z'),
        fhMonthlyPayment: 2,
        fhCreditLimit: 1000,
    };
}

function createSavings(): FHSavings {
    return {
        fhInitialSource: '555',
        fhTerm: 'terms and publication',
        fhSavingsBlockedAmount: 55,
        fhMaturityInstructionsDetails: 'the dtails for',
        fhSavingsInterestRate: 111,
        fhMaturityDate: new Date('2022-01-23T22:00:00Z'),
        fhAccruedInterest: 1.5,
        fhProjectedInterestAmount: 2.5,
        fhBalanceAtMaturity: 4455,
    };
}

function createInvestments(): FHInvestment {
    return {
        fhPortfolioName: 'some name',
        fhOpenedDate: new Date('2022-01-23T22:00:00Z'),
        fhCashBalance: 1000,
        fhPerformance: 23,
        fhPerformance1Y: 20,
        fhPerformance3Y: 10,
        fhPerformanceYTD: 5,
        fhGainLoss: 500,
        fhInvestmentTimeFrame: 104800000,
        fhInvestmentObjectives: 104800000,
        fhInvestmentRiskCategory: 104800000,
    };
}
