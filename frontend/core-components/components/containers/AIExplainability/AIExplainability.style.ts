import { FontSizes } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants/Colors';

export const aiExplainabilityLinkStyles = {
    root: {
        textAlign: 'start',
        padding: 20,
        fontSize: FontSizes.size12,
    },
};

export const aiLearnMoreLinkStyles = {
    root: {
        selectors: {
            ':focus': {
                textDecoration: 'underline',
                paddingBlock: '3px',
                paddingInline: '0px',
            },
        },
    },
};

export const aiExplainabilityTextStyles = {
    root: {
        fontSize: FontSizes.size12,
        color: COLORS.darkGray,
    },
};

export const aiExplainabilityDividerStyles = {
    root: {
        margin: '0 16px',
    },
};
