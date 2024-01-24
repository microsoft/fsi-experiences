import { IStackStyles } from '@fluentui/react/lib/components/Stack';
import { ITextStyles } from '@fluentui/react/lib/components/Text';
import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { FinancialGoalStyle } from '../FinancialGoalFooter.style';

export const footerWrapper: IStackStyles = {
    root: {
        borderTop: `1px solid ${NeutralColors.gray30}`,
        paddingTop: '6px',
        flex: 1,
    },
};

export const typeWrapperStylesNoTagFinancialGoal: IStackStyles = {
    root: {
        gap: 4,
        display: 'inline',
        width: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'start',
    },
};

export const typeWrapperStylesTagFinancialGoal: IStackStyles = {
    root: {
        gap: 4,
        display: 'inline',
    },
};

export const completeGoalStyle: ITextStyles = mergeStyleSets(FinancialGoalStyle, {
    root: {
        backgroundColor: COLORS.lightGreen,
        color: COLORS.successIcon,
        borderColor: COLORS.midGreen,
    },
});

export const financialGoalReviewDateStyle: ITextStyles = mergeStyleSets(FinancialGoalStyle, {
    root: {
        backgroundColor: COLORS.lightYellow,
        color: COLORS.shadedYellow,
        borderColor: COLORS.sunYellow,
    },
});

export const goalBoxStyle: ITextStyles = mergeStyleSets(FinancialGoalStyle, {
    root: {
        backgroundColor: COLORS.lightBlue,
        color: COLORS.darkBlue2,
        borderColor: COLORS.blueSky,
        fontSize: FontSizes.size12,
        paddingBlock: 2,
        paddingInline: 4,
        display: 'inline',
    },
});

export const completeGoalStyleSidePanel: ITextStyles = mergeStyleSets(completeGoalStyle, {
    root: {
        fontSize: FontSizes.size12,
        paddingBlock: 2,
        paddingInline: 4,
        display: 'inline',
    },
});

export const dateFinancialGoalStyle: ITextStyles = {
    root: {
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.size12,
        color: NeutralColors.gray130,
        marginTop: 0,
        width: '95%',
        display: 'block',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'start',
    },
};
