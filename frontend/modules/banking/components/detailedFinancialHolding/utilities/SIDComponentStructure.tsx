import { OverdraftHeaderProps, InstrumentHeaderProps } from '../../../constants/FHValueMaps';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { FHAccount, FHCredit, FHInvestment, FHLoan, FHMetadata, FHSavings, FinancialInstrumentFields } from '../../../interfaces/FHEntity';
import get from 'lodash/get';
import { FHDataBoxDetails, FHDataBoxType } from '../components/FHDataBox/FHDataBox.interface';
import { TranslationFunction } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { IndictableFH } from '../../../interfaces/FHEntity/IndictableFH';
import { EntityMetadataWithOptionSet } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { getFHEntityDisplayName, getOptionSetText } from '../../../utilities/EntityMetadata';

export interface CategoryHeaderProps {
    amountLabel: string;
    balance: number;
    balanceDefault: number;
    balanceExchangeRate: number;
    idLabel?: string;
    idValue?: string;
}

interface IStructure<T> {
    entity: T;
    instruments: FinancialInstrumentFields[];
    balance: number;
    balanceDefault: number;
    balanceExchangeRate: number;
    translate: TranslationFunction;
    metadata: FHMetadata;
    fhCode?: string;
    isPreviewFeatures?: boolean;
}

export type AccountHeaderProps = CategoryHeaderProps;
export type LoanHeaderProps = CategoryHeaderProps & { risk: string | undefined };
export type SavingHeaderProps = CategoryHeaderProps;
export type InvestmentHeaderProps = CategoryHeaderProps & { risk: string; time: string };
export type CreditHeaderProps = CategoryHeaderProps;

export type CategoryHeader =
    | InstrumentHeaderProps
    | OverdraftHeaderProps
    | AccountHeaderProps
    | LoanHeaderProps
    | CreditHeaderProps
    | SavingHeaderProps
    | InvestmentHeaderProps;

export interface CategoryStructure {
    header: CategoryHeader;
    main?: FHDataBoxDetails[];
    footer?: FHDataBoxDetails[][];
    instruments?: FinancialInstrumentFields[];
}

const accountStructure = ({
    entity,
    instruments,
    balance,
    balanceDefault,
    balanceExchangeRate,
    translate,
    metadata,
    fhCode,
}: IStructure<FHAccount>): CategoryStructure => {
    return {
        header: {
            amountLabel: translate('BOOK_BALANCE'),
            balance,
            balanceDefault,
            balanceExchangeRate,
            idLabel: translate('FH_ID_ACCOUNT'),
            idValue: fhCode,
        },
        main: [
            { type: FHDataBoxType.Currency, label: metadata.fhAverageBalance.displayName, field: 'fhAverageBalance', value: entity.fhAverageBalance },
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhAvailableBalance.displayName,
                field: 'fhAvailableBalance',
                value: entity.fhAvailableBalance,
            },
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhUnclearedBalance.displayName,
                field: 'fhUnclearedBalance',
                value: entity.fhUnclearedBalance,
            },
            {
                type: FHDataBoxType.Number,
                label: metadata.fhNumberOfTransactions.displayName,
                field: 'fhNumberOfTransactions',
                value: entity.fhNumberOfTransactions,
            },
        ],
        footer: [
            [
                {
                    type: FHDataBoxType.Currency,
                    label: metadata.fhAccountBlockedAmount.displayName,
                    field: 'fhAccountBlockedAmount',
                    value: entity.fhAccountBlockedAmount,
                },
                {
                    type: FHDataBoxType.Rate,
                    label: metadata.fhAccountInterestRate.displayName,
                    field: 'fhAccountInterestRate',
                    value: entity.fhAccountInterestRate,
                },
            ],
            [
                {
                    type: FHDataBoxType.OptionSet,
                    label: metadata.fhInterestType.displayName,
                    field: 'fhInterestType',
                    value: getOptionSetText(
                        /* istanbul ignore next */ entity.fhInterestType || 0,
                        metadata.fhInterestType as EntityMetadataWithOptionSet
                    ),
                },
            ],
        ],
        instruments,
    };
};

