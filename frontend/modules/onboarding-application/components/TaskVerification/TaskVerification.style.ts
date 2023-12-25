import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const widgetStyles = { root: { background: COLORS.white, flex: 1, flexDirection: 'row' } };

export const emptyStateStyles = {
    container: {
        paddingBlock: 16,
    },
    icon: {
        marginBlockEnd: 8,
    },
};

export const errorStateStyles = {
    container: {
        paddingBlock: 8,
    },
    icon: {
        marginBlockEnd: 8,
    },
};
