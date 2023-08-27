import { ThemeGenerator } from '@fluentui/react/lib/components/ThemeGenerator/ThemeGenerator';
import { themeRulesStandardCreator } from '@fluentui/react/lib/components/ThemeGenerator/ThemeRulesStandard';
import { getColorFromString } from '@fluentui/react/lib/utilities/color/getColorFromString';
import { FSIThemeColors } from '../FSIContext';

export const generateThemePalette = (fsiColors: FSIThemeColors) => {
    const themeRules = themeRulesStandardCreator();

    const primaryColor = getColorFromString(fsiColors.primaryColor);
    if (!primaryColor) {
        return undefined;
    }
    ThemeGenerator.insureSlots(themeRules, false);

    ThemeGenerator.setSlot(themeRules.primaryColor, primaryColor, false, true, true);

    return ThemeGenerator.getThemeAsJson(themeRules);
};