const investmentStructure = ({
    entity,
    instruments,
    balance,
    balanceDefault,
    balanceExchangeRate,
    translate,
    metadata,
    fhCode,
    isPreviewFeatures,
}: IStructure<FHInvestment>): CategoryStructure => {
    const rtVal: CategoryStructure = {
        header: {
            amountLabel: translate('CURRENT_BALANCE'),
            balance: balance,
            balanceDefault: balanceDefault,
            balanceExchangeRate: balanceExchangeRate,
            risk: getOptionSetText(
                /* istanbul ignore next */ entity.fhInvestmentRiskCategory || 0,
                metadata.fhInvestmentRiskCategory as EntityMetadataWithOptionSet
            ),
            idLabel: translate('FH_ID_INVESTMENT'),
            idValue: fhCode,
            time: getOptionSetText(
                /* istanbul ignore next */ entity.fhInvestmentTimeFrame || 0,
                metadata.fhInvestmentTimeFrame as EntityMetadataWithOptionSet
            ),
        },
        main: [
            { type: FHDataBoxType.Date, label: metadata.fhOpenedDate.displayName, field: 'fhOpenedDate', value: entity.fhOpenedDate },
            { type: FHDataBoxType.Currency, label: metadata.fhCashBalance.displayName, field: 'fhCashBalance', value: entity.fhCashBalance },
            { type: FHDataBoxType.SignedCurrency, label: metadata.fhGainLoss.displayName, field: 'fhGainLoss', value: entity.fhGainLoss },
            {
                type: FHDataBoxType.Performance,
                field: 'fhPerformanceYTD',
                value: [
                    { time: 'YTD', text: getFHEntityDisplayName('fhPerformanceYTD', metadata), value: entity.fhPerformanceYTD },
                    { time: '1Y', text: getFHEntityDisplayName('fhPerformance1Y', metadata), value: entity.fhPerformance1Y },
                    { time: '3Y', text: getFHEntityDisplayName('fhPerformance3Y', metadata), value: entity.fhPerformance3Y },
                    ...(isPreviewFeatures
                        ? [{ time: 'LIFETIME', text: getFHEntityDisplayName('fhPerformance', metadata), value: entity.fhPerformance }]
                        : []),
                ],
            },
        ],
        footer: [],
        instruments,
    };

    return rtVal;
};

