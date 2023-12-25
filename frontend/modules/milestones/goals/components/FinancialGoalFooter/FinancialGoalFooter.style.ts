import { IStackStyles } from '@fluentui/react/lib/components/Stack';
import { ITextStyles } from '@fluentui/react/lib/components/Text';
import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const footerWrapper: IStackStyles = {
    root: {
        borderTop: `1px solid ${NeutralColors.gray30}`,
        paddingTop: '6px',
        flex: 1,
    },
};

export const typeStringItemStyles: ITextStyles = {
    root: {
        flex: '0 1 auto',
        alignSelf: 'auto',
        fontSize: FontSizes.size12,
        lineHeight: '16px',
        color: NeutralColors.gray170,
        fontWeight: FontWeights.semibold,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'start',
    },
};

export const typeWrapperStylesFinancialGoal: IStackStyles = {
    root: { gap: 6 },
};

export const valueLabelStylesFinancialGoal: IStackStyles = {
    root: { gap: 4, display: 'flex' },
};

export const FinancialGoalStyle: ITextStyles = {
    root: {
        fontSize: FontSizes.size10,
        fontWeight: FontWeights.regular,
        padding: '1px 4px',
        textAlign: 'center',
        borderRadius: '2px',
        gap: '2px',
        border: `1px solid`,
        display: 'block',
    },
};

export const FinancialGoalBoxStyle: ITextStyles = mergeStyleSets(FinancialGoalStyle, {
    root: {
        backgroundColor: COLORS.lightBlue,
        color: COLORS.darkBlue2,
        borderColor: COLORS.blueSky,
    },
});
export const dateFinancialGoalStyle: ITextStyles = {
    root: {
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.size12,
        color: NeutralColors.gray130,
        marginTop: 0,
        width: '100%',
    },
};
