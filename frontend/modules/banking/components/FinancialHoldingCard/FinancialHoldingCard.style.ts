import { IStackStyles } from '@fluentui/react';
import { ITextStyles } from '@fluentui/react/lib/components/Text';
import { NeutralColors, FontSizes, FontWeights } from '@fluentui/react/lib/Theme';

export const nameStyles: ITextStyles = {
    root: { fontSize: FontSizes.size14, color: NeutralColors.gray160 },
};

export const typeStyles: ITextStyles = {
    root: { fontSize: FontSizes.size12, color: NeutralColors.gray130 },
};

export const lastUpdatedStyles: ITextStyles = { root: { fontSize: FontSizes.size10, color: NeutralColors.gray130 } };

export const rootStyles: IStackStyles = {
    root: {
        flex: 1,
        justifyContent: 'space-between',
    },
};

export const valueStyles = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size24 } };

export const currencyStyles = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size20 } };
