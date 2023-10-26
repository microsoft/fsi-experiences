import React, { FC } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { useLocale } from '../../../context/hooks/useLocale';
import { formatNumber } from '../../../utilities/NumberUtils';
import type { INumericValueProps } from './NumericValue.interface';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { numericValueStyles } from './NumericValue.style';

const getSign = (value: number): string => {
    return value > 0 ? '+' : '';
};

const NumericValue: FC<INumericValueProps> = props => {
    const { value, compact, fricationDigits = compact ? 2 : 0, styles, signed, isPercentage } = props;

    const locale = useLocale();

    const styleSet = mergeStyleSets(numericValueStyles, styles);
    return (
        <Text styles={styleSet} className="numeric-value">
            {signed && getSign(value)}
            {formatNumber(value, locale, compact, {
                minimumFractionDigits: fricationDigits,
                maximumFractionDigits: fricationDigits,
            })}
            {isPercentage ? '%' : ''}
        </Text>
    );
};

export default NumericValue;
