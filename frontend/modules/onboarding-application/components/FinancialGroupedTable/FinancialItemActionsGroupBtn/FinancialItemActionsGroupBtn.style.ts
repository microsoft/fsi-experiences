import { FontSizes, NeutralColors } from '@fluentui/react/lib/Theme';

const focusHoverButtonBackground = NeutralColors.gray20;

export const financialItemActionsGroupBtn_IconButtonStyles = {
    root: {
        selectors: {
            ':first-child': {
                marginInlineEnd: '10px',
            },
            ':hover': {
                backgroundColor: focusHoverButtonBackground,
            },
            ':focus': {
                backgroundColor: focusHoverButtonBackground,
            },
        },
    },
};

export const financialItemActionsGroupBtnWrapperStyles = {
    root: {
        flexGrow: '1',
        justifyContent: 'center',
    },
};

export const commandButtonStyles = {
    root: {
        selectors: {
            ':hover': {
                backgroundColor: focusHoverButtonBackground,
            },
            ':focus': {
                backgroundColor: focusHoverButtonBackground,
            },
        },
    },
};

export const commandButtonMenuIconStyles = { fontSize: FontSizes.size16 };
