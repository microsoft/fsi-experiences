import { FINANCIAL_HOLDINGS_HIDE_LIST_CONFIGURATIONS } from '@fsi/banking/constants/features/financialHoldings';
import { FH_INSTRUMENT_NAME_TO_TYPE, FH_NAME_TO_CATEGORY_MAP } from '@fsi/banking/constants/FHValueMaps';
import {
    FHAccount,
    FHInvestment,
    FHLoan,
    FHCredit,
    FHSavings,
    FinancialInstrumentFields,
    FinancialHoldingFields,
    FHBaseCategory,
} from '@fsi/banking/interfaces/FHEntity';
import { FinancialHoldingMap } from '@fsi/banking/interfaces/FHEntity/FinancialHoldingMap';
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { getContextSetValue } from '@fsi/pcf-common/utilities/extractContextualConfig';

export const ActiveStateCode = 0;

export const createFinancialHolding = (entity: any): FinancialHoldingFields => {
    return {
        id: entity['FH.msfsi_financialholdingid'],
        category: entity['FH.msfsi_financialholdingcategory'] || 0,
        name: entity['FH.msfsi_name'] || '',
        description: entity['FH.msfsi_description'],
        role: entity['msfsi_financialholdingrole'],
        fhCode: entity['FH.msfsi_financialholdingcode'],
        statecode: entity['FH.statecode'],
        type: extractFromAllFHTables(entity, 'msfsi_financialholdingtype') || 0,
        balance: extractFromAllFHTables(entity, 'msfsi_balance') || 0,
        balanceDefault: extractFromAllFHTables(entity, 'msfsi_balancedefault') || 0,
        balanceDisplay: extractFromAllFHTables(entity, 'msfsi_balancedisplayvalue'),
        balanceDefaultDisplay: extractFromAllFHTables(entity, 'msfsi_balancedefaultdisplayvalue'),
        balanceExchangeRate: extractFromAllFHTables(entity, 'msfsi_balanceexchangerate'),
        currencyId: extractFromAllFHTables(entity, 'transactioncurrencyid'),
        financialInstruments: [],
    };
};

export const createAccount = (entity: any): FHAccount => {
    return {
        fhAccountBlockedAmount: entity['FH_ACCOUNT.msfsi_blockedamount'], // BLOCKED AMOUNT'
        fhAccountInterestRate: entity['FH_ACCOUNT.msfsi_interestrate'], // ACCOUNT INTEREST RATE'
        fhInterestType: entity['FH_ACCOUNT.msfsi_interesttype'], // INTEREST TYPE
        fhAverageBalance: entity['FH_ACCOUNT.msfsi_averagebalance'], // AVERAGE BALANCE'
        fhUnclearedBalance: entity['FH_ACCOUNT.msfsi_unclearedbalance'], // UNCLEARED BALANCE'
        fhNumberOfTransactions: entity['FH_ACCOUNT.msfsi_numberoftransactions'], // NUMBER OF TRANSACTIONS'
        fhAvailableBalance: entity['FH_ACCOUNT.msfsi_availablebalance'],
    };
};

