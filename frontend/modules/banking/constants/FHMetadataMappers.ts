import { FinancialInstrumentFields, FICard, FIDebit, FIOverdraft, FIStanding } from '../interfaces/FHEntity/FinancialInstrumentFields';
import { FHAccount, FHCredit, FHInvestment, FHLoan, FHSavings, FHFieldsMetadata, CustomerFHMetadata } from '../interfaces/FHEntity';
import { EntityMetadata, EntityMetadataWithOptionSet } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { IFinancialProduct } from '../interfaces/FHEntity/IFinancialProduct';

type FHAccountMetadata = {
    [P in keyof FHAccount]-?: EntityMetadata;
};

type FHInvestmentMetadata = {
    [P in keyof FHInvestment]-?: EntityMetadata;
};

type FHLoanMetadata = {
    [P in keyof FHLoan]-?: EntityMetadata;
};

type FHCreditMetadata = {
    [P in keyof FHCredit]-?: EntityMetadata;
};

type FHSavingsMetadata = {
    [P in keyof FHSavings]-?: EntityMetadata;
};

type FICardMetadata = {
    [P in keyof FICard & FinancialInstrumentFields]-?: EntityMetadata;
};

type FIDebitMetadata = {
    [P in keyof FIDebit & FinancialInstrumentFields]-?: EntityMetadata;
};

type FIOverdraftMetadata = {
    [P in keyof FIOverdraft & FinancialInstrumentFields]-?: EntityMetadata;
};

type FIStandingMetadata = {
    [P in keyof FIStanding & FinancialInstrumentFields]-?: EntityMetadata;
};

type FinancialMarketProductMetadata = {
    [P in keyof IFinancialProduct]?: EntityMetadataWithOptionSet;
};

const dataMapper = (attributes, key) => {
    const { OptionSet, DisplayName } = attributes.get(key) || {};

    return { optionSet: OptionSet, displayName: DisplayName };
};

const accountMapper = (attributes): FHAccountMetadata => ({
    fhAccountBlockedAmount: dataMapper(attributes, 'msfsi_blockedamount'),
    fhAccountInterestRate: dataMapper(attributes, 'msfsi_interestrate'),
    fhInterestType: dataMapper(attributes, 'msfsi_interesttype'),
    fhAverageBalance: dataMapper(attributes, 'msfsi_averagebalance'),
    fhUnclearedBalance: dataMapper(attributes, 'msfsi_unclearedbalance'),
    fhNumberOfTransactions: dataMapper(attributes, 'msfsi_numberoftransactions'),
    fhAvailableBalance: dataMapper(attributes, 'msfsi_availablebalance'),
});

const investmentMapper = (attributes): FHInvestmentMetadata => ({
    fhOpenedDate: dataMapper(attributes, 'msfsi_openeddate'),
    fhCashBalance: dataMapper(attributes, 'msfsi_cashbalance'),
    fhGainLoss: dataMapper(attributes, 'msfsi_gainloss'),
    fhInvestmentObjectives: dataMapper(attributes, 'msfsi_investmentobjectives'),
    fhInvestmentRiskCategory: dataMapper(attributes, 'msfsi_investmentrisk'),
    fhInvestmentTimeFrame: dataMapper(attributes, 'msfsi_investmenttimeframe'),
    fhPerformance: dataMapper(attributes, 'msfsi_performance'),
    fhPerformance1Y: dataMapper(attributes, 'msfsi_performance1y'),
    fhPerformance3Y: dataMapper(attributes, 'msfsi_performance3y'),
    fhPerformanceYTD: dataMapper(attributes, 'msfsi_performanceytd'),
    fhPortfolioName: dataMapper(attributes, 'msfsi_portfolioname'),
});

