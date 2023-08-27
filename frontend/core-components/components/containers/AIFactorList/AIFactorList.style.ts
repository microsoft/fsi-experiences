import { IStackStyles, IStackTokens } from '@fluentui/react/lib/components/Stack';
import { FontSizes } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants';

export const aiFactorListStackTokens: IStackTokens = {
    padding: '20px 16px',
    childrenGap: 12,
};
export const aiFactorListLabelStyles: IStackStyles = {
    root: {
        textAlign: 'left',
        color: COLORS.darkGray,
        fontSize: FontSizes.size12,
        paddingInlineEnd: 4,
    },
};
export const aiFactorInnerListStackTokens: IStackTokens = {
    childrenGap: 16,
};
export const aiFactorListLegendStackTokens: IStackTokens = {
    childrenGap: 16,
    padding: '14px 0 0 0',
};

export const aiTopFactorCalloutStyles = {
    root: {
        maxWidth: 350,
        padding: '0 14px',
        '@media (max-width:350px)': {
            maxWidth: 250,
        },
    },
};
