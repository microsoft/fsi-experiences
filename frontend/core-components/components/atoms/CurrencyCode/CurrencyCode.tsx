import React, { FC, useMemo } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import type { ICurrencyCodeProps } from './CurrencyCode.interface';
import { useCurrencies } from '../../../context/hooks/useCurrencies';
import { currencyCodeStyles } from './CurrencyCode.style';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const CurrencyCode: FC<ICurrencyCodeProps> = props => {
    const { currencyId, currencyDisplayName, styles } = props;

    const { currencies, baseCurrencyCode } = useCurrencies();

    const displayText = currencyId ? currencies[currencyId]?.code || currencyDisplayName : baseCurrencyCode;

    const styleSet = useMemo(() => mergeStyleSets(currencyCodeStyles, styles), [styles]);

    return (
        <Text styles={styleSet} data-testid="currency-code" className="currency-code">
            {displayText}
        </Text>
    );
};

export default CurrencyCode;
