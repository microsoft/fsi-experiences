import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const valueTextStyles: ITextStyles = {
    root: {
        fontSize: FontSizes.size24,
        color: NeutralColors.gray160,
        fontWeight: FontWeights.semibold,
        padding: '0px',
    },
};

export const valueErrorTextStyles: ITextStyles = {
    root: {
        fontSize: FontSizes.size14,
        color: NeutralColors.gray160,
        fontWeight: FontWeights.semibold,
        textAlign: 'center',
        paddingTop: '10px',
    },
};
export const labelTextStyles: ITextStyles = { root: { fontSize: FontSizes.size12, color: NeutralColors.gray140 } };

export const labelErrorTextStyles: ITextStyles = {
    root: { fontSize: FontSizes.size12, color: NeutralColors.gray140, textAlign: 'center' },
};

export const StalenessTextStyles: ITextStyles = { root: { fontSize: FontSizes.size10, color: NeutralColors.gray130 } };

export const contentStyle: IStackStyles = {
    root: {
        gap: 2,
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export const rootContentStyles: IStackStyles = {
    root: {
        gap: 4,
        display: 'flex',
        flexDirection: 'column',
    },
};

export const currencyTextStyle = {
    root: {
        fontSize: FontSizes.size14,
        color: NeutralColors.gray160,
        fontWeight: FontWeights.semibold,
        alignItems: 'center',
        padding: '0px',
    },
};
