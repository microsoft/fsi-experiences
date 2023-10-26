import { IStackItemStyles, IStackStyles } from '@fluentui/react/lib/Stack';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { createClassSelectorRange } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';

export const FH_SUMMARY_FULL_VIEW = 'fh-summary-full';
export const FH_SUMMARY_COMPACT_VIEW = 'fh-summary-compact';

const collapsedFHSelector = `${createClassSelectorRange(4, 5, FH_SUMMARY_FULL_VIEW)}`;

const collapsedAllCompactFHSelector = `${createClassSelectorRange(1, 4, FH_SUMMARY_COMPACT_VIEW)}`;

const minSevenColumnsSelector = `${createClassSelectorRange(7, 12, FH_SUMMARY_FULL_VIEW)}`;

const maxFiveColumns = `${createClassSelectorRange(1, 5, FH_SUMMARY_FULL_VIEW)}`;

const maxFourColumnsSelector = `${createClassSelectorRange(1, 4, FH_SUMMARY_FULL_VIEW)}`;

const maxThreeColumnsSelector = `${createClassSelectorRange(0, 3, FH_SUMMARY_FULL_VIEW)}`;

export const responsiveContainerStyles = { flex: '1' };

export const fullViewRootStyle = {
    root: {
        margin: '16px',
        [maxFiveColumns]: {
            flexWrap: 'wrap',
        },
    },
};

export const fullViewSeparatorStyle = { root: { width: '100%', padding: '0px 0px', height: '0px' } };

export const compactViewRootStyle = { root: { margin: '16px' } };

export const compactSeparatorStyle = {
    root: {
        padding: '0px 0px',
        [collapsedAllCompactFHSelector]: {
            width: '100%',
        },
    },
};

export const assetsCardStyles = {
    root: {
        width: '40%',
        [maxThreeColumnsSelector]: {
            width: '100%',
        },
        [collapsedAllCompactFHSelector]: {
            width: '100%',
        },
        [maxFiveColumns]: {
            marginLeft: '0 !important',
        },
    },
};
export const liabilitiesCardStyles = {
    root: {
        width: '40%',
        [maxFourColumnsSelector]: {
            marginLeft: 16,
        },
        [maxThreeColumnsSelector]: {
            marginLeft: '0 !important',
            marginTop: 16,
        },
    },
};

export const annualIncomeCardStyles: IStackItemStyles = {
    root: {
        width: '20%',
        minWidth: 120,

        '.fh-summary-compact &': {
            width: '33%',
        },

        [collapsedFHSelector]: {
            width: '100%',
        },

        [collapsedAllCompactFHSelector]: {
            width: '100%',
        },
        [maxFiveColumns]: {
            width: '100%',
            marginBottom: 16,
        },
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
        margin: 4,
    },
};

export const annualIncomeCurrencyTextStyles = {
    root: {
        color: COLORS.black,
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.size18,
        lineHeight: '28px',
        textAlign: 'center',
        width: '100%',
        margin: 4,
    },
};

export const annualIncomeWrapper = {
    inner: {
        [minSevenColumnsSelector]: {
            '>:first-child': {
                marginBottom: 10,
            },
        },
        [maxFiveColumns]: {
            flexWrap: 'nowrap',
            padding: '45px 0',
        },
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
