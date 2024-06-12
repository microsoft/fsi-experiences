import { IDetailsListStyles } from '@fluentui/react/lib/components/DetailsList/DetailsList.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { detailsListStyles } from '@fsi/core-components/dist/styles/DetailsList.style';
import { minSixColumns } from './FHSummary.const';

export const withIconClassNames = mergeStyleSets({
    IconHeaderIcon: {
        padding: 0,
        fontSize: FontSizes.size20,
    },
    IconCell: {
        textAlign: 'left',
        fontSize: FontSizes.size14,
        '&.ms-DetailsRow-cell': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    IconImg: {
        verticalAlign: 'sub',
        maxHeight: '20px',
        maxWidth: '20px',
        minWidth: '20px',
        color: COLORS.primaryTagText,
        fontSize: FontSizes.size16,
    },
    GreyIconImg: {
        verticalAlign: 'sub',
        maxHeight: '10px',
        maxWidth: '20px',
        minWidth: '20px',
        color: COLORS.iconGrey,
        fontSize: FontSizes.size16,
    },
    text: {
        fontSize: FontSizes.size14,
        color: COLORS.primaryTagText,
        whiteSpace: 'normal',
    },
    zeroSumText: {
        fontSize: FontSizes.size14,
        fontFamily: 'Segoe UI',
        color: COLORS.iconGrey,
    },
    leftSumText: {
        textAlign: 'right',
        fontSize: FontSizes.size14,
        color: COLORS.primaryTagText,
    },
});

export const withoutIconClassNames = mergeStyleSets({
    IconCell: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        '&.ms-DetailsRow-cell': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    BlueIconImg: {
        verticalAlign: 'middle',
        maxHeight: '10px',
        maxWidth: '10px',
        color: COLORS.blue,
        fontSize: FontSizes.size16,
    },
    RedIconImg: {
        verticalAlign: 'middle',
        maxHeight: '10px',
        maxWidth: '10px',
        color: COLORS.red,
        fontSize: FontSizes.size16,
    },
    otherHeaderStyle: {
        opacity: 0,
        cellName: {
            fontFamily: 'Segoe UI',
            fontSize: FontSizes.size12,
            varticalAligh: 'center',
        },
    },
    AccountHeaderStyle: {
        fontFamily: 'Segoe UI',
        fontSize: FontSizes.size14,
    },
    leftSumText: {
        textAlign: 'right',
        fontSize: FontSizes.size14,
    },
    nameText: {
        fontSize: FontSizes.size14,
        color: COLORS.primaryTagText,
    },
    hiddenHeader: {
        opacity: 0,
    },
});

export const fullWidth = {
    root: {
        width: '100%!important',
    },
};

export const margins = {
    margin: '0px',
    padding: '0 24px',
};

export const fhSummaryAssetsLiabilities = {
    root: {
        margin: '0px',
        paddingBlock: 0,
        paddingInline: '32px 24px',
    },
};

export const fhSummaryTableStyle: IDetailsListStyles = {
    ...fullWidth,
    ...detailsListStyles,
    contentWrapper: {
        '.ms-DetailsRow:hover': {
            background: 'initial',
        },
        '.ms-DetailsRow-cell': { padding: '14px 12px' },
    },
    focusZone: undefined,
    headerWrapper: undefined,
};

export const summarySeparatorStyle = {
    root: {
        padding: '0px',
        height: '0px',
        zIndex: 9,
        [minSixColumns]: {
            display: 'none',
        },
    },
};

export const summarySumColumn = {
    textAlign: 'right',
    fontSize: FontSizes.size14,
    color: COLORS.black,
    fontFamily: 'Segoe UI',
};

export const summarySumColumnStyles: ITextStyles = {
    root: {
        fontSize: FontSizes.size14,
        color: COLORS.black,
        fontFamily: 'Segoe UI',
    },
};
