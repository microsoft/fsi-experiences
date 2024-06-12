import { mergeStyleSets } from '@fluentui/react/lib/Styling';

export const detailsListStyles = mergeStyleSets({
    root: {
        '.ms-DetailsHeader-cell:hover': {
            background: 'initial',
        },
        '.ms-DetailsHeader-cell:active': {
            background: 'initial',
        },
        '.ms-DetailsRow:hover': {
            background: 'initial',
        },
    },
});

export const detailsListOverflowXHiddenStyles = mergeStyleSets(detailsListStyles, {
    root: {
        overflowX: 'hidden',
    },
});
