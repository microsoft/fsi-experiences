import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { NeutralColors } from '@fluentui/theme/lib/colors';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyleSets, mergeStyles } from '@fluentui/react/lib/Styling';

export const cardsGrey12Text = {
    root: {
        textAlign: 'left',
        fontSize: FontSizes.size12,
        fontWeight: FontWeights.regular,
        lineHeight: 16,
        color: COLORS.white,
        whiteSpace: 'initial',
        '.banking-card-inactive &': {
            color: COLORS.darkGray140,
        },
    },
};

export const card10Text: IStackStyles = {
    root: {
        color: COLORS.white,
        fontSize: FontSizes.size10,
        fontWeight: FontWeights.regular,
        '.banking-card-inactive &': {
            color: COLORS.darkGray140,
        },
    },
};

export const cards10RightText: IStackStyles = mergeStyleSets(card10Text, {
    root: {
        textAlign: 'right',
        verticalAlign: 'center',
        padding: '4px 0px',
        overflow: 'hidden',
    },
});

export const cards10LeftText = {
    root: {
        color: COLORS.white,
        textTransform: 'uppercase',
        fontSize: FontSizes.size10,
        fontWeight: FontWeights.semibold,
        textAlign: 'left',

        '.banking-card-inactive &': {
            color: COLORS.darkRed,
        },
    },
};

export const getRedDotClass = () =>
    mergeStyles({
        height: '11px',
        width: '11px',
        background: COLORS.red,
        border: `2px solid ${NeutralColors.gray10}`,
        borderRadius: '50%',
        boxSizing: 'border-box',
        margin: '2px 0px 0px 0px',
    });

export const cardFooterHorizontalTokens = { childrenGap: 4 };
