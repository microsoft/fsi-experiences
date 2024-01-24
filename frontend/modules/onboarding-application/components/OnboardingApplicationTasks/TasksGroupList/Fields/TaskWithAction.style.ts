import { FontSizes, FontWeights } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const iconTaskWithNavigationClass = 'icon-task-navigation';

export const taskWithActionStyles = (themePrimary: string) => {
    return {
        root: {
            display: 'flex',
            alignItems: 'baseline',
            minWidth: 0,
            color: `${themePrimary}`,
            ':focus': {
                outline: 'none !important',
                boxShadow: 'none !important',
            },
            ':focus-within': {
                outline: `1px solid ${COLORS.black}`,
                outlineOffset: '1px',
            },
            ':focus-within > *': {
                outline: 'none !important',
            },
            ':hover, :active, &:active:hover': {
                textDecoration: 'none',
                color: `${themePrimary}`,
            },
            [`&:hover > *, &:active > *`]: {
                textDecoration: 'underline',
            },
            [`& .${iconTaskWithNavigationClass}`]: {
                alignSelf: 'center',
                fontSize: FontSizes.size16,
                textDecoration: 'none !important',
                color: 'inherit',
            },
        },
    };
};

export const taskWithActionWrapperStyles: any = {
    display: 'flex',
    fontSize: FontSizes.size14,
    fontWeight: FontWeights.regular,
};

export const overflowTextStyles = {
    root: {
        paddingInlineEnd: '8px',
    },
};
