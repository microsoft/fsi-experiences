import FHAccount from '../../interfaces/FHEntity/FHAccount';
import FHCredit from '../../interfaces/FHEntity/FHCredit';
import FHInvestment from '../../interfaces/FHEntity/FHInvestment';
import FHLoan from '../../interfaces/FHEntity/FHLoan';
import FHSavings from '../../interfaces/FHEntity/FHSavings';
import FinancialHoldingFields from '../../interfaces/FHEntity/FinancialHoldingFields';
import { daysDueCondition, weekDiff } from '@fsi/core-components/dist/utilities/TimeUtils';
import isNil from 'lodash/isNil';
import FinancialInstrumentFields from '../../interfaces/FHEntity/FinancialInstrumentFields';
import FHBaseCategory from '../../interfaces/FHEntity/FHBaseCategory';
import { useMemo } from 'react';
import { FHData } from '../../interfaces/FHEntity/FHData';
import { FHMetadata } from '../../interfaces/FHEntity/FHMetadata';
import { IConditionIndicatorFields, IIndicatorFields, IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { EntityMetadataWithOptionSet } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { FINANCIAL_HOLDINGS_FLAGS } from '../../constants/features/financialHoldings';
import { FH_NAME_TO_CATEGORY_MAP } from '../../constants/FHValueMaps';

export const getFHAccountIndicators = (entity: FHAccount, metaData: FHMetadata): IConditionIndicatorFields[] => {
    const balanceIndicatorCondition = () => {
        if (entity.fhAvailableBalance === undefined || !entity.fhAverageBalance) {
            return false;
        }

        const changeNum = (100 * (entity.fhAvailableBalance - entity.fhAverageBalance)) / entity.fhAverageBalance;
        return Math.abs(changeNum) >= 30;
    };

    const higherOrLower =
        /* istanbul ignore next*/ (entity.fhAvailableBalance || 0) > /* istanbul ignore next*/ (entity.fhAverageBalance || 0) ? 'HIGHER' : 'LOWER';
    return [
        {
            order: 3,
            type: () => 'warning',
            condition: () => (entity.fhAccountBlockedAmount || 0) > (entity.fhAverageBalance || 0),
            messageKey: 'INDICATOR_ACCOUNT_BLOCKED_EXCEEDED',
        },
        {
            order: 4,
            type: () => 'fyi',
            condition: balanceIndicatorCondition,
            messageKey: `INDICATOR_ACCOUNT_AVAILABLE_BALANCE_${higherOrLower}`,
        },
    ].filter(item => item.condition());
};

export const getFHCreditIndicators = (entity: FHCredit, balance: number, metaData: FHMetadata): IConditionIndicatorFields[] => {
    const limitApproachingCondition = () => {
        if (!balance || !entity.fhCreditLimit) {
            return false;
        }

        const percent = (entity.fhCreditLimit / 100) * 80;

        return balance >= percent;
    };
    const approachingOrReached = balance < /* istanbul ignore next*/ (entity.fhCreditLimit || 0) ? 'APPROACHING' : 'REACHED';
    return [
        {
            order: 1,
            type: () => 'fyi',
            condition: () => limitApproachingCondition(),
            messageKey: `INDICATOR_OUTSTANDING_BALANCE_LIMIT_${approachingOrReached}`,
        },
    ].filter(item => item.condition());
};

export const getFHLoanIndicators = (entity: FHLoan, metaData: FHMetadata): IConditionIndicatorFields[] => {
    const statusOptionsSet = metaData.fhCollectionRisk ? (metaData.fhCollectionRisk as EntityMetadataWithOptionSet).optionSet || {} : {};
    const maturityWeekDiff = weekDiff(entity.fhLoanMaturityDate);
    const interestWeekDiff = weekDiff(entity.fhNextInterestReviewDate);

    const list: IConditionIndicatorFields[] = [
        {
            order: 3,
            type: () => 'timeSensitive',
            condition: () => daysDueCondition(entity.fhLoanMaturityDate),
            messageKey: 'INDICATOR_MATURITY_TIME_IN_RANGE_MESSAGE',
            messageProps: {
                weekDiff: maturityWeekDiff,
                pluralCount: maturityWeekDiff,
            },
        },
        {
            order: 2,
            type: () => 'timeSensitive',
            condition: () => daysDueCondition(entity.fhNextInterestReviewDate),
            messageKey: 'INDICATOR_INTEREST_REVIEW_TIME_IN_RANGE_MESSAGE',
            messageProps: {
                weekDiff: interestWeekDiff,
                pluralCount: maturityWeekDiff,
            },
        },
        {
            order: 1,
            type: () => 'warning',
            condition: () => entity.fhDelinquencyStatus && (entity.fhDaysPastDue || 0) > 30,
            messageKey: 'INDICATOR_LOAN_PAYMENT_RISK',
            messageProps: {
                fhDaysPastDue: entity.fhDaysPastDue || '',
                risk: statusOptionsSet[entity.fhCollectionRisk || 0]?.text || '',
            },
        },
    ];
    return list.filter(item => item.condition());
};

export const getFHLoanInvestIndicators = (entity: FHInvestment, metaData: FHMetadata): IConditionIndicatorFields[] => {
    return [];
};

export const getFHLSavingIndicators = (entity: FHSavings, metaData: FHMetadata): IConditionIndicatorFields[] => {
    const maturityWeekDiff = weekDiff(entity.fhMaturityDate);

    return [
        {
            order: 1,
            type: () => 'timeSensitive',
            condition: () => daysDueCondition(entity.fhMaturityDate, 30),
            messageKey: 'INDICATOR_MATURITY_TIME_IN_RANGE_MESSAGE',
            messageProps: {
                weekDiff: maturityWeekDiff,
                pluralCount: maturityWeekDiff,
            },
        },
        {
            order: 2,
            type: () => 'warning',
            condition: () => !isNil(entity.fhSavingsBlockedAmount),
            messageKey: 'INDICATOR_LONG_TERM_SAVING_BLOCKED',
        },
    ].filter(item => item.condition());
};

export const geFinancialHoldingsInstrumentIndicators = (entity: FinancialInstrumentFields, metaData: FHMetadata): IConditionIndicatorFields[] => {
    const limitApproachingCondition = () => {
        if (!entity.fhiOverdraftLimitUsed || !entity.fhiOverdraftLimit) {
            return false;
        }

        return entity.fhiOverdraftLimitUsed >= 0.8 * entity.fhiOverdraftLimit;
    };

    const approachingOrReached =
        /* istanbul ignore next*/ (entity.fhiOverdraftLimitUsed || 0) < /* istanbul ignore next*/ (entity.fhiOverdraftLimit || 0)
            ? 'APPROACHING'
            : 'REACHED';
    const statusOptionsSet = metaData.fhiLastItemStatus ? (metaData.fhiLastItemStatus as EntityMetadataWithOptionSet).optionSet || {} : {};
    return [
        {
            order: 1,
            type: () => 'warning',
            condition: () => limitApproachingCondition(),
            messageKey: `INDICATOR_OVERDRAFT_LIMIT_${approachingOrReached}`,
        },
        {
            order: 2,
            type: () => 'timeSensitive',
            condition: () => (entity.fhiLastItemStatus ? entity.fhiLastItemStatus !== 104800000 : false),
            messageKey: 'INDICATOR_STANDING_ORDER_STATUS',
            messageProps: {
                status: statusOptionsSet[entity.fhiLastItemStatus || 0]?.text || '',
            },
        },
        {
            order: 2,
            type: () => 'warning',
            condition: () => (entity.fhiLastItemStatus ? entity.fhiLastItemStatus !== 104800000 : false),
            messageKey: 'INDICATOR_DIRECT_DEPOSIT_STATUS',
            messageProps: {
                status: statusOptionsSet[entity.fhiLastItemStatus || 0]?.text || '',
            },
        },
    ].filter(item => item.condition());
};

export const getCategoryIndicators = (code: number, fHBaseCategory: FHBaseCategory, balance: number, metaData: FHMetadata) => {
    switch (code) {
        case FH_NAME_TO_CATEGORY_MAP.Account: {
            return getFHAccountIndicators(fHBaseCategory, metaData);
        }
        case FH_NAME_TO_CATEGORY_MAP.Credit: {
            return getFHCreditIndicators(fHBaseCategory, balance, metaData);
        }
        case FH_NAME_TO_CATEGORY_MAP.Loans: {
            return getFHLoanIndicators(fHBaseCategory, metaData);
        }
        case FH_NAME_TO_CATEGORY_MAP.Saving: {
            return getFHLSavingIndicators(fHBaseCategory, metaData);
        }
        /* istanbul ignore next */
        case FH_NAME_TO_CATEGORY_MAP.Investments: {
            return getFHLoanInvestIndicators(fHBaseCategory, metaData);
        }
    }

    return [];
};

export const getFinancialHoldingsIndicators = (
    entity: FinancialHoldingFields,
    metaData: FHMetadata,
    disabledFinancialInsights?: boolean
): IIndicatorFields[] => {
    let indicatorList: IIndicatorFields[] = [];

    if (disabledFinancialInsights) {
        return indicatorList;
    }

    if (entity.fhCategoryEntity) {
        indicatorList = getCategoryIndicators(entity.category as number, entity.fhCategoryEntity as FHBaseCategory, entity.balance, metaData);
    }

    if (entity.financialInstruments) {
        for (const instrument of entity.financialInstruments) {
            indicatorList = indicatorList.concat(geFinancialHoldingsInstrumentIndicators(instrument, metaData));
        }
    }

    const rtVal = indicatorList.sort((a, b) => a.order - b.order);

    return rtVal;
};

export const toIndictableFinancialHoldings = (fhData?: FHData, metaData?: FHMetadata, disabledFinancialInsights?: boolean): IndictableFH[] => {
    if (!metaData || !fhData) {
        return [];
    }
    const entities = Array.from(fhData?.data.values() || []);
    return entities.map(item => {
        return {
            ...item,
            indicator: getFinancialHoldingsIndicators(item, metaData, disabledFinancialInsights),
        };
    });
};

export const useFHIndicators = (fhData?: FHData, metaData?: FHMetadata): IndictableFH[] => {
    const enabledFinancialInsights = useIsFeatureEnabled(FINANCIAL_HOLDINGS_FLAGS.SHOW_FINANCIAL_INSIGHTS);

    return useMemo(() => toIndictableFinancialHoldings(fhData, metaData, !enabledFinancialInsights), [fhData, metaData, enabledFinancialInsights]);
};
