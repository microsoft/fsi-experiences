import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const buttonStyles: IButtonStyles = {
    root: {
        height: '32px',
        border: 'none',
    },
    label: { fontWeight: FontWeights.regular },
};

export const relationshipCardIconStyle = { root: { fontSize: '16px' } };

export const relationshipMainAppHeaderTextStyles = {
    root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size32, color: COLORS.primaryTagText },
};

export const tablePadding = {
    paddingLeft: 24,
    paddingRight: 24,
};

export const relationshipsSeparatorStyles = {
    root: {
        padding: '8px 24px',
        fontSize: '0px',
        height: 'initial',
        selectors: {
            '::before': {
                position: 'relative',
            },
        },
    },
};

export const rootStyles = {
    root: {
        background: COLORS.white,
    },
};
