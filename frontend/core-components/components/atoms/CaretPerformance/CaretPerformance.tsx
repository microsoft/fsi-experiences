import React, { FC } from 'react';
import { COLORS } from '../../../constants/Colors';
import isNil from 'lodash/isNil';
import NumericValue from '../NumericValue/NumericValue';
import { Icon } from '@fluentui/react/lib/Icon';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { Text } from '@fluentui/react/lib/components/Text';
import { getIconStyles, timeFrameStyles, textStyles } from './CaretPerformance.style';
import { useTranslation } from '../../../context/hooks/useTranslation';

export interface ICaretPerformanceProps {
    value?: number;
    timeFrame?: string;
}

const icons = { up: { icon: 'CaretSolidUp', color: COLORS.successIcon }, down: { icon: 'CaretSolidDown', color: COLORS.red } };

const CaretPerformance: FC<ICaretPerformanceProps> = props => {
    const translate = useTranslation();
    const { value, timeFrame } = props;
    const { color, icon } = value && value > 0 ? icons.up : icons.down;

    return (
        <Stack verticalAlign="end" horizontal tokens={{ childrenGap: 4 }} data-testid={`caret-performance-${icon}`}>
            <Stack verticalAlign="center" horizontal tokens={{ childrenGap: 4 }}>
                {isNil(value) ? translate('N_A') : <NumericValue styles={textStyles} isPercentage signed value={value} fricationDigits={2} />}
                {value && <Icon styles={getIconStyles({ color })} iconName={icon} />}
            </Stack>
            {timeFrame && (
                <Text data-testid="performance-time-frame" styles={timeFrameStyles}>
                    ({timeFrame})
                </Text>
            )}
        </Stack>
    );
};

export default CaretPerformance;
