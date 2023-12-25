import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const groupHeaderStyles = {
    root: {
        padding: '12px 8px',
    },
};

export const groupHeaderCollapseIconStyles = {
    root: {
        color: COLORS.black,
        fontSize: '12px',
        padding: '10px 0px',
        cursor: 'pointer',
        userSelect: 'none',
        width: '20px',
        '&.with-checkboxes': {
            width: '30px',
        },
    },
};
export const groupHeaderSeparatorStyles = { root: { width: '100%', padding: '0px 0px', height: '2px' } };

export const groupHeaderTextStyles = { root: { fontSize: FontSizes.size16, fontWeight: FontWeights.semibold } };
export const groupHeaderIconStyles = { root: { fontSize: FontSizes.size16, paddingTop: '2px' } };
