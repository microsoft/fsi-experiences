import React from 'react';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const stackTokens = {
    childrenGap: 10,
    padding: 10,
};

export const stackItemStyles = {
    root: {
        width: '100%',
        height: '100px',
    },
};
export const textStyle: React.CSSProperties = {
    color: COLORS.primaryTagText,
    fontSize: FontSizes.size16,
    fontWeight: FontWeights.semibold as number,
};
