import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC, useMemo } from 'react';
import type { ILegendItemProps } from './LegendItem.interface';
import { getLegendItemClassNames, legendCategoryWrapperStyle } from './LegendItem.style';
import { Text } from '@fluentui/react/lib/Text';

const legendStackTokens = { childrenGap: '4px' };

export const LegendItem: FC<ILegendItemProps> = props => {
    const { label, styles, color } = props;

    const stylesSet = useMemo(() => getLegendItemClassNames(color, styles), [color, styles]);

    return (
        <Stack
            data-testid="legend-category-item"
            key={label}
            horizontal
            verticalAlign="center"
            tokens={legendStackTokens}
            styles={legendCategoryWrapperStyle}
        >
            <div data-testid={`legend-category-color-${label}`} className={stylesSet.marker}></div>
            <Text aria-hidden className={stylesSet.label}>
                {label}
            </Text>
        </Stack>
    );
};

export default LegendItem;
