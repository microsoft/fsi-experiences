import { DefaultPalette } from '@fluentui/theme/lib/colors/DefaultPalette';
import { COLORS } from '../../constants/Colors';

export const FSIDefaultPartialTheme = {
    palette: {
        ...DefaultPalette,
        themePrimary: COLORS.dynamicPrimary,
    },
};