const loanStructure = ({
    entity,
    instruments,
    balance,
    balanceDefault,
    balanceExchangeRate,
    translate,
    metadata,
    fhCode,
}: IStructure<FHLoan>): CategoryStructure => {
    const footer: FHDataBoxDetails[][] = [];
    footer.push(
        [
            { type: FHDataBoxType.Date, label: metadata.fhLoanStartDate.displayName, field: 'fhLoanStartDate', value: entity.fhLoanStartDate },
            {
                type: FHDataBoxType.Date,
                label: metadata.fhLoanMaturityDate.displayName,
                field: 'fhLoanMaturityDate',
                value: entity.fhLoanMaturityDate,
            },
        ],
        [
            {
                type: FHDataBoxType.Currency,
                label: translate('PAID_PRINCIPAL_AMOUNT'),
                field: 'fhLoanPrincipalAmount',
                value: /* istanbul ignore next */ (entity.fhLoanPrincipalAmount || 0) - balance,
            },
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhTotalInterestPaid.displayName,
                field: 'fhTotalInterestPaid',
                value: entity.fhTotalInterestPaid,
            },
        ],
        [],
        [
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhDisbursedAmount.displayName,
                field: 'entity.fhDisbursedAmount',
                value: entity.fhDisbursedAmount,
            },
            {
                type: FHDataBoxType.Date,
                label: metadata.fhDisbursementDate.displayName,
                field: 'entity.fhDisbursementDate',
                value: entity.fhDisbursementDate,
            },
        ],
        [
            {
                type: FHDataBoxType.Rate,
                label: metadata.fhLoanInterestRate.displayName,
                field: 'fhLoanInterestRate',
                value: entity.fhLoanInterestRate,
            },
            {
                type: FHDataBoxType.OptionSet,
                label: metadata.fhInterestType.displayName,
                field: 'fhInterestType',
                value: getOptionSetText(
                    /* istanbul ignore next */ entity.fhInterestType || 0,
                    metadata.fhInterestType as EntityMetadataWithOptionSet
                ),
            },
        ],
        [
            {
                type: FHDataBoxType.Text,
                label: metadata.fhInterestReviewPeriod.displayName,
                field: 'fhInterestReviewPeriod',
                value: entity.fhInterestReviewPeriod,
            },
            {
                type: FHDataBoxType.Date,
                label: metadata.fhNextInterestReviewDate.displayName,
                field: 'fhNextInterestReviewDate',
                value: entity.fhNextInterestReviewDate,
            },
        ],
        [
            {
                type: FHDataBoxType.OptionSet,
                label: metadata.fhModeOfPayment.displayName,
                field: 'fhModeOfPayment',
                value: getOptionSetText(
                    /* istanbul ignore next */ entity.fhModeOfPayment || 0,
                    metadata.fhModeOfPayment as EntityMetadataWithOptionSet
                ),
            },
            { type: FHDataBoxType.Date, label: metadata.fhRepaymentAccount.displayName, field: 'fhRepaymentAccount', labelColor: undefined },
        ]
    );

    if (entity.fhDelinquencyStatus) {
        footer.push(
            [],
            [
                {
                    type: FHDataBoxType.Currency,
                    label: metadata.fhCapitalArrears.displayName,
                    field: 'fhCapitalArrears',
                    value: entity.fhCapitalArrears,
                    labelColor: COLORS.red,
                },
                {
                    type: FHDataBoxType.Currency,
                    label: metadata.fhInterestArrears.displayName,
                    field: 'fhInterestArrears',
                    value: entity.fhInterestArrears,
                    labelColor: COLORS.red,
                },
            ],
            [
                {
                    type: FHDataBoxType.Currency,
                    label: metadata.fhFeeArrears.displayName,
                    field: 'fhFeeArrears',
                    value: entity.fhFeeArrears,
                    labelColor: COLORS.red,
                },
                {
                    type: FHDataBoxType.Date,
                    label: metadata.fhOverdueDate.displayName,
                    field: 'fhOverdueDate',
                    value: entity.fhOverdueDate,
                    labelColor: COLORS.red,
                },
            ]
        );
    }
    return {
        header: {
            amountLabel: translate('OUTSTANDING_PRINCIPAL_AMOUNT'),
            balance: balance,
            balanceDefault: balanceDefault,
            balanceExchangeRate: balanceExchangeRate,
            idLabel: translate('FH_ID_LOAN'),
            idValue: fhCode,
            risk: getOptionSetText(/* istanbul ignore next */ entity.fhCollectionRisk || 0, metadata.fhCollectionRisk as EntityMetadataWithOptionSet),
        },
        main: [
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhLoanPrincipalAmount.displayName,
                field: 'fhLoanPrincipalAmount',
                value: entity.fhLoanPrincipalAmount,
            },
            {
                type: FHDataBoxType.Date,
                label: metadata.fhLastPaymentDueDate.displayName,
                field: 'fhLastPaymentDate',
                value: entity.fhLastPaymentDate,
                footer: {
                    field: 'fhLastPaymentAmount',
                    type: FHDataBoxType.Currency,
                    value: entity.fhLastPaymentAmount,
                },
            },
            {
                type: FHDataBoxType.Date,
                label: metadata.fhLoanNextPaymentDate.displayName,
                field: 'fhLoanNextPaymentDate',
                value: entity.fhLoanNextPaymentDate,
                footer: {
                    field: 'fhNextPaymentAmount',
                    type: FHDataBoxType.Currency,
                    value: entity.fhNextPaymentAmount,
                },
            },
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhInstallmentAmount.displayName,
                field: 'fhInstallmentAmount',
                value: entity.fhInstallmentAmount,
                footer: {
                    value: `${metadata.fhNumberOfInstallmentPaid.displayName} ${entity.fhNumberOfInstallmentPaid}`,
                    type: FHDataBoxType.Text,
                    field: 'fhNumberOfInstallmentPaid',
                },
            },
        ],
        footer,
        instruments,
    };
};

const creditStructure = ({
    entity,
    instruments,
    balance,
    balanceDefault,
    balanceExchangeRate,
    translate,
    metadata,
    fhCode,
}: IStructure<FHCredit>): CategoryStructure => {
    return {
        header: {
            amountLabel: translate('OUTSTANDING_BALANCE'),
            balance: balance,
            balanceDefault: balanceDefault,
            balanceExchangeRate: balanceExchangeRate,
            idLabel: translate('FH_ID_CREDIT'),
            idValue: fhCode,
        },
        main: [
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhLastStatementBalance.displayName,
                field: 'fhLastStatementBalance',
                value: entity.fhLastStatementBalance,
            },
            {
                type: FHDataBoxType.Date,
                label: metadata.fhNextPaymentDueDate.displayName,
                field: 'fhNextPaymentDueDate',
                value: entity.fhNextPaymentDueDate,
            },
            { type: FHDataBoxType.Rate, label: metadata.fhMonthlyPayment.displayName, field: 'fhMonthlyPayment', value: entity.fhMonthlyPayment },
            { type: FHDataBoxType.Currency, label: metadata.fhCreditLimit.displayName, field: 'fhCreditLimit', value: entity.fhCreditLimit },
        ],
        footer: [
            [
                {
                    type: FHDataBoxType.Date,
                    label: metadata.fhLastPaymentDueDate.displayName,
                    field: 'fhLastPaymentDueDate',
                    value: entity.fhLastPaymentDueDate,
                },
                {
                    type: FHDataBoxType.Date,
                    label: metadata.fhLastStatementDate.displayName,
                    field: 'fhLastStatementDate',
                    value: entity.fhLastStatementDate,
                },
            ],
            [
                {
                    type: FHDataBoxType.Date,
                    label: metadata.fhNextStatementDate.displayName,
                    field: 'fhNextStatementDate',
                    value: entity.fhNextStatementDate,
                },
                {
                    type: FHDataBoxType.Currency,
                    label: metadata.fhMinPaymentDue.displayName,
                    field: 'fhMinPaymentDue',
                    value: entity.fhMinPaymentDue,
                },
            ],
            [
                {
                    type: FHDataBoxType.Rate,
                    label: metadata.fhCreditInterestRate.displayName,
                    field: 'fhCreditInterestRate',
                    value: entity.fhCreditInterestRate,
                },
                {
                    type: FHDataBoxType.Date,
                    label: metadata.fhNextInterestReviewDate.displayName,
                    field: 'fhNextInterestReviewDate',
                    value: entity.fhNextInterestReviewDate,
                },
            ],
        ],
        instruments,
    };
};

