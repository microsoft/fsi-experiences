import { NeutralColors, FontSizes, FontWeights } from '@fluentui/react/lib/Theme';

export const textFieldReadModeStyles = {
    fieldGroup: {
        background: 'none',
        border: 'none',
        height: 'auto',
        selectors: {
            '::after': {
                content: 'none',
                border: 'none',
            },
            '::before': {
                content: 'none',
            },
        },
    },
    field: {
        paddingInline: '0px',
        paddingBlock: '0px 13px',
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size12,
        lineHeight: FontSizes.size16,
        color: NeutralColors.gray160,
    },
};

export const textFieldEditModeStyles = {
    fieldGroup: {
        borderRadius: '4px',
        border: '1px solid #D1D1D1',
    },
};

export const labelStyles = {
    root: {
        fontSize: FontSizes.size12,
        lineHeight: FontSizes.size16,
        color: NeutralColors.gray130,
        display: 'flex',
        fontWeight: FontWeights.regular,
        gap: '4px',
        selectors: {
            '::after': {
                paddingInlineEnd: '0',
            },
        },
    },
};

export const tagStyles = {
    root: {
        padding: '3px 8px',
        borderRadius: '2px',
        color: NeutralColors.gray160,
        background: NeutralColors.gray20,
        lineHeight: FontSizes.size16,
    },
    text: {
        fontWeight: FontWeights.regular,
    },
};

export const labelTokens = {
    childrenGap: 4,
};

export const labelEditIconStyles = { root: { height: '16px', width: '16px', padding: '0' } };

export const selfEditIconStyles = { root: { fontSize: FontSizes.size10 } };
