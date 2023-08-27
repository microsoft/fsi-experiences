import { ILabelStyles } from '@fluentui/react/lib/components/Label/Label.types';
import { IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

export const mainAIScoreStackTokens: IStackTokens = { padding: 16 };
export const scoreValueTokens: IStackTokens = { childrenGap: 16 };
export const scoreRangeStackTokens: IStackTokens = { childrenGap: 8 };
export const scoreValueLabelStyles: ILabelStyles = { root: { fontSize: FontSizes.size68, lineHeight: 76 } };
export const ofTotalLabelStyles: ILabelStyles = { root: { fontSize: FontSizes.size14, lineHeight: 20 } };

export const scoreRangeLabelStyles = {
    root: { fontSize: FontSizes.size18, lineHeight: 24, fontWeight: FontWeights.semibold },
};
