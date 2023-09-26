import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { CARD_WIDTH } from '../BankingCards.style';
import { IBankingCardStyleProps, IBankingCardStyles } from './BankingCard.interface';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
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