export const createInvestment = (entity: any): FHInvestment => {
    return {
        fhPortfolioName: entity['FH_INVESTMENT.msfsi_portfolioname'],
        fhOpenedDate: entity['FH_INVESTMENT.msfsi_openeddate'] && new Date(entity['FH_INVESTMENT.msfsi_openeddate']),
        fhCashBalance: entity['FH_INVESTMENT.msfsi_cashbalance'],
        fhPerformance: entity['FH_INVESTMENT.msfsi_performance'],
        fhPerformance1Y: entity['FH_INVESTMENT.msfsi_performance1y'],
        fhPerformance3Y: entity['FH_INVESTMENT.msfsi_performance3y'],
        fhPerformanceYTD: entity['FH_INVESTMENT.msfsi_performanceytd'],
        fhGainLoss: entity['FH_INVESTMENT.msfsi_gainloss'],
        fhInvestmentTimeFrame: entity['FH_INVESTMENT.msfsi_investmenttimeframe'],
        fhInvestmentObjectives: entity['FH_INVESTMENT.msfsi_investmentobjectives'],
        fhInvestmentRiskCategory: entity['FH_INVESTMENT.msfsi_investmentrisk'],
    };
};
export const createLoan = (entity: any): FHLoan => {
    return {
        fhLoanPrincipalAmount: entity['FH_LOAN.msfsi_principalamount'],
        fhLastPaymentAmount: entity['FH_LOAN.msfsi_lastpaymentamount'],
        fhDisbursementDate: entity['FH_LOAN.msfsi_disbursementdate'] && new Date(entity['FH_LOAN.msfsi_disbursementdate']),
        fhInstallmentAmount: entity['FH_LOAN.msfsi_installmentamount'],
        fhDisbursedAmount: entity['FH_LOAN.msfsi_disbursedamount'],
        fhNextPaymentAmount: entity['FH_LOAN.msfsi_nextpaymentamount'],
        fhInterestType: entity['FH_LOAN.msfsi_interesttype'],
        fhLoanInterestRate: entity['FH_LOAN.msfsi_interestrate'],
        fhNextInterestReviewDate: entity['FH_LOAN.msfsi_nextinterestreviewdate'] && new Date(entity['FH_LOAN.msfsi_nextinterestreviewdate']),
        fhInterestReviewPeriod: entity['FH_LOAN.msfsi_interestreviewperiod'],
        fhRepaymentAccount: entity['FH_LOAN.msfsi_repaymentaccount'],
        fhModeOfPayment: entity['FH_LOAN.msfsi_modeofpayment'],
        fhCollectionRisk: entity['FH_LOAN.msfsi_collectionrisk'],
        fhLastPaymentDate: entity['FH_LOAN.msfsi_lastpaymentdate'] && new Date(entity['FH_LOAN.msfsi_lastpaymentdate']),
        fhLoanNextPaymentDate: entity['FH_LOAN.msfsi_nextpaymentdate'] && new Date(entity['FH_LOAN.msfsi_nextpaymentdate']),
        fhNumberOfInstallmentPaid: entity['FH_LOAN.msfsi_numberofinstallmentspaid'],
        fhLoanStartDate: entity['FH_LOAN.msfsi_loanstartdate'] && new Date(entity['FH_LOAN.msfsi_loanstartdate']),
        fhLoanMaturityDate: entity['FH_LOAN.msfsi_maturitydate'] && new Date(entity['FH_LOAN.msfsi_maturitydate']),
        fhTotalInterestPaid: entity['FH_LOAN.msfsi_totalinterestpaid'],
        fhCapitalArrears: entity['FH_LOAN.msfsi_capitalarrears'],
        fhFeeArrears: entity['FH_LOAN.msfsi_feearrears'],
        fhInterestArrears: entity['FH_LOAN.msfsi_interestarrears'],
        fhDelinquencyStatus: entity['FH_LOAN.msfsi_delinquencystatus'],
        fhDaysPastDue: entity['FH_LOAN.msfsi_dayspastdue'],
        fhOverdueDate: entity['FH_LOAN.msfsi_overduedate'] && new Date(entity['FH_LOAN.msfsi_overduedate']),
        fhTotalArrear: entity['FH_LOAN.msfsi_totalarrear'],
    };
};