const savingStructure = ({
    entity,
    instruments,
    balance,
    balanceDefault,
    balanceExchangeRate,
    translate,
    metadata,
    fhCode,
}: IStructure<FHSavings>): CategoryStructure => {
    return {
        header: {
            amountLabel: translate('INITIAL_AMOUNT'),
            balance: balance,
            balanceDefault: balanceDefault,
            balanceExchangeRate: balanceExchangeRate,
            idLabel: translate('FH_ID_SAVING'),
            idValue: fhCode,
        },
        main: [
            { type: FHDataBoxType.Date, label: metadata.fhMaturityDate.displayName, field: 'fhMaturityDate', value: entity.fhMaturityDate },
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhAccruedInterest.displayName,
                field: 'fhAccruedInterest',
                value: entity.fhAccruedInterest,
            },
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhProjectedInterestAmount.displayName,
                field: 'fhProjectedInterestAmount',
                value: entity.fhProjectedInterestAmount,
            },
            {
                type: FHDataBoxType.Currency,
                label: metadata.fhBalanceAtMaturity.displayName,
                field: 'fhBalanceAtMaturity',
                value: entity.fhBalanceAtMaturity,
            },
        ],
        footer: [
            [
                { type: FHDataBoxType.Text, label: metadata.fhInitialSource.displayName, field: 'fhInitialSource', value: entity.fhInitialSource },
                {
                    type: FHDataBoxType.Text,
                    label: metadata.fhMaturityInstructionsDetails.displayName,
                    field: 'fhMaturityInstructionsDetails',
                    value: entity.fhMaturityInstructionsDetails,
                },
            ],
            [
                { type: FHDataBoxType.Text, label: metadata.fhTerm.displayName, field: 'fhTerm', value: entity.fhTerm },
                {
                    type: FHDataBoxType.Rate,
                    label: metadata.fhSavingsInterestRate.displayName,
                    field: 'fhSavingsInterestRate',
                    value: entity.fhSavingsInterestRate,
                },
            ],
            [
                {
                    type: FHDataBoxType.Currency,
                    label: metadata.fhSavingsBlockedAmount.displayName,
                    field: 'fhSavingsBlockedAmount',
                    value: entity.fhSavingsBlockedAmount,
                },
            ],
        ],
        instruments,
    };
};

const categoryMap = {
    104800004: accountStructure,
    104800002: investmentStructure,
    104800001: loanStructure,
    104800000: creditStructure,
    104800003: savingStructure,
};
export const getStructure = ({
    entity,
    translate,
    metadata,
    isPreviewFeatures,
}: {
    entity: IndictableFH | undefined;
    translate: TranslationFunction;
    metadata?: FHMetadata;
    isPreviewFeatures?: boolean;
}): CategoryStructure | undefined => {
    const category = get(categoryMap, `${entity?.category}`, undefined);
    if (!category) {
        return undefined;
    }

    /* istanbul ignore next */
    const structure: CategoryStructure = category({
        entity: entity?.fhCategoryEntity,
        instruments: entity?.financialInstruments,
        balance: entity?.balanceDisplay,
        balanceDefault: entity?.balanceDefaultDisplay,
        balanceExchangeRate: entity?.balanceExchangeRate,
        translate,
        metadata,
        fhCode: entity?.fhCode,
        isPreviewFeatures,
    });

    return structure;
};

export default getStructure;
