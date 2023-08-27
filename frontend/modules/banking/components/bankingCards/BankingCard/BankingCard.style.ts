import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { NeutralColors } from '@fluentui/theme/lib/colors';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { CARD_WIDTH } from '../BankingCards.style';
import { IBankingCardStyleProps, IBankingCardStyles } from './BankingCard.interface';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';

export const cardStackTokens = {
    padding: '8px',
};

export const cardsHeader = {
    root: {
        color: COLORS.white,
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
        textTransform: 'capitalize',
        lineHeight: 22,
        '.banking-card-inactive &': {
            color: COLORS.primaryTagText,
        },
    },
};

export const cardIndicatorButtonStyles: IButtonStyles = {
    rootHovered: {
        background: '#0000004d',
    },
    rootPressed: {
        background: '#0000004d',
    },
};

export const cards14Text = {
    root: {
        color: COLORS.white,
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
        lineHeight: 20,
        whiteSpace: 'nowrap',
        '.banking-card-inactive &': {
            color: COLORS.darkGray140,
        },
    },
};

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

export const redDot = {
    height: '11px',
    width: '11px',
    background: COLORS.red,
    border: `2px solid ${NeutralColors.gray10}`,
    borderRadius: '50%',
    boxSizing: 'border-box',
    margin: '2px 0px 0px 0px',
};

export const bankingCardStyles = (props: IBankingCardStyleProps) => {
    const {
        active,
        isCredit,
        theme: { palette },
    } = props;
    const activeColor = isCredit ? palette.themePrimary : palette.themeDarker;
    return {
        root: {
            width: `${CARD_WIDTH}px`,
            textAlign: 'left',
            height: '100%',
            minHeight: '120px',
            borderRadius: '8px',
            background: active ? activeColor : COLORS.nonActiveCardFrame,
        },
    };
};

export const getBankingCardClassNames = classNamesFunction<IBankingCardStyleProps, IBankingCardStyles>();