export const createCredit = (entity: any): FHCredit => {
    return {
        fhLastPaymentDueDate: entity['FH_CREDIT.msfsi_lastpaymentduedate'] && new Date(entity['FH_CREDIT.msfsi_lastpaymentduedate']), // LAST PAYMENT DUE DATE
        fhNextStatementDate: entity['FH_CREDIT.msfsi_nextstatementdate'] && new Date(entity['FH_CREDIT.msfsi_nextstatementdate']), // NEXT STATEMENT DATE
        fhCreditInterestRate: entity['FH_CREDIT.msfsi_interestrate'], // CREDIT INTEREST RATE
        fhLastStatementDate: entity['FH_CREDIT.msfsi_laststatementdate'] && new Date(entity['FH_CREDIT.msfsi_laststatementdate']), // LAST STATEMENT DATE
        fhMinPaymentDue: entity['FH_CREDIT.msfsi_minimumpaymentdue'], // MINIMUM PAYMENT DUE
        fhNextInterestReviewDate: entity['FH_CREDIT.msfsi_nextinterestreviewdate'] && new Date(entity['FH_CREDIT.msfsi_nextinterestreviewdate']), // NEXT INTEREST REVIEW DATE
        fhLastStatementBalance: entity['FH_CREDIT.msfsi_laststatementbalance'], // LAST STATEMENT BALANCE
        fhNextPaymentDueDate: entity['FH_CREDIT.msfsi_nextpaymentdate'] && new Date(entity['FH_CREDIT.msfsi_nextpaymentdate']), // NEXT PAYMENT DUE DATE
        fhMonthlyPayment: entity['FH_CREDIT.msfsi_monthlypaymentpercentage'], // MONTHLY PAYMENT %
        fhCreditLimit: entity['FH_CREDIT.msfsi_creditlimit'], // CREDIT LIMIT
    };
};
export const createSavings = (entity: any): FHSavings => {
    return {
        fhInitialSource: entity['FH_SAVING.msfsi_initialsource'], // INITIAL SOURCE',
        fhTerm: entity['FH_SAVING.msfsi_term'], // TERM',
        fhSavingsBlockedAmount: entity['FH_SAVING.msfsi_blockedamount'], // BLOCKED AMOUNT',
        fhMaturityInstructionsDetails: entity['FH_SAVING.msfsi_maturityinstructionsdetails'], // MATURITY INSTRUCTIONS DETAILS',
        fhSavingsInterestRate: entity['FH_SAVING.msfsi_interestrate'], // SAVINGS INTEREST RATE,
        fhMaturityDate: entity['FH_SAVING.msfsi_maturitydate'] && new Date(entity['FH_SAVING.msfsi_maturitydate']), // MATURITY DATE',
        fhAccruedInterest: entity['FH_SAVING.msfsi_accruedinterest'], // ACCRUED INTEREST',
        fhProjectedInterestAmount: entity['FH_SAVING.msfsi_projectedinterestamount'], // PROJECTED INTEREST AMOUNT',
        fhBalanceAtMaturity: entity['FH_SAVING.msfsi_balanceatmaturity'], // BALANCE AT MATURITY',
    };
};

export const createCardInstrument = (entity: any): FinancialInstrumentFields => {
    return {
        financialHoldingInstrumentType: entity['FHI_CARD.msfsi_financialinstrumenttype'],
        financialHoldingInstrumentName: entity['FHI_CARD.msfsi_name'],
        fhiCardType: entity['FHI_CARD.msfsi_cardtype'],
        fhiIssueDate: entity['FHI_CARD.msfsi_issuedate'] && new Date(entity['FHI_CARD.msfsi_issuedate']),
        fhiCardNumber: entity['FHI_CARD.msfsi_cardnumber'],
        fhiNumberOfCashWithdrawal: entity['FHI_CARD.msfsi_numberofcashwithdrawal'],
        fhiExpiryDate: entity['FHI_CARD.msfsi_expirydate'] && new Date(entity['FHI_CARD.msfsi_expirydate']),
        fhiEmbossingName: entity['FHI_CARD.msfsi_embossingname'],
        fhiActivationDate: entity['FHI_CARD.msfsi_activationdate'] && new Date(entity['FHI_CARD.msfsi_activationdate']),
        fsiCardNetwork: entity['FHI_CARD.msfsi_cardnetwork'],
        fhiPurchasingLimit: entity['FHI_CARD.msfsi_purchasinglimit'],
        fsiProductName: entity['FHI_CARD.msfsi_productname'],
        fhiNumberOfTransactions: entity['FHI_CARD.msfsi_numberoftransactions'],
        fhiStatus: entity['FHI_CARD.msfsi_status'],
        fhiWithdrawalLimit: entity['FHI_CARD.msfsi_withdrawallimit'],
        fhiCardholder: entity['FHI_CARD.msfsi_cardholder'],
    };
};

