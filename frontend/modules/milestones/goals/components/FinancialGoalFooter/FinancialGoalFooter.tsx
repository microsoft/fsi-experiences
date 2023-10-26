import React, { FC } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import {
    FinancialGoalBoxStyle,
    footerWrapper,
    typeStringItemStyles,
    typeWrapperStylesFinancialGoal,
    valueLabelStylesFinancialGoal,
} from './FinancialGoalFooter.style';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { isCompactNumber } from '../../../utilities/LifeEventsUtils';
import { IFinancialGoal } from '../../interfaces/FinancialGoal.interface';
import FinancialGoalStatus from './FinancialGoalStatus/FinancialGoalStatus';
import NumericValue from '@fsi/core-components/dist/components/atoms/NumericValue/NumericValue';
import { useCurrencies } from '@fsi/core-components/dist/context/hooks/useCurrencies';

export interface IFinancialGoalFooterProps {
    financialGoal: IFinancialGoal;
}

const rootTokens = { childrenGap: 4 };

const FinancialGoalFooter: FC<IFinancialGoalFooterProps> = ({ financialGoal }) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    const { baseCurrencyCode } = useCurrencies();
    return (
        <Stack styles={footerWrapper} tokens={rootTokens}>
            <Stack horizontal styles={typeWrapperStylesFinancialGoal}>
                <Text styles={FinancialGoalBoxStyle}> {translate('GOAL')} </Text>
                <Text title={financialGoal.targetName} styles={typeStringItemStyles}>
                    {financialGoal.targetName}
                </Text>
            </Stack>
            <Stack horizontal styles={typeWrapperStylesFinancialGoal}>
                <Stack.Item styles={valueLabelStylesFinancialGoal}>
                    <NumericValue
                        styles={typeStringItemStyles}
                        value={financialGoal.targetValue}
                        compact={isCompactNumber(financialGoal.targetValue)}
                    />
                    <Text styles={typeStringItemStyles}>{baseCurrencyCode}</Text>
                </Stack.Item>
                <FinancialGoalStatus financialGoal={financialGoal} />
            </Stack>
        </Stack>
    );
};

export default FinancialGoalFooter;
