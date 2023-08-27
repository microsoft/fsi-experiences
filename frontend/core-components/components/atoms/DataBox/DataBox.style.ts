import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants/Colors';

export const getBoxLabelStyles = (color: string = COLORS.darkGray): ITextStyles => {
    return {
        root: {
            color,
            fontSize: FontSizes.size12,
            lineHeight: 20,
            textAlign: 'start',
            fontWeight: FontWeights.regular,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    };
};

export const valueStyle: ITextStyles = {
    root: {
        textAlign: 'start',
        color: COLORS.primaryTagText,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: 28,
    },
};

export const footerStyle: ITextStyles = {
    root: {
        whiteSpace: 'nowrap',
        fontSize: `12px`,
        lineHeight: '16px',
        paddingTop: '8px',
        textAlign: 'start',
    },
};

export const wrapperStyles = {
    root: {
        minWidth: 0,
    },
};
