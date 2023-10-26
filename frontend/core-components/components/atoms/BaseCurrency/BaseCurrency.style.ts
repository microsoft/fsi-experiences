import { FontWeights } from '@fluentui/react/lib/Styling';

export const getBaseCurrencyTextStyles = (color: string) => {
    return {
        root: {
            color,
            fontWeight: FontWeights.semibold,
            lineHeight: 20,
        },
    };
};
