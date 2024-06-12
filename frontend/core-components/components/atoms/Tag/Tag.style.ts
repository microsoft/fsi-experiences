import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants/Colors';
import { TagStyles } from './Tag';

export const defaultTagStyles: TagStyles = {
    root: {
        height: '16px',
        padding: '0 8px',
        background: COLORS.primaryTagBackground,
        borderRadius: '2px',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '10px',
        whiteSpace: 'nowrap',
        color: COLORS.primaryTagText,
    },
    text: {
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size10,
    },
};
