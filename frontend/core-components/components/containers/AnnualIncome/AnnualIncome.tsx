import React, { FC } from 'react';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Separator } from '@fluentui/react/lib/Separator';
import { EmptyState } from '../../atoms/EmptyState/EmptyState';
import { IMAGE_SRC } from '../../../constants/ImageSrc';
import {
    fullViewStackStyle,
    fullViewFirstItemStyles,
    fullViewSeparatorStyle,
    annualIncomeTextStyles,
    annualIncomeCurrencyTextStyles,
} from './AnnualIncome.style';
import Currency from '../../containers/Currency/Currency';
import { useTranslation } from '../../../context/hooks/useTranslation';

interface IAnnualIncome {
    annualIncome: number;
    isCompact?: boolean;
}

const AnnualIncome: FC<IAnnualIncome> = ({ annualIncome, isCompact }) => {
    const translate = useTranslation('mainHousehold');
    const rootStyles = isCompact ? { root: { flex: 1 } } : fullViewStackStyle;

    return (
        <Stack tokens={{ childrenGap: '16px' }} styles={rootStyles} horizontalAlign="center">
            <Stack.Item role="heading" aria-level={3} align="start" styles={isCompact ? {} : fullViewFirstItemStyles}>
                <Text styles={{ root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size14 } }}>{translate('ANNUAL_INCOME')}</Text>
            </Stack.Item>
            {!isCompact && <Separator styles={fullViewSeparatorStyle} data-testid="group-financial-data-view-separator" />}
            {annualIncome !== 0 ? (
                <Stack
                    grow
                    styles={{ root: { margin: '0 !important' } }}
                    verticalAlign="center"
                    horizontalAlign="center"
                    className="annual-income-text"
                >
                    <Currency compact value={annualIncome} numberStyles={annualIncomeTextStyles} currencyStyles={annualIncomeCurrencyTextStyles} />
                </Stack>
            ) : (
                <EmptyState title={translate('NOT_AVAILABLE')} icon={IMAGE_SRC.emptyState48} iconSize={48} />
            )}
        </Stack>
    );
};

export default AnnualIncome;
