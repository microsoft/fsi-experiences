import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { mergeStyleSets } from '@fluentui/merge-styles/lib/mergeStyleSets';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const withIconClassNames = mergeStyleSets({
    GreyIconClickable: {
        verticalAlign: 'text-top',
        maxHeight: '10px',
        maxWidth: '20px',
        color: COLORS.primaryTagText,
        fontSize: FontSizes.size12,
    },
    GreyIconUnclickable: {
        verticalAlign: 'text-top',
        maxHeight: '10px',
        maxWidth: '20px',
        color: COLORS.iconGrey,
        fontSize: FontSizes.size12,
    },
});

export const HORIZONTAL_PADDING = 24;
export const PADDING_BETWEEN_CARDS = 15;
export const CARD_WIDTH = 190;
export const DEFAULT_WIDTH = 658;
export const CARD_MARGINS = HORIZONTAL_PADDING - PADDING_BETWEEN_CARDS / 2;

export const buttonStyle = {
    root: {
        backgroundColor: COLORS.white,
    },
};
export const headerStyle = {
    padding: '12px 0px 0px 16px',
    textAlign: 'left',
    fontSize: FontSizes.size14,
    fontWeight: FontWeights.semibold,
};
export const buttonRightItemStyle = {
    root: {
        padding: '0px 20px 0px 10px',
    },
};
export const buttonLeftItemStyle = {
    root: {
        padding: '0px 10px 0px 15px',
    },
};
