import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

export const dialogErrorTextStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
    },
};

export const addNewPartyFormDialogStyles = {
    main: {
        [`@media screen and (min-width: 320px)`]: {
            minWidth: 'clamp(300px, 90vw, 493px)',
        },
    },
};

export const addNewPartyFormDialogContentStyles = {
    title: {
        padding: '24px',
    },
};

export const addNewPartyFormDialogFooterStyles = { actions: { marginBlockStart: '50px' } };

export const acceptButtonStyles = {
    root: {
        minWidth: 134,
    },
};
