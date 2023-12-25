import { FontSizes, FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';

export const iAndEStackRootStyles = {
    root: {
        padding: '16px',
        fontSize: FontSizes.size14,
    },
};

export const iAndECurrencyBaseStyles = {
    root: {
        // overrides default FluentUI styles
        marginInlineStart: 'auto !important',
        paddingInlineStart: '5px',
    },
};

export const iAndECurrencyNumberStyles = {
    root: {
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size24,
        color: NeutralColors.gray160,
    },
};

export const iAndEButtonIconStyles = {
    root: { marginInlineStart: '4px' },
};

export const emptyStateStyles = { container: { height: 'auto' } };
