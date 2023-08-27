import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';

export const predictionDescriptionTextStyles = {
    root: { fontSize: FontSizes.size12, fontWeight: FontWeights.regular, color: NeutralColors.gray130, padding: '0 4px' },
};
export const predictionTextStyles: ITextStyles = {
    root: { fontSize: FontSizes.size16, fontWeight: FontWeights.semibold, margin: '4px 0px 4px 8px' },
};
export const explainabilityMargin = {
    root: { margin: '8px 4px 4px 0px' },
};

export const stackTokens = { childrenGap: '4px' };

export const calloutStyles = {
    root: {
        maxWidth: 350,
        padding: '0 14px',
        fontSize: FontSizes.size12,
    },
};

export const visibleTextMarginStyles = (showExplainability?: boolean) => {
    return {
        root: {
            margin: showExplainability ? '4px 0px 4px 8px' : '4px 8px',
        },
    };
};

export const visibleTextStyles = {
    root: {
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
    },
};

export const boxStylesWithColor = (color?: string) => {
    return {
        root: {
            background: color,
            borderRadius: '2px',
            backgroundClip: 'content-box',
        },
    };
};
