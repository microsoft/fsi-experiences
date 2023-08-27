import { IButtonStyles } from '@fluentui/react';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { DocumentsBigScreenSize } from '../../../constants/LoanDocument.consts';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const cardsWrapper = {
    root: {
        display: 'grid',
        columnGap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 337px))',
        padding: '10px 15px',
        paddingBottom: 0,
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            gridTemplateColumns: '100%',
        },
    },
};

export const openedListStyle = {
    root: {
        backgroundColor: COLORS.instrumentGrey,
        height: '100%',
    },
};

export const iconButtonStyle: IButtonStyles = {
    root: {
        color: COLORS.darkGray,
        background: 'transparent',
    },
    rootHovered: {
        background: 'transparent',
    },
};

export const iconButtonDisabledStyle: IButtonStyles = {
    root: {
        color: COLORS.disabledButtonColor,
        background: 'transparent',
        pointerEvents: 'none',
    },
    rootHovered: {
        background: 'transparent',
    },
};

export const loadingTextStyle = {
    root: {
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
        color: COLORS.darkGray,
    },
};

export const sectionTitleStye = {
    root: {
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
    },
};

export const lockedSectionTitleStyle = {
    root: {
        color: COLORS.iconGrey,
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
    },
};

export const rootStyles = {
    root: {
        background: COLORS.white,
    },
};

export const headerRowStyles = { root: { height: 48 } };
