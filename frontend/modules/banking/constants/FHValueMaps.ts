import { CategoryStructure } from '../components/detailedFinancialHolding/utilities/SIDComponentStructure';
import { ILoanLineProps } from '../components/summaryFH/FHLoansTable';
import { ISavingsLineProps } from '../components/summaryFH/FHLongTermSavingTable';
import { ISummaryLineProps } from '../components/summaryFH/FHOverviewTable';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { IBoxDetails } from '@fsi/core-components/dist/components/atoms/DataBox/DataBox.interface';
import { IInvestmentsLineProps } from '../components/summaryFH/FHInvestmentTable';
import { FHDataBoxDetails, FHDataBoxType } from '../components/detailedFinancialHolding/components/FHDataBox';
import { FHMetadata, FinancialInstrumentFields } from '../interfaces/FHEntity';
import { getFHEntityDisplayName, getOptionSetText } from '../utilities/EntityMetadata';

export const FH_NAME_TO_CATEGORY_MAP = {
    Account: 104800004, //accounts
    Investments: 104800002, //investments
    Loans: 104800001, //loans
    Credit: 104800000, //credit line
    Saving: 104800003, //long term savings
};

export const MARKET_PRODUCT_TYPE_TO_CATEGORY_MAP = {
    OTHER: 105000000,
};

export const FH_CATEGORY_TO_ENTITY_NAME: { [category: number]: string } = {
    104800004: 'msfsi_FH_Account',
    104800002: 'msfsi_FH_Investment',
    104800001: 'msfsi_FH_Loan',
    104800000: 'msfsi_FH_Creditline',
    104800003: 'msfsi_FH_Saving',
};

export const FH_NAME_TO_TYPE_MAP = {
    Brokerage: 104800000,
    Discretionary: 104800001,
    Retirement: 104800002,
    Education: 104800003,
    Custodial: 104800004,
    Secured: 104800006,
    Unsecured: 104800007,
    Mortgage: 104800008,
    Checking: 104800009,
    Saving: 104800010,
    Deposit: 104800011,
    ProvidentFund: 104800012,
    CreditLine: 104800013,
    Other: 104800014,
};

export const FH_CATEGORY_ORDER: { [key: number]: number } = {
    104800004: 1,
    104800002: 2,
    104800001: 3,
    104800000: 4,
    104800003: 5,
};

export interface SummaryLineMap {
    [key: number]: ISummaryLineProps;
}
export const FH_OVERVIEW_ICON_TEXT_MAP: SummaryLineMap = {
    104800004: { category: FH_NAME_TO_CATEGORY_MAP.Account, icon: 'AccountBrowser', sum: 0, indicator: undefined, count: 0, restricted: false },
    104800002: { category: FH_NAME_TO_CATEGORY_MAP.Investments, icon: 'BarChartVertical', sum: 0, indicator: undefined, count: 0, restricted: false },
    104800001: { category: FH_NAME_TO_CATEGORY_MAP.Loans, icon: 'Money', sum: 0, indicator: undefined, count: 0, restricted: false },
    104800000: { category: FH_NAME_TO_CATEGORY_MAP.Credit, icon: 'PaymentCard', sum: 0, indicator: undefined, count: 0, restricted: false },
    104800003: { category: FH_NAME_TO_CATEGORY_MAP.Saving, icon: 'Savings', sum: 0, indicator: undefined, count: 0, restricted: false },
};

export interface LoanLineMap {
    [key: number]: ILoanLineProps;
}
export const FH_LOAN_ICON_TEXT_MAP: LoanLineMap = {
    104800006: { icon: 'Shield', count: 0, sum: 0, indicator: undefined },
    104800007: { icon: 'ShieldAlert', count: 0, sum: 0, indicator: undefined },
    104800008: { icon: 'Home', count: 0, sum: 0, indicator: undefined },
};

export interface SavingsLineMap {
    [key: number]: ISavingsLineProps;
}
export const FH_SAVINGS_ICON_TEXT_MAP: SavingsLineMap = {
    104800011: { icon: 'Savings', count: 0, sum: 0, indicator: undefined },
    104800012: { icon: 'Savings', count: 0, sum: 0, indicator: undefined },
};

export interface InvestmentsLineMap {
    [key: number]: IInvestmentsLineProps;
}
export const FH_INVESTMENTS_TYPE = [104800000, 104800001, 104800002, 104800003, 104800004];

