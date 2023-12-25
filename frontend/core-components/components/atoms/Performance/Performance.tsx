import React, { FC, useMemo } from 'react';
import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import isNil from 'lodash/isNil';
import { Text } from '@fluentui/react/lib/Text';
import type { IPerformanceProps } from './Performance.interface';
import { mergeStyleSets } from '@fluentui/merge-styles/lib/mergeStyleSets';
import { PerformanceDownStyles, PerformanceFlatStyles, PerformanceUpStyles } from './Performance.style';
import NumericValue from '../NumericValue/NumericValue';

export const Performance: FC<IPerformanceProps> = props => {
    const { percentage, styles } = props;
    const { icon, performanceStyles, testId } = useMemo(() => {
        if (percentage === 0 || isNil(percentage)) {
            return { performanceStyles: mergeStyleSets(styles, PerformanceFlatStyles), testId: 'flat' };
        }
        if (percentage > 0) {
            return { performanceStyles: mergeStyleSets(styles, PerformanceUpStyles), icon: 'Market', testId: 'up' };
        }

        return { performanceStyles: mergeStyleSets(styles, PerformanceDownStyles), icon: 'MarketDown', testId: 'down' };
    }, [percentage]);

    return (
        <Text styles={performanceStyles} data-testid={`performance-market-${testId}`}>
            {icon && <FontIcon iconName={icon} />}{' '}
            {isNil(percentage) ? 'N/A' : <NumericValue styles={performanceStyles} isPercentage signed value={percentage} fricationDigits={2} />}
        </Text>
    );
};

export default Performance;
