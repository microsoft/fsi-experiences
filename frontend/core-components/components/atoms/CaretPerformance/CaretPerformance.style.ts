import { IIconStyles } from '@fluentui/react/lib/components/Icon';
import { ITextStyles } from '@fluentui/react/lib/components/Text';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Theme';

export const getIconStyles = ({ color }): IIconStyles => ({
    root: { color },
});

export const textStyles: ITextStyles = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size16 } };

export const timeFrameStyles: ITextStyles = { root: { fontSize: FontSizes.size10, whiteSpace: 'nowrap' } };
