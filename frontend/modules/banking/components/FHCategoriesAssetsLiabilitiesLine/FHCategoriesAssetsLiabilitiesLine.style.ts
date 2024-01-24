import { FontSizes } from '@fluentui/style-utilities';
import { CSSProperties } from 'react';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const LinePieces = {
    childrenGap: 2,
    padding: '8px 0px 5px 0px',
};

export const boxContainerStyle = {
    root: {
        padding: '2px 0px',
        border: '1px solid #FFFFFF',
    },
};

export const textContainerStyle = {
    root: {
        fontSize: FontSizes.size12,
        color: COLORS.black,
    },
};

export const assetsLiabilitiesBaseCurrencyStyle = {
    root: {
        fontSize: FontSizes.size12,
        lineHeight: '16px',
    },
};

export const LegendboxStyle = (background: string): CSSProperties => ({
    width: '10px',
    height: '10px',
    background,
});

export const tagStackTokens = {
    padding: 0,
    childrenGap: '0px 5px',
};

export const tagsStackTokens = {
    padding: 0,
    childrenGap: '0px 8px',
};