export const FH_INVESTMENTS_TYPE_ICON = {
    104800000: 'Chart',
    104800001: 'AccountManagement',
    104800002: 'Vacation',
    104800003: 'Education',
    104800004: 'ConnectContacts',
};

export const FH_INSTRUMENT_NAME_TO_TYPE = {
    directDebit: 104800000,
    standingOrder: 104800001,
    card: 104800002,
    overdraft: 104800003,
};

export const fhRolesValues = {
    owner: 104800000,
    cardHolder: 104800001,
    signatory: 104800002,
    coSigner: 104800003,
    jointOwner: 104800004,
    beneficiary: 104800005,
    guarantor: 104800006,
};

export const fhOwnerRoles = [fhRolesValues.owner, fhRolesValues.jointOwner];

export interface InstrumentSubTitleProps {
    text: string;
    icon?: string;
    size?: number;
    color?: string;
    type?: string;
    name?: string;
}
export interface InstrumentHeaderProps {
    title: string | undefined;
    subTitle: InstrumentSubTitleProps;
    leftMainValue: IBoxDetails;
    rightMainValue: IBoxDetails;
}
export interface OverdraftHeaderProps {
    title: string | undefined;
    leftMainValue: FHDataBoxDetails;
    middleMainValue: FHDataBoxDetails;
    rightMainValue: FHDataBoxDetails;
}
export const instrumentTypeToFields = (entity: FinancialInstrumentFields, metadata?: FHMetadata): { [key: number]: CategoryStructure } => {
    return {
        104800000: {
            header: {
                title: entity.fhiCreditorName,
                subTitle: { text: `${entity.fhiCreditorIdentifier}` },
                leftMainValue: { label: getFHEntityDisplayName('fhiMandateId', metadata), value: entity.fhiMandateId },
                rightMainValue: { label: getFHEntityDisplayName('fhiDebtorAccount', metadata), value: entity.fhiDebtorAccount },
            },
            footer: [
                [
                    { type: FHDataBoxType.Currency, label: getFHEntityDisplayName('fhiMandateLimit', metadata), value: entity.fhiMandateLimit },
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiMandateStartDate', metadata), value: entity.fhiMandateStartDate },
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiMandateEndDate', metadata), value: entity.fhiMandateEndDate },
                ],
                [
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiNextItemDate', metadata), value: entity.fhiNextItemDate },
                    { type: FHDataBoxType.Currency, label: getFHEntityDisplayName('fhiNextItemCount', metadata), value: entity.fhiNextItemCount },
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiLastItemDate', metadata), value: entity.fhiLastItemDate },
                    { type: FHDataBoxType.Currency, label: getFHEntityDisplayName('fhiLastItemAmount', metadata), value: entity.fhiLastItemAmount },
                ],
                [
                    {
                        type: FHDataBoxType.OptionSet,
                        label: getFHEntityDisplayName('fhiLastItemStatus', metadata),
                        value: getOptionSetText(entity.fhiLastItemStatus || 0, metadata?.fhiLastItemStatus),
                    },
                    {
                        type: FHDataBoxType.Text,
                        label: getFHEntityDisplayName('fhiLastItemStatusReason', metadata),
                        value: entity.fhiLastItemStatusReason,
                    },
                ],
            ],
        },
        104800001: {
            header: {
                title: entity.fhiCreditorName,
                subTitle: { text: getOptionSetText(entity.fhiFrequency, metadata?.fhiFrequency) },
                leftMainValue: { label: getFHEntityDisplayName('fhiDebtorAccount', metadata), value: entity.fhiDebtorAccount },
                rightMainValue: { label: getFHEntityDisplayName('fhiCreditorIdentifier', metadata), value: entity.fhiCreditorIdentifier },
            },
            footer: [
                [
                    { type: FHDataBoxType.Currency, label: getFHEntityDisplayName('fhiTotalAmount', metadata), value: entity.fhiTotalAmount },
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiFirstPaymentDate', metadata), value: entity.fhiFirstPaymentDate },
                    { type: FHDataBoxType.Text, label: getFHEntityDisplayName('fsiDayOfMonth', metadata), value: entity.fsiDayOfMonth },
                    {
                        type: FHDataBoxType.Text,
                        label: getFHEntityDisplayName('fsiDayOfWeek', metadata),
                        value: getOptionSetText(entity.fsiDayOfWeek || 0, metadata?.fsiDayOfWeek),
                    },
                ],
                [
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiNextItemDate', metadata), value: entity.fhiNextItemDate },
                    { type: FHDataBoxType.Currency, label: getFHEntityDisplayName('fhiNextItemCount', metadata), value: entity.fhiNextItemCount },
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiLastItemDate', metadata), value: entity.fhiLastItemDate },
                    { type: FHDataBoxType.Currency, label: getFHEntityDisplayName('fhiLastItemAmount', metadata), value: entity.fhiLastItemAmount },
                ],
                [
                    {
                        type: FHDataBoxType.Text,
                        label: getFHEntityDisplayName('fhiLastItemStatus', metadata),
                        value: getOptionSetText(entity.fhiLastItemStatus || 0, metadata?.fhiLastItemStatus),
                    },
                    {
                        type: FHDataBoxType.Text,
                        label: getFHEntityDisplayName('fhiLastItemStatusReason', metadata),
                        value: entity.fhiLastItemStatusReason,
                    },
                ],
            ],
        },
        104800002: {
            header: {
                title: entity.fsiCardNetwork,
                subTitle: {
                    ...CARD_STATUS_TO_HEADER[entity.fhiStatus || 0],
                    text: getOptionSetText(entity.fhiStatus, metadata?.fhiStatus),
                    type: getOptionSetText(entity.fhiCardType, metadata?.fhiCardType),
                    name: entity.fsiProductName,
                },
                leftMainValue: { label: getFHEntityDisplayName('fhiEmbossingName', metadata), value: entity.fhiEmbossingName },
                rightMainValue: { label: getFHEntityDisplayName('fhiCardNumber', metadata), value: entity.fhiCardNumber },
            },
            footer: [
                [
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiIssueDate', metadata), value: entity.fhiIssueDate },
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiExpiryDate', metadata), value: entity.fhiExpiryDate },
                    { type: FHDataBoxType.Date, label: getFHEntityDisplayName('fhiActivationDate', metadata), value: entity.fhiActivationDate },
                ],
                [
                    { type: FHDataBoxType.Currency, label: getFHEntityDisplayName('fhiPurchasingLimit', metadata), value: entity.fhiPurchasingLimit },
                    { type: FHDataBoxType.Currency, label: getFHEntityDisplayName('fhiWithdrawalLimit', metadata), value: entity.fhiWithdrawalLimit },
                    {
                        type: FHDataBoxType.Number,
                        label: getFHEntityDisplayName('fhiNumberOfTransactions', metadata),
                        value: entity.fhiNumberOfTransactions,
                    },
                    {
                        type: FHDataBoxType.Number,
                        label: getFHEntityDisplayName('fhiNumberOfCashWithdrawal', metadata),
                        value: entity.fhiNumberOfCashWithdrawal,
                    },
                ],
            ],
        },
        104800003: {
            header: {
                title: getOptionSetText(FH_INSTRUMENT_NAME_TO_TYPE.overdraft, metadata?.financialHoldingInstrumentType),
                leftMainValue: {
                    type: FHDataBoxType.Currency,
                    label: getFHEntityDisplayName('fhiOverdraftLimitUsed', metadata),
                    value: entity.fhiOverdraftLimitUsed,
                },
                middleMainValue: {
                    type: FHDataBoxType.Currency,
                    label: getFHEntityDisplayName('fhiOverdraftLimit', metadata),
                    value: entity.fhiOverdraftLimit,
                },
                rightMainValue: {
                    type: FHDataBoxType.Rate,
                    label: getFHEntityDisplayName('fhiOverdraftRate', metadata),
                    value: entity.fhiOverdraftRate,
                },
            },
        },
    };
};

export const CARD_STATUS_TO_HEADER = {
    104800000: { icon: 'LocationDot', color: COLORS.blue, size: 18 },
    104800001: { icon: 'warning', color: COLORS.red },
    104800002: { icon: 'LocationDot', color: COLORS.red, size: 18 },
    104800003: { icon: 'warning', color: COLORS.red },
};

export const BANKING_CARDS_STATUS = {
    Active: 104800000,
    Stolen: 104800001,
    NotActive: 104800002,
    Lost: 104800003,
    ExpiresSoon: 104800004,
    Expired: 104800005,
};

export const BANKING_CARDS_TYPE = {
    Debit: 104800000,
    Credit: 104800001,
};

export const CARD_STATUS_ORDER = {
    104800000: 5,
    104800001: 1,
    104800002: 3,
    104800003: 2,
    undefined: 6,
};

export const FH_INSTRUMENT_TYPE_ORDER = {
    104800000: 3,
    104800001: 2,
    104800002: 1,
    104800003: 0,
};
