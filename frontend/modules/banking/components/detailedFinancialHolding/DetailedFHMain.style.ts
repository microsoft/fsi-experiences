import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { createClassSelectorRange } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';

export const DETAILED_FH_RESPONSIVE_CLASS = 'detailed-fh-responsive';

export const largeDetailedFHSelector = createClassSelectorRange(10, 10, DETAILED_FH_RESPONSIVE_CLASS);
export const mediumDetailedFHSelector = createClassSelectorRange(9, 9, DETAILED_FH_RESPONSIVE_CLASS);
export const smallDetailedFHSelector = createClassSelectorRange(3, 8, DETAILED_FH_RESPONSIVE_CLASS);
export const maxSixColumnsDetailedFHSelector = createClassSelectorRange(0, 6, DETAILED_FH_RESPONSIVE_CLASS);
export const maxFourColumnsDetailedFHSelector = createClassSelectorRange(0, 4, DETAILED_FH_RESPONSIVE_CLASS);
export const maxTwoColumnsDetailedFHSelector = createClassSelectorRange(0, 2, DETAILED_FH_RESPONSIVE_CLASS);

export const stackStyles = {
    root: {
        background: COLORS.loanTrackerBackground,
        height: '100%',
    },
};

export const itemAlignmentsStackTokens = {
    childrenGap: 5,
    padding: 16,
};

export const stackItemStyles = {
    root: {
        background: DefaultPalette.white,
    },
};
