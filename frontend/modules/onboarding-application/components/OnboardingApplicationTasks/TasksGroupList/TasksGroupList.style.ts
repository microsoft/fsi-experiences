import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { iconTaskWithNavigationClass } from './Fields/TaskWithAction.style';

export const openedListStyle = {
    root: {
        backgroundColor: COLORS.white,
        height: '100%',
        flex: 1,
    },
};

export const detailsListStyles = {
    root: {
        boxShadow: '0 2px 5px 0px rgb(0 0 0 / 10%)',
        overflowX: 'hidden',
    },
    headerWrapper: {
        '&>.ms-DetailsHeader': {
            padding: 0,
        },
        '.ms-DetailsHeader-cell:hover': {
            background: COLORS.lightGray10,
        },
        '.ms-DetailsHeader-cell:not(:first-child)': {
            paddingInline: '16px',
        },
    },
    contentWrapper: {
        '.ms-DetailsRow-cell:last-child': {
            alignItems: 'center',
            padding: '0',
        },
        '.ms-TextField-fieldGroup': {
            height: '42px',
            paddingInlineEnd: 0,
        },
        '.ms-DetailsRow:hover': {
            background: COLORS.lightGray10,
            '.ms-DetailsRow-cell:last-child': {
                background: COLORS.lighterGray,
            },
            [`.${iconTaskWithNavigationClass}`]: {
                display: 'inline-block',
            },
            '.editable-text-field input': {
                display: 'inline-block !important',
            },
        },
        '.ms-DetailsRow-cell:not(:first-child):not(:last-child)': {
            fontSize: FontSizes.size14,
            paddingInline: '16px',
        },
        [`.${iconTaskWithNavigationClass}`]: {
            display: 'none',
        },
    },
};

export const columnHeaderTextStyles = {
    root: {
        display: 'inline-block',
        width: '100%',
        maxWidth: '100%',
        ':focus-within': {
            outline: `1px solid ${COLORS.black}`,
            outlineOffset: '-1px',
        },
        ':focus-within > *': {
            outline: 'none !important',
        },
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
    },
};

export const contactStyles = {
    container: {
        '&:hover': {
            textDecoration: 'none',
            cursor: 'default',
        },
    },
    containerButton: {
        '&:hover': {
            background: 'none',
            cursor: 'default',
        },
        background: 'none',
    },
    icon: {
        fontSize: FontSizes.size10,
    },
    textWrapper: {
        '&:hover': {
            textDecoration: 'none',
            cursor: 'default',
        },
    },
    text: {
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.size12,
    },
    role: { fontWeight: FontWeights.regular, fontSize: FontSizes.size12 },
};

export const associatedWIconStyle = { root: { fontSize: FontSizes.size10, transform: 'translateY(0.5px)', color: COLORS.lightGray130 } };

export const associatedWPersonaIconStyle = mergeStyleSets(associatedWIconStyle, { root: { transform: 'none' } });

export const associatedWithRoleTextStyles = { color: COLORS.lightGray130 };
