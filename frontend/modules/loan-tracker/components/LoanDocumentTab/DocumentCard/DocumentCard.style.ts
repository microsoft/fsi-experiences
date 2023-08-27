import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { FontSizes, FontWeights, mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { DocumentsBigScreenSize, DocumentsSmallScreenSize } from '../../../constants/LoanDocument.consts';
import { COLORS } from '@fsi/core-components/dist/constants';

const cardStyle = {
    root: {
        borderRadius: '2px',
        height: '164px',
        padding: 12,
        marginBottom: 10,
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            display: 'grid',
            gridTemplateColumns: '100%',
            gridTemplateRows: '1fr 1fr',
            height: 'auto',
        },
    },
};

export const cardHeaderTokens = { childrenGap: '8px' };

export const regularCardStyle = mergeStyleSets(cardStyle, {
    root: {
        backgroundColor: NeutralColors.white,
        boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            height: 'auto',
        },
    },
});

export const missingFileStyle = mergeStyleSets(cardStyle, {
    root: {
        backgroundColor: NeutralColors.gray20,
        border: `1px dashed ${NeutralColors.gray80}`,
        boxSizing: 'border-box',
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            height: 'auto',
        },
    },
});

export const detailsTextStyle = mergeStyles({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
});

export const cardRejectedButtonStyle = {
    root: {
        fontSize: FontSizes.size12,
        fontWeight: FontWeights.semibold,
    },
};

export const cardRoleStyle = {
    root: {
        marginTop: '11px',
        marginBottom: '4px',
        width: 'fit-content',
        textAlign: 'left',
        backgroundColor: COLORS.documentCardCustomerRoleTagColor,
        margin: 0,
        overflowX: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        [`@media screen and (min-width: ${DocumentsSmallScreenSize}) and (max-width: ${DocumentsBigScreenSize})`]: {
            marginRight: 12,
            marginLeft: 'auto',
            alignSelf: 'center',
        },
        [`@media screen and (max-width: ${DocumentsSmallScreenSize})`]: {
            alignSelf: 'end',
        },
    },
};

export const cardDetailsTextStyle = {
    root: {
        fontSize: FontSizes.size10,
        fontWeight: FontWeights.regular,
        color: COLORS.darkGray,
        textAlign: 'start',
        [`@media screen and (min-width: ${DocumentsSmallScreenSize}) and (max-width: ${DocumentsBigScreenSize})`]: {
            marginBlockStart: '1.5rem',
            marginInlineEnd: '4px',
        },
        [`@media screen and (max-width: ${DocumentsSmallScreenSize})`]: {
            display: 'none',
        },
    },
};

export const cardDetailsToolTipStyles = {
    root: {
        fontSize: FontSizes.size10,
        fontWeight: FontWeights.regular,
        color: COLORS.darkGray,
        textAlign: 'start',
        [`@media screen and (min-width: ${DocumentsSmallScreenSize}) and (max-width: ${DocumentsBigScreenSize})`]: {
            display: 'none',
        },
    },
};

export const cardDescriptionTooltipStyle = {
    root: {
        display: 'inline-block',
        textAlign: 'left',
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            display: 'none',
        },
    },
};

export const cardDescriptionTooltipTextStyle = {
    root: {
        whiteSpace: 'break-spaces',
    },
};

export const cardDescriptionTextStyle = {
    root: {
        fontSize: FontSizes.size12,
        fontWeight: FontWeights.regular,
        color: COLORS.darkGray,
    },
};

export const buttonTextStyle = {
    root: {
        fontSize: FontSizes.size12,
        fontWeight: FontWeights.regular,
    },
};

export const dividerStyle = {
    root: {
        padding: '0px',
        fontSize: '0px',
        height: 'initial',
        '&:before': {
            backgroundColor: COLORS.lightGray,
            height: '1px',
            content: '',
            display: 'block',
            position: 'absolute',
            inset: '50% 0px 0px',
        },
    },
};

export const actionButtonStyles: IButtonStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        padding: 0,
        margin: 0,
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            display: 'none',
        },
    },
    label: {
        margin: 0,
    },
};

export const cardButtonStyle = (themePrimary: string): IButtonStyles =>
    mergeStyleSets(actionButtonStyles, {
        root: {
            color: themePrimary,
        },
    });

export const seperatorStyles = {
    root: {
        height: 1,
        margin: 0,
        padding: 0,
        '::before': {
            backgroundColor: NeutralColors.gray30,
        },
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            display: 'none',
        },
    },
};

export const moreIconStyle = { fontSize: FontSizes.size16 };

export const moreButtonStyles = {
    root: {
        pointerEvents: 'auto',
        [`@media screen and (min-width: ${DocumentsSmallScreenSize}) and (max-width: ${DocumentsBigScreenSize})`]: {
            marginTop: 0,
            alignSelf: 'center',
        },
        [`@media screen and (max-width: ${DocumentsSmallScreenSize})`]: {
            alignSelf: 'end',
            marginLeft: 'auto',
        },
    },
};

export const cardHeaderStyles = {
    root: {
        fontSize: 28,
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            fontSize: 20,
        },
    },
};

export const cardDetailsHeaderToolTipStyles = {
    root: {
        display: 'inline-block',
        maxWidth: 200,
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            gridColumn: '1',
            gridRow: '1',
        },
    },
};

export const cardMoreDataWithFooterStyles = {
    root: {
        [`@media screen and (max-width: ${DocumentsBigScreenSize})`]: {
            flexFlow: 'row',
            alignItems: 'center',
            gridRow: '1/-1',
            gridColumn: '1/1',
            pointerEvents: 'none',
        },
    },
};

export const menuInputUploadButtonStyle = mergeStyles({
    display: 'none !important',
});
