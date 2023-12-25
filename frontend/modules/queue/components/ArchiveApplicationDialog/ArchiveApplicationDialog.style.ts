import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

export const dialogErrorTextStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
    },
};

export const loadingModalProps = {
    isBlocking: true,
    styles: { main: { maxWidth: '100%' } },
};

export const commentFieldStyles = {
    root: {
        width: '100%',
    },
    subComponentStyles: {
        label: {
            root: {
                marginBlockEnd: 12,
            },
        },
    },
    field: {
        height: 132,
    },
};

export const reasonDropdownStyles = {
    root: {
        whiteSpace: 'pre-wrap',
    },
    label: {
        marginBlockEnd: 12,
    },
    dropdown: {
        width: '100%',
    },
};

export const dialogBtnStyles = {
    root: {
        minWidth: 143,
    },
};