const loanMapper = (attributes): FHLoanMetadata => ({
    fhLoanPrincipalAmount: dataMapper(attributes, 'msfsi_principalamount'),
    fhCollectionRisk: dataMapper(attributes, 'msfsi_collectionrisk'),
    fhDisbursementDate: dataMapper(attributes, 'msfsi_disbursementdate'),
    fhInstallmentAmount: dataMapper(attributes, 'msfsi_installmentamount'),
    fhDisbursedAmount: dataMapper(attributes, 'msfsi_disbursedamount'),
    fhNextPaymentAmount: dataMapper(attributes, 'msfsi_nextpaymentamount'),
    fhInterestType: dataMapper(attributes, 'msfsi_interesttype'),
    fhLoanInterestRate: dataMapper(attributes, 'msfsi_interestrate'),
    fhNextInterestReviewDate: dataMapper(attributes, 'msfsi_nextinterestreviewdate'),
    fhInterestReviewPeriod: dataMapper(attributes, 'msfsi_interestreviewperiod'),
    fhRepaymentAccount: dataMapper(attributes, 'msfsi_repaymentaccount'),
    fhModeOfPayment: dataMapper(attributes, 'msfsi_modeofpayment'),
    fhLoanNextPaymentDate: dataMapper(attributes, 'msfsi_nextpaymentdate'),
    fhLoanStartDate: dataMapper(attributes, 'msfsi_loanstartdate'),
    fhLoanMaturityDate: dataMapper(attributes, 'msfsi_maturitydate'),
    fhTotalInterestPaid: dataMapper(attributes, 'msfsi_totalinterestpaid'),
    fhCapitalArrears: dataMapper(attributes, 'msfsi_capitalarrears'),
    fhFeeArrears: dataMapper(attributes, 'msfsi_feearrears'),
    fhInterestArrears: dataMapper(attributes, 'msfsi_interestarrears'),
    fhNumberOfInstallmentPaid: dataMapper(attributes, 'msfsi_numberofinstallmentspaid'),
    fhDaysPastDue: dataMapper(attributes, 'msfsi_dayspastdue'),
    fhOverdueDate: dataMapper(attributes, 'msfsi_overduedate'),
    fhDelinquencyStatus: dataMapper(attributes, 'msfsi_delinquencystatus'),
    fhLastPaymentAmount: dataMapper(attributes, 'msfsi_lastpaymentamount'),
    fhLastPaymentDate: dataMapper(attributes, 'msfsi_lastpaymentdate'),
    fhTotalArrear: dataMapper(attributes, 'msfsi_totalarrear'),
});

const creditMapper = (attributes): FHCreditMetadata => ({
    fhLastPaymentDueDate: dataMapper(attributes, 'msfsi_lastpaymentduedate'),
    fhNextStatementDate: dataMapper(attributes, 'msfsi_nextstatementdate'),
    fhCreditInterestRate: dataMapper(attributes, 'msfsi_interestrate'),
    fhMinPaymentDue: dataMapper(attributes, 'msfsi_minimumpaymentdue'),
    fhNextInterestReviewDate: dataMapper(attributes, 'msfsi_nextinterestreviewdate'),
    fhLastStatementBalance: dataMapper(attributes, 'msfsi_laststatementbalance'),
    fhNextPaymentDueDate: dataMapper(attributes, 'msfsi_nextpaymentdate'),
    fhMonthlyPayment: dataMapper(attributes, 'msfsi_monthlypaymentpercentage'),
    fhCreditLimit: dataMapper(attributes, 'msfsi_creditlimit'),
    fhLastStatementDate: dataMapper(attributes, 'msfsi_laststatementdate'),
});

const savingsMapper = (attributes): FHSavingsMetadata => ({
    fhInitialSource: dataMapper(attributes, 'msfsi_initialsource'),
    fhTerm: dataMapper(attributes, 'msfsi_term'),
    fhSavingsBlockedAmount: dataMapper(attributes, 'msfsi_blockedamount'),
    fhMaturityInstructionsDetails: dataMapper(attributes, 'msfsi_maturityinstructionsdetails'),
    fhSavingsInterestRate: dataMapper(attributes, 'msfsi_interestrate'),
    fhMaturityDate: dataMapper(attributes, 'msfsi_maturitydate'),
    fhProjectedInterestAmount: dataMapper(attributes, 'msfsi_projectedinterestamount'),
    fhBalanceAtMaturity: dataMapper(attributes, 'msfsi_balanceatmaturity'),
    fhAccruedInterest: dataMapper(attributes, 'msfsi_accruedinterest'),
});

const cardInstrumentMapper = (attributes: any): FICardMetadata => {
    return {
        financialHoldingInstrumentType: dataMapper(attributes, 'msfsi_financialinstrumenttype'),
        fhiCardType: dataMapper(attributes, 'msfsi_cardtype'),
        fhiIssueDate: dataMapper(attributes, 'msfsi_issuedate'),
        fhiCardNumber: dataMapper(attributes, 'msfsi_cardnumber'),
        fhiNumberOfCashWithdrawal: dataMapper(attributes, 'msfsi_numberofcashwithdrawal'),
        fhiExpiryDate: dataMapper(attributes, 'msfsi_expirydate'),
        fhiEmbossingName: dataMapper(attributes, 'msfsi_embossingname'),
        fhiActivationDate: dataMapper(attributes, 'msfsi_activationdate'),
        fsiCardNetwork: dataMapper(attributes, 'msfsi_cardnetwork'),
        fhiPurchasingLimit: dataMapper(attributes, 'msfsi_purchasinglimit'),
        fsiProductName: dataMapper(attributes, 'msfsi_productname'),
        fhiNumberOfTransactions: dataMapper(attributes, 'msfsi_numberoftransactions'),
        fhiStatus: dataMapper(attributes, 'msfsi_status'),
        fhiWithdrawalLimit: dataMapper(attributes, 'msfsi_withdrawallimit'),
    };
};

