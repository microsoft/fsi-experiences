import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { COLORS } from '../../../../constants';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';

export const undefinedDescriptionTextStyles = {
    root: { fontSize: FontSizes.size12, fontWeight: FontWeights.regular, color: NeutralColors.gray130 },
};

export const predictionExplainCalloutStyles = {
    root: {
        width: 420,
        '@media (max-width:420px)': {
            width: '100%',
        },
    },
};

export const predictionRiskColor = {
    104800000: COLORS.artifactGreen,
    104800001: COLORS.artifactYellow,
    104800002: COLORS.artifactRed,
};

export const predictionTextStylesWithColor = (color?: string) => {
    return {
        root: {
            background: color,
            borderRadius: '2px',
            backgroundClip: 'content-box',
        },
    };
};

export const predictionExplainInfoTooltipStyles: IStackStyles = {
    root: {
        p: {
            marginBlockStart: '1em',
            marginBlockEnd: '1em',
            fontSize: FontSizes.size12,
        },
    },
};

export const contactInsightsPredictionTokens = { childrenGap: '4px' };

export const predictionUndefinedCalloutStyles = {
    root: {
        maxWidth: 350,
        padding: '10px',
    },
};

export const undefinedTextStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        margin: '4px 0px 0px 8px',
    },
};
