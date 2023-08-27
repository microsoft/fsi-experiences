import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { FontIcon, Label } from '@fluentui/react';
import FinancialGoalStatus from '../FinancialGoalFooter/FinancialGoalStatus/FinancialGoalStatus';
import {
    goalSidePanelStyle,
    iconStyle,
    iconTypeStyle,
    targetNameTitleStyles,
    typeGoalStyle,
    typeGoalWrapperStyle,
    typeStringItemStyles,
    typeWrapperStylesFinancialGoal,
    wrapperTagAndGoalName,
} from './FinancialGoalSidePanel.style';
import { Text } from '@fluentui/react/lib/Text';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { LifeEvent } from '../../../interfaces/LifeEvent';
import { useCurrencies } from '@fsi/core-components/dist/context/hooks/useCurrencies';
import { convertShortDateFormat, goalSameDateAsEvent, isCompactNumber, isPastElement } from '../../../utilities/LifeEventsUtils';
import NumericValue from '@fsi/core-components/dist/components/atoms/NumericValue/NumericValue';
import { externalTagStyle } from '../../../components/LifeEventsSidePanel/LEventElementInSidePanel/LEventElementInSidePanel.style';
export interface IFinancialGoalStatusProps {
    lifeEvent: LifeEvent;
    relativeDateString?: string;
    isExternal: boolean;
    type?: string;
    isNew?: boolean;
}

const FinancialGoalSidePanel: FC<IFinancialGoalStatusProps> = ({ lifeEvent, relativeDateString, isExternal, type, isNew }) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const { baseCurrencyCode } = useCurrencies();

    const { financialGoal } = lifeEvent;
    const { targetName, targetValue, targetDate } = financialGoal!;

    const isPrev = isPastElement(targetDate);
    const onSameDay = goalSameDateAsEvent(lifeEvent);

    const prevDateOfGoal = translate('BY_DATE', { date: convertShortDateFormat(targetDate!) });
    const goalDateFormat = isPrev ? prevDateOfGoal : relativeDateString;

    return (
        <Stack>
            <Stack styles={goalSidePanelStyle}>
                {onSameDay && <FontIcon iconName="ReturnKey" style={iconStyle} date-testid="icon-goal-arrow-side-panel" />}
                <Stack>
                    <Stack styles={wrapperTagAndGoalName} tokens={{ childrenGap: 6 }} horizontal>
                        <FinancialGoalStatus financialGoal={financialGoal!} isSidePanel />
                        <Text styles={targetNameTitleStyles}>{targetName}</Text>
                    </Stack>
                    <Stack horizontal styles={typeWrapperStylesFinancialGoal}>
                        <NumericValue styles={typeStringItemStyles} value={targetValue} compact={isCompactNumber(targetValue)} />
                        <Text styles={typeStringItemStyles}>{baseCurrencyCode}</Text>
                        <Text styles={typeStringItemStyles}>{goalDateFormat}</Text>
                    </Stack>
                </Stack>
                {isExternal && <Label style={externalTagStyle}>{translate('EXTERNAL_SOURCE')}</Label>}
            </Stack>
            {!onSameDay && (
                <Stack horizontal styles={typeGoalWrapperStyle}>
                    <FontIcon iconName="ReturnKey" style={iconTypeStyle} />
                    <Text styles={typeGoalStyle}>{translate('RELATED_EVENT_OF_GOAL', { type: type || '' })}</Text>
                </Stack>
            )}
        </Stack>
    );
};

export default FinancialGoalSidePanel;