export const createDebitInstrument = (entity: any): FinancialInstrumentFields => {
    return {
        financialHoldingInstrumentType: entity['FHI_DEBIT.msfsi_financialinstrumenttype'],
        financialHoldingInstrumentName: entity['FHI_DEBIT.msfsi_name'],
        fhiMandateId: entity['FHI_DEBIT.msfsi_mandateid'],
        fhiLastItemAmount: entity['FHI_DEBIT.msfsi_lastitemamount'],
        fhiLastItemStatusReason: entity['FHI_DEBIT.msfsi_lastitemstatusreason'],
        fhiDebtorAccount: entity['FHI_DEBIT.msfsi_debtoraccount'],
        fhiMandateLimit: entity['FHI_DEBIT.msfsi_mandatelimit'],
        fhiMandateStartDate: entity['FHI_DEBIT.msfsi_mandatestartdate'] && new Date(entity['FHI_DEBIT.msfsi_mandatestartdate']),
        fhiCreditorIdentifier: entity['FHI_DEBIT.msfsi_creditoridentifier'],
        fhiNextItemCount: entity['FHI_DEBIT.msfsi_nextitemamount'],
        fhiLastItemStatus: entity['FHI_DEBIT.msfsi_lastitemstatus'],
        fhiCreditorName: entity['FHI_DEBIT.msfsi_creditorname'],
        fhiLastItemDate: entity['FHI_DEBIT.msfsi_lastitemdate'] && new Date(entity['FHI_DEBIT.msfsi_lastitemdate']),
        fhiNextItemDate: entity['FHI_DEBIT.msfsi_nextitemdate'] && new Date(entity['FHI_DEBIT.msfsi_nextitemdate']),
        fhiMandateEndDate: entity['FHI_DEBIT.msfsi_mandateenddate'] && new Date(entity['FHI_DEBIT.msfsi_mandateenddate']),
        fsiOrderEndDate: entity['FHI_DEBIT.msfsi_orderenddate'] && new Date(entity['FHI_DEBIT.msfsi_orderenddate']),
        fhiTotalAmount: entity['FHI_DEBIT.msfsi_standingorderamount'],
    };
};

export const createOverdraftInstrument = (entity: any): FinancialInstrumentFields => {
    return {
        financialHoldingInstrumentType: entity['FHI_OVERDRAFT.msfsi_financialinstrumenttype'],
        financialHoldingInstrumentName: entity['FHI_OVERDRAFT.msfsi_name'],
        fhiOverdraftLimit: entity['FHI_OVERDRAFT.msfsi_overdraftlimit'],
        fhiOverdraftLimitUsed: entity['FHI_OVERDRAFT.msfsi_overdraftlimitused'],
        fhiOverdraftRate: entity['FHI_OVERDRAFT.msfsi_overdraftrate'],
    };
};

