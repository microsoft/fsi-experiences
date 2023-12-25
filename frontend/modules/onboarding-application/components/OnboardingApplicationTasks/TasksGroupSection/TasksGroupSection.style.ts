import { IIconStyles } from '@fluentui/react';
import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const sectionStyles = {
    root: {
        gap: 5,
    },
};

export const iconButtonStyle: IButtonStyles = {
    root: {
        color: COLORS.darkGray,
        background: 'transparent',
        marginRight: 15,
    },
    rootHovered: {
        background: 'transparent',
    },
};

export const completedTasksIconStyle: IIconStyles = {
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 16,
        width: 16,
        color: COLORS.successIcon,
        fontSize: FontSizes.size12,
        fontWeight: FontWeights.bold,
        ':hover': {
            cursor: 'default',
        },
    },
};

export const sectionTitleStye = {
    root: {
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
    },
};

export const sectionSubTitleStye = {
    root: {
        fontSize: FontSizes.size12,
        color: COLORS.lightGray130,
    },
};

export const headerRowStyles = {
    root: {
        backgroundColor: COLORS.loanTrackerBackground,
        padding: 0,
        gap: 12,
    },
};

export const completedTasksStatusStyles = {
    root: {
        flexFlow: 'row nowrap',
        gap: 10,
    },
};

export const titleStyles = { root: { gap: 5, marginInlineStart: 20 } };
