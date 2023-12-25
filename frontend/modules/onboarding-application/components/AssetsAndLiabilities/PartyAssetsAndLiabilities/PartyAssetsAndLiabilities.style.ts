import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Theme';

export const rootStyles = {
    root: {
        gap: '10px',
        padding: '16px',
        fontSize: FontSizes.size14,
        '@media screen and (min-width: 340px)': {
            gap: '15px',
        },
    },
};

export const textStyles = { root: { textAlign: 'start', fontSize: FontSizes.size14 } };

export const getPartyTextStyles = mergeStyleSets(textStyles, {
    root: { fontWeight: FontWeights.semibold },
});

export const textsWrapperStyles = {
    root: {
        minWidth: 0,
        whiteSpace: 'nowrap',
    },
};

export const partyALButtonIconStyles = { root: { marginInlineStart: '4px' } };

export const partyALEmptyStateStyles = { container: { height: 'auto' } };

export const tooltipHostStyles: any = {
    root: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
};

// visually hidden, but visible for screen readers
export const srCurrencyStyle: any = {
    root: {
        position: 'fixed',
        overflow: 'hidden',
        clip: 'rect(1px, 1px, 1px, 1px)',
        width: '1px',
        height: '1px',
        whiteSpace: 'nowrap',
    },
};
