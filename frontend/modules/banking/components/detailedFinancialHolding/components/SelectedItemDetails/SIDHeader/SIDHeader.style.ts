import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { TagStyles } from '@fsi/core-components/dist/components/atoms/Tag/Tag';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const headerTagStackTokens = {
    padding: '4px 0px 8px 0px',
};

export const headerPaddingBasedOnIndicatorMessage = indicator => {
    return indicator ? { padding: '20px 0px' } : {};
};

export const idHeaderStyle = {
    fontSize: FontSizes.size14,
    padding: '0px 5px',
    color: COLORS.primaryTagText,
};

export const idLabelStyle = {
    padding: '0px 5px',
    fontWeight: FontWeights.semibold,
};

export const size14Style = {
    fontSize: FontSizes.size14,
};

export const headerNameStyle = {
    root: {
        fontSize: FontSizes.size28,
        lineHeight: 36,
        fontWeight: FontWeights.semibold,
        textAlign: 'start',
        color: COLORS.primaryTagText,
        whiteSpace: 'break-spaces',
    },
};

export const headerDescriptionStyle = {
    root: {
        fontSize: FontSizes.size12,
        color: COLORS.darkGray,
        lineHeight: 16,
        textAlign: 'start',
        marginBlockEnd: 8,
    },
};

export const headerTagStyle: TagStyles = {
    root: {
        color: COLORS.darkGray160,
        padding: '1px 8px 3px',
    },
    text: {
        fontSize: FontSizes.size12,
        fontWeight: FontWeights.semibold,
    },
};
export const headerContentStyle: ITextStyles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: FontSizes.size14,
        gap: 8,
        flexWrap: 'wrap',
    },
};
