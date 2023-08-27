import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';

export const wrapperCommentStyles: IStackStyles = {
    root: {
        '& input:not(:focus):not(:hover)::placeholder': {
            color: 'transparent',
        },
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

export const textFieldReadModeStyles = {
    fieldGroup: {
        height: 'auto',
        '&:not(:focus-within)': {
            background: 'none',
            border: 'none',
            selectors: {
                '::after': {
                    border: 'none',
                },
            },
        },
    },
};
