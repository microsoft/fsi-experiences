import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

export const FormErrorStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
    },
};

export const formErrorModalStyles = {
    main: {
        selectors: {
            ['@media (min-width: 480px)']: {
                width: '100%',
            },
        },
    },
};
