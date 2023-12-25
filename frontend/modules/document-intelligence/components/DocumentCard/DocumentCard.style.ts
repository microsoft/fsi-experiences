import { IStackStyles, IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITooltipHostStyles } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { IContactStyles } from '@fsi/core-components/dist/components/atoms/Contact/Contact.interface';
import { COLORS } from '@fsi/core-components/dist/constants';
import { HAS_FILE_CLASS } from './DocumentCard.const';

export const documentCardStyles: IStackStyles = {
    root: {
        minHeight: 160,
        borderRadius: 4,
        border: '1px dashed',
        borderColor: COLORS.lightGray80,
        transition: 'box-shadow 0.3s',
        background: COLORS.lightGray10,
        gap: 6,
        padding: 12,
        '&:hover': {},
        [`&.${HAS_FILE_CLASS}:hover`]: {
            boxShadow: '0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)',
        },
        [`&.${HAS_FILE_CLASS}`]: {
            cursor: 'pointer',
            boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
            border: 'none',
            background: COLORS.white,
        },
    },
};

export const documentHeaderWrapperStyles: IStackStyles = {
    root: {
        overflow: 'hidden',
        height: 60,
    },
};

export const documentHeaderStyles: ITooltipHostStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: 600,
        color: COLORS.darkGray160,
        textAlign: 'start',
        lineHeight: 20,
    },
};

export const documentRegardingStyles: IContactStyles = {
    text: {
        fontSize: FontSizes.size12,
        fontWeight: 400,
        color: COLORS.darkGray160,
    },
    role: {
        fontSize: FontSizes.size12,
    },
    icon: {
        fontSize: FontSizes.size10,
        display: 'none',
    },
    textWrapper: {
        flexWrap: 'wrap',
    },
};

export const documentCardContentTokens: IStackTokens = { childrenGap: 16 };

export const documentDescriptionStyle: ITooltipHostStyles = {
    root: { fontSize: FontSizes.size12, fontWeight: FontWeights.regular, color: COLORS.lightGray130, lineHeight: 16 },
};
