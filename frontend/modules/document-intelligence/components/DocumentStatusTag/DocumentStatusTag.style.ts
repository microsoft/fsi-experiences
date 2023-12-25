import { FontSizes, IStyle, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export interface IDocumentStatusTagStyles {
    container?: IStyle;
    icon?: IStyle;
    text?: IStyle;
}

interface IDocumentStatusColors {
    background: string;
    borderColor: string;
    text: string;
}

export const approvedStatusColors: IDocumentStatusColors = {
    background: COLORS.lightGreen,
    text: COLORS.successIcon,
    borderColor: '#A7E3A5',
};

export const rejectedStatusColors: IDocumentStatusColors = {
    background: '#FDF3F4',
    text: '#C50F1F',
    borderColor: '#F6D1D4',
};

const getStyleByStatus = (isApproved: boolean): IDocumentStatusTagStyles => {
    const colors = isApproved ? approvedStatusColors : rejectedStatusColors;
    return {
        container: {
            background: colors.background,
            borderColor: colors.borderColor,
        },
        icon: {
            color: colors.text,
        },
        text: {
            color: colors.text,
        },
    };
};

export const getDocumentStatusTagClassNames = (isApproved: boolean) => {
    return mergeStyleSets(
        {
            container: {
                alignItems: 'center',
                paddingBlock: '4px',
                paddingInline: '6px',
                border: '1px solid #F6D1D4',
                borderRadius: 4,
                fontSize: FontSizes.size12,
                lineHeight: 16,
                gap: 6,
            },
            icon: {
                display: 'flex',
                alignItems: 'center',
                lineHeight: '10px',
                fontSize: FontSizes.size14,
            },
        },
        getStyleByStatus(isApproved)
    );
};
