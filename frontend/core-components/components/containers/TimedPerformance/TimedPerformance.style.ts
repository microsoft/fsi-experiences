import { IDropdownStyles } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { FontSizes, FontWeights, IStyle } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants/Colors';
import { fadeInAnimation } from '../../../styles/Animations.style';

export const dropdownValueStyle = {
    root: {
        textAlign: 'left',
        color: COLORS.primaryTagText,
        textOverflow: 'ellipsis',
        border: 'none',
    },
};

export const dropdownStyles: Partial<IDropdownStyles> = {
    title: {
        fontSize: FontSizes.size12,
        fontWeight: FontWeights.regular,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: COLORS.darkGray,
        border: 'none',
        height: 16,
        lineHeight: 10,
        padding: 0,
    },
    root: {
        textAlign: 'start',
        paddingBlockStart: 4,
    },
    dropdown: {
        display: 'flex',
        minWidth: 130,
        alignItems: 'center',
        height: 16,
        '&:hover': {
            '.ms-Dropdown-title': {
                color: COLORS.darkGray,
            },
        },
        '&:active': {
            '&:after': {
                display: 'none',
            },
            '.ms-Dropdown-title': {
                color: COLORS.darkGray,
            },
        },
    },
    caretDownWrapper: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        paddingInlineStart: 8,
    },
    caretDown: {
        color: `${COLORS.dynamicPrimary} !important`,
    },
};

export const selectedPerformanceStyle = {
    root: {
        animationName: fadeInAnimation,
        animationDuration: '0.4s',
    },
};
