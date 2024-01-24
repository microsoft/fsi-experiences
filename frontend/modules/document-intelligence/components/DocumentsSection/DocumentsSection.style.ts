import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';

export const documentsCollapseStyles: IStackStyles = {
    root: {
        fontWeight: 600,
        fontSize: FontSizes.size14,
        lineHeight: '20px',
        marginBlockEnd: 40,
    },
};

export const iconButtonStyles: IButtonStyles = {
    root: {
        fontSize: FontSizes.size16,
        lineHeight: 16,
        marginInlineEnd: '18px',
    },
    rootDisabled: {
        background: 'transparent',
        i: {
            color: COLORS.iconGrey,
        },
    },
};

export const sectionTitleStyle = {
    root: {
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
    },
};

export const lockedSectionTitleStyle = {
    root: {
        color: COLORS.darkGray,
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
    },
};
