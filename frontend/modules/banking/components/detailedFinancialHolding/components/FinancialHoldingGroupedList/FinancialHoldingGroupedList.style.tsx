import { CSSProperties } from 'react';
import { FontSizes } from '@fluentui/theme/lib/fonts/FluentFonts';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { FontWeights } from '@fluentui/react/lib/Styling';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { IDetailsColumnStyles } from '@fluentui/react/lib/components/DetailsList/DetailsColumn.types';
import { ITooltipHostStyles } from '@fluentui/react/lib/components/Tooltip';

export const tableExpandAllStyles = {
    root: {
        overflowX: 'hidden',
        '.ms-DetailsRow:hover': {
            cursor: 'pointer',
        },
    },
    headerWrapper: {
        '.ms-DetailsHeader': {
            paddingTop: 0,
        },
        '.ms-DetailsHeader-cell:first-child': {
            marginLeft: '8px',
            width: '26px',
            fontSize: FontSizes.size16,
            cursor: 'pointer',
        },
    },
};

export const instrumentIconStyle: CSSProperties = {
    textAlign: 'center',
    color: COLORS.stepCircleBackground,
    height: '100%',
    display: 'block',
    fontSize: FontSizes.size16,
    padding: '3px 0px 0px 0px',
};

export const fhValueCellStyle: ITextStyles = {
    root: {
        color: COLORS.darkGray,
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
};

export const fhTypeCellStyle: ITextStyles = {
    root: {
        color: COLORS.darkGray,
        fontSize: FontSizes.size12,
    },
};
export const fhNameCellStyle: ITooltipHostStyles = {
    root: {
        color: COLORS.primaryTagText,
        fontSize: FontSizes.size14,
        overflow: 'hidden',
    },
};

export const fhColumnStyles = mergeStyleSets({
    balanceCell: {
        textAlign: 'right',
        justifyContent: 'flex-end',
        fontSize: FontSizes.size14,
    },
    indicatorCell: {
        '&.ms-DetailsRow-cell': {
            display: 'flex',
            alignItems: 'center',
        },
    },
});

export const balanceColumnHeaderStyles: Partial<IDetailsColumnStyles> = {
    cellTitle: {
        justifyContent: 'flex-end',
    },
};
