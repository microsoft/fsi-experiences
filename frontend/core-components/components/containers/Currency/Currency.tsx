import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import NumericValue from '../../atoms/NumericValue/NumericValue';
import type { ICurrencyProps } from './Currency.interface';
import CurrencyCode from '../../atoms/CurrencyCode/CurrencyCode';

const currencyStackTokens = { childrenGap: 4 };

const Currency: FC<ICurrencyProps> = props => {
    const {
        currencyId,
        styles,
        numberStyles,
        currencyStyles,
        signed,
        value,
        currencyDisplayName,
        fricationDigits,
        compact,
        horizontalAlign = 'start',
        tokens = currencyStackTokens,
    } = props;

    const isCompact = compact && value > 999999;
    return (
        <Stack
            data-testid="currency-wrapper"
            wrap
            horizontal
            verticalAlign="baseline"
            horizontalAlign={horizontalAlign}
            styles={styles}
            tokens={tokens}
        >
            <NumericValue styles={numberStyles} value={value} compact={isCompact} fricationDigits={fricationDigits} signed={signed} />
            <CurrencyCode currencyId={currencyId} styles={currencyStyles} currencyDisplayName={currencyDisplayName} />
        </Stack>
    );
};

export default Currency;
