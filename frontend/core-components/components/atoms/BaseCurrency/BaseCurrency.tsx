import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC, useMemo } from 'react';
import { useCurrencies } from '../../../context/hooks/useCurrencies';
import type { IBaseCurrencyProps } from './BaseCurrency.interface';
import Indicator from '../Indicator/Indicator';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { getBaseCurrencyTextStyles } from './BaseCurrency.style';
import { COLORS } from '../../../constants/Colors';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { formatNumber } from '../../../utilities/NumberUtils';
import { useLocale } from '../../../context/hooks/useLocale';
import { useTranslation } from '../../../context/hooks/useTranslation';

export const BASE_CURRENCY_TEXTS = {
    EXCHANGE_TOOLTIP: '1 {{code}} = {{rate}} {{baseCode}}',
};
const baseCurrencyStackTokens = { childrenGap: 4 };

const BaseCurrency: FC<IBaseCurrencyProps> = props => {
    const { exchange, color = COLORS.darkGray, styles, ariaLabelPrefix, hideCurrencyInfoIcon } = props;
    const translate = useTranslation();

    const { currencies, baseCurrencyCode } = useCurrencies();
    const locale = useLocale();

    const displayText = exchange ? translate('AMOUNT_IN', { code: baseCurrencyCode }) : baseCurrencyCode;
    const baseCurrencyTooltipProps = useMemo(() => {
        let tooltipContent = translate('CURRENCY_DEFAULT_TOOLTIP');

        if (exchange && exchange.rate && currencies[exchange.fromCurrency]?.code) {
            tooltipContent = BASE_CURRENCY_TEXTS.EXCHANGE_TOOLTIP.replace('{{baseCode}}', baseCurrencyCode)
                .replace('{{rate}}', formatNumber(exchange.rate, locale, false, { maximumFractionDigits: 2 }))
                .replace('{{code}}', currencies[exchange.fromCurrency]?.code);
        }
        return {
            content: tooltipContent,
            directionalHint: DirectionalHint.topCenter,
        };
    }, [exchange, currencies, locale, baseCurrencyCode, translate]);

    const baseCurrencyTextStyles = useMemo(() => mergeStyleSets(getBaseCurrencyTextStyles(color), styles), [styles, color]);

    return (
        <Stack styles={baseCurrencyTextStyles} tokens={baseCurrencyStackTokens} horizontal verticalAlign="center" data-testid="base-currency">
            {!exchange && '('}
            <Text styles={baseCurrencyTextStyles}>{displayText}</Text>
            {!exchange && ')'}
            {!hideCurrencyInfoIcon && (
                <Indicator
                    tooltipProps={baseCurrencyTooltipProps}
                    size={12}
                    iconName="info"
                    color={color}
                    iconAriaLabel={
                        ariaLabelPrefix ? `${ariaLabelPrefix} - ${translate('ARIA_LABEL_EXCHANGE_RATE')}` : translate('ARIA_LABEL_EXCHANGE_RATE')
                    }
                />
            )}
        </Stack>
    );
};

export default BaseCurrency;
