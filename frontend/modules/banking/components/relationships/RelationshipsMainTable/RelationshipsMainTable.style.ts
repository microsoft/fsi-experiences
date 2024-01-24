import { mergeStyleSets } from '@fluentui/react/lib/Styling';

export const detailsListStyles = mergeStyleSets({
    root: {
        '.ms-DetailsHeader-cell:hover': {
            background: 'initial',
        },
        '.ms-DetailsHeader-cell:active': {
            background: 'initial',
        },
        overflowX: 'hidden',
    },
    contentWrapper: {
        '.control-btn': {
            display: 'none',
            maxHeight: 20,
        },
        '.ms-DetailsRow:hover': {
            '.control-btn': {
                display: 'block',
            },
        },
        '.ms-DetailsRow:focus-within': {
            '.control-btn': {
                display: 'block',
            },
        },
    },
});

export const relationshipCardIconStyle = { root: { fontSize: '16px' } };
