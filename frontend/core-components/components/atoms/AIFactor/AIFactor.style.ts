import { mergeStyles } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants';

export const aiFactorStackTokens = {
    childrenGap: 4,
};
export const aiFactorValueStyles = {
    root: {
        width: '2rem',
        color: COLORS.primaryTagText,
    },
};
export const aiFactorDisplayNameStyles = {
    root: {
        color: COLORS.darkGray,
        textAlign: 'start',
        padding: '0 4px',
    },
};

export const getAIFactorIconClass = (factor: number, size: number, lowIsGood?: boolean) =>
    mergeStyles({
        color: (lowIsGood ? factor * -1 : factor) < 0 ? COLORS.red : COLORS.successIcon,
        marginInlineEnd: 2,
        fontSize: size,
    });