export const createStandingInstrument = (entity: any): FinancialInstrumentFields => {
    return {
        financialHoldingInstrumentType: entity['FHI_STANDING.msfsi_financialinstrumenttype'],
        financialHoldingInstrumentName: entity['FHI_STANDING.msfsi_name'],
        fhiNextItemDate: entity['FHI_STANDING.msfsi_nextitemdate'] && new Date(entity['FHI_STANDING.msfsi_nextitemdate']),
        fhiLastItemDate: entity['FHI_STANDING.msfsi_lastitemdate'] && new Date(entity['FHI_STANDING.msfsi_lastitemdate']),
        fhiFrequency: entity['FHI_STANDING.msfsi_frequency'],
        fhiFirstPaymentDate: entity['FHI_STANDING.msfsi_firstpaymentdate'] && new Date(entity['FHI_STANDING.msfsi_firstpaymentdate']),
        fhiLastItemAmount: entity['FHI_STANDING.msfsi_lastitemamount'],
        fhiLastItemStatusReason: entity['FHI_STANDING.msfsi_lastitemstatusreason'],
        fhiLastItemStatus: entity['FHI_STANDING.msfsi_lastitemstatus'],
        fhiNextItemCount: entity['FHI_STANDING.msfsi_nextitemamount'],
        fhiDebtorAccount: entity['FHI_STANDING.msfsi_debtoraccount'],
        fhiTotalAmount: entity['FHI_STANDING.msfsi_standingorderamount'],
        fhiCreditorName: entity['FHI_STANDING.msfsi_creditorname'],
        fsiDayOfMonth: entity['FHI_STANDING.msfsi_dayofmonth'],
        fsiDayOfWeek: entity['FHI_STANDING.msfsi_dayofweek'],
    };
};

const FHI_TYPE_TO_MAPPER = {
    [FH_INSTRUMENT_NAME_TO_TYPE.card]: createCardInstrument,
    [FH_INSTRUMENT_NAME_TO_TYPE.directDebit]: createDebitInstrument,
    [FH_INSTRUMENT_NAME_TO_TYPE.overdraft]: createOverdraftInstrument,
    [FH_INSTRUMENT_NAME_TO_TYPE.standingOrder]: createStandingInstrument,
};

const FHI_TYPE_ALIAS_MAP = {
    [FH_INSTRUMENT_NAME_TO_TYPE.card]: 'FHI_CARD',
    [FH_INSTRUMENT_NAME_TO_TYPE.directDebit]: 'FHI_DEBIT',
    [FH_INSTRUMENT_NAME_TO_TYPE.overdraft]: 'FHI_OVERDRAFT',
    [FH_INSTRUMENT_NAME_TO_TYPE.standingOrder]: 'FHI_STANDING',
};

const FH_CATEGORY_TO_MAPPER = {
    [FH_NAME_TO_CATEGORY_MAP.Account]: createAccount,
    [FH_NAME_TO_CATEGORY_MAP.Investments]: createInvestment,
    [FH_NAME_TO_CATEGORY_MAP.Loans]: createLoan,
    [FH_NAME_TO_CATEGORY_MAP.Credit]: createCredit,
    [FH_NAME_TO_CATEGORY_MAP.Saving]: createSavings,
};

export const createFHCategory = (entity: Map<string, any> | { [key: string]: any }): FHBaseCategory => {
    const categoryCode = entity['FH.msfsi_financialholdingcategory'];
    const categoryMapper = FH_CATEGORY_TO_MAPPER[categoryCode];

    return categoryMapper ? categoryMapper(entity) : {};
};

export const extractFromAllFHITables = (entity: any, field: string): any => {
    return entity[`FHI_CARD.${field}`] ?? entity[`FHI_DEBIT.${field}`] ?? entity[`FHI_OVERDRAFT.${field}`] ?? entity[`FHI_STANDING.${field}`];
};

export const extractFromAllFHTables = (entity: any, field: string): any => {
    return (
        entity[`FH_ACCOUNT.${field}`] ??
        entity[`FH_INVESTMENT.${field}`] ??
        entity[`FH_LOAN.${field}`] ??
        entity[`FH_CREDIT.${field}`] ??
        entity[`FH_SAVING.${field}`]
    );
};

export const createFinancialInstrumentFields = (entity: any): FinancialInstrumentFields => {
    const type = extractFromAllFHITables(entity, 'msfsi_financialinstrumenttype');

    const createInstrumentFunction = FHI_TYPE_TO_MAPPER[type];

    if (!createInstrumentFunction) {
        return {};
    }
    return createInstrumentFunction(entity);
};

