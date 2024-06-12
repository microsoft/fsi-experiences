import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';

export const overdraftStackStyle = {
    root: {
        textAlign: 'left',
        width: '40%',
    },
};

export const overdraftHeaderStyle = {
    fontSize: FontSizes.size28,
    fontWeight: FontWeights.semibold,
    color: COLORS.primaryTagText,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};
