import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import VerticalGraphLine from '@fsi/core-components/dist/components/atoms/VerticalGraphLine/VerticalGraphLine';
import { COLORS, SystemColors } from '@fsi/core-components/dist/constants';
import { LegendItem } from '@fsi/core-components/dist/components/atoms/LegendItem/LegendItem';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { graphPartsStackTokens, graphStackStyles, legendsItemsStackStyles, legendsItemsStackTokens } from './LoanProgressOverviewBar.style';
import { useColorContrastListener } from '@fsi/core-components/dist/hooks/useColorContrastListener/useColorContrastListener';

export interface ILoanProgressOverviewBarProps {
    inProgressValue: number;
    completedValue: number;
}

export const LoanProgressOverviewBar: FC<ILoanProgressOverviewBarProps> = ({ inProgressValue, completedValue }) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);

    const isColorContrastOn = useColorContrastListener();

    /* istanbul ignore next */
    const completedColor = isColorContrastOn ? SystemColors.activeText : COLORS.successIcon;
    /* istanbul ignore next */
    const inProgressColor = isColorContrastOn ? SystemColors.text : COLORS.lightGray40;

    const legendItems = useMemo(
        () => [
            {
                value: completedValue,
                label: translate('LOAN_PROGRESS_COMPLETED_BAR_TEXT'),
                color: completedColor,
            },
            {
                value: inProgressValue,
                label: translate('LOAN_PROGRESS_IN_PROGRESS_BAR_TEXT'),
                color: inProgressColor,
            },
        ],
        [completedColor, inProgressColor, inProgressValue, completedValue]
    );

    return (
        <Stack styles={graphStackStyles} data-testid={`loan-overview-bar`}>
            <Stack.Item>
                <Stack horizontal tokens={graphPartsStackTokens} horizontalAlign="start">
                    <Stack.Item grow={completedValue}>
                        <VerticalGraphLine value={completedValue.toString()} background={completedColor} height={14} />
                    </Stack.Item>
                    <Stack.Item grow={inProgressValue}>
                        <VerticalGraphLine value={inProgressValue.toString()} background={inProgressColor} height={14} />
                    </Stack.Item>
                </Stack>
            </Stack.Item>
            <Stack.Item>
                <Stack horizontal styles={legendsItemsStackStyles} tokens={legendsItemsStackTokens} horizontalAlign="start">
                    {legendItems.map(legendItem => (
                        <LegendItem key={legendItem.label} {...legendItem} />
                    ))}
                </Stack>
            </Stack.Item>
        </Stack>
    );
};

export default LoanProgressOverviewBar;