const buildAttributes = (entity: any) => {
    let fhEntityAttributes: any = {};
    entity['Attributes'].forEach(attribute => {
        const value = attribute.Value?.Value === 0 ? 0 : attribute.Value?.Value || attribute.Value?.Id || attribute.Value;
        fhEntityAttributes = { ...fhEntityAttributes, [attribute.Key]: value };
    });

    return fhEntityAttributes;
};

export const createOrUpdateFHFields = (entity: any, map: FinancialHoldingMap): FinancialHoldingFields => {
    const id = entity['FH.msfsi_financialholdingid'];
    const fhiName = extractFromAllFHITables(entity, 'msfsi_name');
    const { fhiPolyState, fhiState, entityState } = extractStateFromFHI(entity);
    let financialHolding = map.get(id);

    if (!financialHolding) {
        financialHolding = createFinancialHolding(entity);
    }
    if (fhiName && fhiState === ActiveStateCode && entityState === ActiveStateCode && fhiPolyState === ActiveStateCode) {
        financialHolding.financialInstruments.push(createFinancialInstrumentFields(entity));
    }

    financialHolding.fhCategoryEntity = createFHCategory(entity);
    return financialHolding;
};

export const createFinancialHoldingMap = (fhRecords: any[], fiRecords: any[] = [], resultFromBackEnd: boolean): FinancialHoldingMap => {
    const fhMap: FinancialHoldingMap = new Map();
    fhRecords.forEach(fhEntity => {
        const fhAttributes = resultFromBackEnd ? buildAttributes(fhEntity) : fhEntity;
        const { fhPolyState, fhState, entityState } = extractStateFromFH(fhAttributes);
        if (fhState === ActiveStateCode && entityState === ActiveStateCode && fhPolyState === ActiveStateCode) {
            const financialHolding = createFinancialHolding(fhAttributes);
            financialHolding.fhCategoryEntity = createFHCategory(fhAttributes);
            fhMap.set(financialHolding.id, financialHolding);
        }
    });

    fiRecords.forEach(fiEntity => {
        const fh = fhMap.get(fiEntity['FHI.msfsi_financialholding']);
        const { fhiPolyState, fhiState, entityState } = extractStateFromFHI(fiEntity);
        if (fh && fhiState === ActiveStateCode && entityState === ActiveStateCode && fhiPolyState === ActiveStateCode) {
            fh.financialInstruments.push(createFinancialInstrumentFields(fiEntity));
        }
    });
    return fhMap;
};

export const extractStateFromFHI = (entity: any) => {
    const fhiPolyState = extractFromAllFHITables(entity, 'statecode') ?? 0;
    const fhiState = entity['FHI.statecode'] || 0;
    const entityState = entity['statecode'] || 0;
    return { fhiPolyState, fhiState, entityState };
};

export const extractStateFromFH = (entity: any) => {
    const fhPolyState = extractFromAllFHTables(entity, 'statecode') ?? 0;
    const fhState = entity['FH.statecode'] || 0;
    const entityState = entity['statecode'] || 0;
    return { fhPolyState, fhState, entityState };
};

export const buildHiddenFinancialHoldings = (context: CommonPCFContext) => {
    const hiddenFinancialHoldings = getContextSetValue(context, FINANCIAL_HOLDINGS_HIDE_LIST_CONFIGURATIONS);
    return Array.from(hiddenFinancialHoldings || []).reduce((prevValue, currValue) => {
        if (!Number(currValue)) {
            return { ...prevValue };
        }
        return { ...prevValue, [currValue]: false };
    }, {});
};

export const buildHiddenFHByCategory = (category: String) => {
    return Object.values(FH_NAME_TO_CATEGORY_MAP).reduce((prevValue, currValue) => {
        return { ...prevValue, [currValue]: category === currValue.toString() };
    }, {});
};
