import { IStackItemStyles, IStackStyles } from '@fluentui/react/lib/Stack';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '../../../constants/Colors';

export const fullViewSeparatorStyle = { root: { width: '100%', padding: '0px 0px', height: '0px' } };

export const compactSeparatorStyle = {
    root: {
        padding: '0px 0px',
    },
};

export const annualIncomeTextStyles = {
    root: {
        color: COLORS.black,
        fontWeight: FontWeights.semibold,
        lineHeight: '40px',
        textAlign: 'center',
        width: '100%',
        fontSize: FontSizes.size32,
        margin: 2,
    },
};

export const annualIncomeCurrencyTextStyles = {
    root: {
        color: COLORS.black,
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.size18,
        lineHeight: '24px',
        textAlign: 'center',
        width: '100%',
        margin: 2,
    },
};

export const fullViewFirstItemStyles: IStackItemStyles = { root: { paddingLeft: '16px', paddingTop: '16px' } };

export const fullViewStackStyle: IStackStyles = {
    root: {
        background: COLORS.white,
        boxShadow: '0px 1.6px 3.6px rgba(0, 0, 0, 0.132), 0px 0.3px 0.9px rgba(0, 0, 0, 0.108)',
        borderRadius: '4px',
        height: '100%',
    },
};
