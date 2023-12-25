import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { IEmptyStateStyles } from '@fsi/core-components/dist/components/atoms/EmptyState';

export const allContactsStyle: ITextStyles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 8,
    },
};

export const emptyStateContactStyles = {
    container: {
        padding: 0,
    },
    subtitle: {
        padding: '10px 0',
    },
    icon: {
        marginBottom: 10,
    },
};

export const errorStateContactCardStyle: IEmptyStateStyles = {
    container: { padding: '0px', alignItems: 'flex-start' },
    subtitle: { padding: '4px 0px' },
};

export const shimmerContactCardStyle = {
    padding: '0px !important',
    alignContent: 'left',
    width: '45%',
};
