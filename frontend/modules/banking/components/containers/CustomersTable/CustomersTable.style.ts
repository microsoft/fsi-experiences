import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const customerTableStyles = mergeStyleSets({
    customerColumn: {
        fontSize: FontSizes.size14,
        color: COLORS.primaryTagText,
    },
    roleColumn: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
        color: COLORS.darkGray,
    },
});

export const emptyStateStyles = {
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
