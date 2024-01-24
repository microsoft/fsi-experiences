import { FontSizes } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const messageBarStyle = {
    root: {
        background: COLORS.lighterGray,
        minHeight: 'auto',
        overFlow: 'hidden',
        whiteSpace: 'break-spaces',
    },
    content: {
        fontSize: FontSizes.size12,
        color: COLORS.darkGray160,
    },
};

export const iconStyle = {
    root: {
        color: COLORS.darkGray160,
        fontSize: FontSizes.size14,
    },
};
