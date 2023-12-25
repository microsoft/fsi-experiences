import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const groupDetailsBarStyles = { root: { paddingInline: '16px' } };
export const groupDetailsBarIconStyles = { fontSize: '20px', color: COLORS.white };
export const groupDetailsBarBoldTextStyles = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size14 } };
export const groupDetailsBarIconContainerStyles = (background: string): IStackStyles => ({
    root: { background, borderRadius: '4px', width: '40px', height: '40px', flexShrink: '0 !important' },
});
export const groupDetailsBarTextStyles = {
    root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size16, maxWidth: '100%', whiteSpace: 'break-spaces' },
};
export const groupDetailsBarWrapper: IStackStyles = { root: { paddingInlineStart: '12px', minWidth: 0 } };
