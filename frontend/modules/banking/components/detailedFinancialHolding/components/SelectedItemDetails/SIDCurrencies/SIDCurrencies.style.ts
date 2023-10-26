import { ITextStyles } from '@fluentui/react/lib/components/Text';
import { FontSizes, FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants';

export const outerStackTokens = {
    childrenGap: '32px',
};
export const defaultBalanceSeparator = { root: { margin: '0 12px', height: '56px', alignSelf: 'center' } };

export const amountAndCurrencyLabelStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
        color: NeutralColors.gray130,
        lineHeight: '20px',
    },
};

export const currencyNameStyle = {
    root: {
        fontSize: FontSizes.size28,
        fontWeight: FontWeights.semibold,
        color: COLORS.darkGray160,
    },
};

export const currencyStyle: ITextStyles = {
    root: { fontSize: FontSizes.size20, fontWeight: FontWeights.regular, color: COLORS.darkGray160 },
};

export const currencyStackTokens = { childrenGap: 8 };