const debitInstrumentMapper = (attributes: any): FIDebitMetadata => {
    return {
        financialHoldingInstrumentType: dataMapper(attributes, 'msfsi_financialinstrumenttype'),
        fhiLastItemAmount: dataMapper(attributes, 'msfsi_lastitemamount'),
        fhiLastItemStatusReason: dataMapper(attributes, 'msfsi_lastitemstatusreason'),
        fhiDebtorAccount: dataMapper(attributes, 'msfsi_debtoraccount'),
        fhiMandateLimit: dataMapper(attributes, 'msfsi_mandatelimit'),
        fhiMandateStartDate: dataMapper(attributes, 'msfsi_mandatestartdate'),
        fhiCreditorIdentifier: dataMapper(attributes, 'msfsi_creditoridentifier'),
        fhiNextItemCount: dataMapper(attributes, 'msfsi_nextitemamount'),
        fhiLastItemStatus: dataMapper(attributes, 'msfsi_lastitemstatus'),
        fhiCreditorName: dataMapper(attributes, 'msfsi_creditorname'),
        fhiLastItemDate: dataMapper(attributes, 'msfsi_lastitemdate'),
        fhiMandateEndDate: dataMapper(attributes, 'msfsi_mandateenddate'),
        fsiOrderEndDate: dataMapper(attributes, 'msfsi_orderenddate'),
        fhiTotalAmount: dataMapper(attributes, 'msfsi_standingorderamount'),
        fhiMandateId: dataMapper(attributes, 'msfsi_mandateid'),
    };
};

const overdraftInstrumentMapper = (attributes: any): FIOverdraftMetadata => {
    return {
        financialHoldingInstrumentType: dataMapper(attributes, 'msfsi_financialinstrumenttype'),
        fhiOverdraftLimit: dataMapper(attributes, 'msfsi_overdraftlimit'),
        fhiOverdraftLimitUsed: dataMapper(attributes, 'msfsi_overdraftlimitused'),
        fhiOverdraftRate: dataMapper(attributes, 'msfsi_overdraftrate'),
    };
};

export const createStandingInstrument = (attributes: any): FIStandingMetadata => {
    return {
        financialHoldingInstrumentType: dataMapper(attributes, 'msfsi_financialinstrumenttype'),
        fhiNextItemDate: dataMapper(attributes, 'msfsi_nextitemdate'),
        fhiFrequency: dataMapper(attributes, 'msfsi_frequency'),
        fhiFirstPaymentDate: dataMapper(attributes, 'msfsi_firstpaymentdate'),
        fhiLastItemAmount: dataMapper(attributes, 'msfsi_lastitemamount'),
        fhiLastItemStatusReason: dataMapper(attributes, 'msfsi_lastitemstatusreason'),
        fhiLastItemStatus: dataMapper(attributes, 'msfsi_lastitemstatus'),
        fhiNextItemCount: dataMapper(attributes, 'msfsi_nextitemamount'),
        fhiDebtorAccount: dataMapper(attributes, 'msfsi_debtoraccount'),
        fhiTotalAmount: dataMapper(attributes, 'msfsi_standingorderamount'),
        fsiDayOfMonth: dataMapper(attributes, 'msfsi_dayofmonth'),
        fsiDayOfWeek: dataMapper(attributes, 'msfsi_dayofweek'),
    };
};

export const fhFieldsMapper = (attributes): FHFieldsMetadata => ({
    categories: dataMapper(attributes, 'msfsi_financialholdingcategory'),
    types: dataMapper(attributes, 'msfsi_financialholdingtype'),
});

export const mergeFHTypesOptionSet = (attribute, mergedMetadata): EntityMetadataWithOptionSet => {
    const fhTypes = dataMapper(attribute, 'msfsi_financialholdingtype');
    return {
        ...(mergedMetadata?.types || {}),
        optionSet: {
            ...(mergedMetadata?.types || {}).optionSet,
            ...fhTypes.optionSet,
        },
    };
};

export const cutomerFHMapper = (attributes): CustomerFHMetadata => ({
    role: dataMapper(attributes, 'msfsi_financialholdingrole'),
});

const financialMarketProductMapper = (attributes: any): FinancialMarketProductMetadata => ({
    financialMarketProductType: dataMapper(attributes, 'msfsi_financialmarketproducttype'),
});

export const fhEntityToMapper = {
    msfsi_customerfinancialholding: cutomerFHMapper,
    msfsi_financialholding: fhFieldsMapper,
    msfsi_fh_account: accountMapper,
    msfsi_fh_creditline: creditMapper,
    msfsi_fh_investment: investmentMapper,
    msfsi_fh_loan: loanMapper,
    msfsi_fh_saving: savingsMapper,
    msfsi_fi_card: cardInstrumentMapper,
    msfsi_fi_directdebit: debitInstrumentMapper,
    msfsi_fi_overdraft: overdraftInstrumentMapper,
    msfsi_fi_standingorder: createStandingInstrument,
    msfsi_financialmarketproduct: financialMarketProductMapper,
};
