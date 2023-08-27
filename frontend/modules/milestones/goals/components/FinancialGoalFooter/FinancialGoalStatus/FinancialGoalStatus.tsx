import React, { FC } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import {
    dateFinancialGoalStyle,
    goalBoxStyle,
    financialGoalReviewDateStyle,
    completeGoalStyle,
    completeGoalStyleSidePanel,
    typeWrapperStylesNoTagFinancialGoal,
    typeWrapperStylesTagFinancialGoal,
} from './FinancialGoalStatus.style';
import { IFinancialGoal } from '../../../interfaces/FinancialGoal.interface';
import { isPlannedElement, isTodayElement, relativeGoalDateString } from '../../../../utilities/LifeEventsUtils';

export interface IFinancialGoalStatusProps {
    financialGoal: IFinancialGoal;
    isSidePanel?: boolean;
}

const FinancialGoalStatus: FC<IFinancialGoalStatusProps> = ({ financialGoal, isSidePanel }) => {
    const { isCompleted, targetDate } = financialGoal;
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const sidePanelCompleteGoalStyle = isCompleted && isSidePanel ? completeGoalStyleSidePanel : completeGoalStyle;
    const isEventInFuture = isTodayElement(targetDate) || isPlannedElement(targetDate);
    const relativeDateString = financialGoal && relativeGoalDateString(financialGoal, translate);

    const stackWrapperTagStyles = isEventInFuture && !isCompleted ? typeWrapperStylesNoTagFinancialGoal : typeWrapperStylesTagFinancialGoal;

    return (
        <Stack horizontal styles={stackWrapperTagStyles}>
            {isCompleted ? (
                <Text data-testid="completed-financial-goal" styles={sidePanelCompleteGoalStyle}>
                    {translate('COMPLETED')}
                </Text>
            ) : isSidePanel ? (
                <Text styles={goalBoxStyle}> {translate('GOAL')}</Text>
            ) : isEventInFuture ? (
                <Text data-testid="event-relative-time-financial-goal" styles={dateFinancialGoalStyle} title={relativeDateString}>
                    {relativeDateString}
                </Text>
            ) : (
                <Text styles={financialGoalReviewDateStyle}> {translate('REVIEW_DATE')} </Text>
            )}
        </Stack>
    );
};

export default FinancialGoalStatus;
