import { IStackStyles } from '@fluentui/react/lib/components/Stack';
import { ITextStyles } from '@fluentui/react/lib/components/Text';
import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const goalSidePanelStyle = { root: { flexDirection: 'row' } };

export const iconStyle = { transform: 'rotateY(180deg)', padding: 4, paddingBlockStart: 2, color: NeutralColors.gray130 };

export const iconTypeStyle = mergeStyleSets(iconStyle, {
    root: {
        fontSize: FontSizes.size10,
    },
});

export const typeWrapperStylesFinancialGoal: IStackStyles = {
    root: { gap: 4, paddingBlockStart: 4 },
};

export const wrapperTagAndGoalName: IStackStyles = {
    root: { display: 'inline', position: 'relative', zIndex: 1 },
};

export const targetNameTitleStyles = {
    root: {
        fontSize: FontSizes.size14,
        lineHeight: 20,
        color: NeutralColors.black,
        fontWeight: FontWeights.semibold,
        textAlign: 'start',
        display: 'initial',
        gap: 2,
        wordBreak: 'break-word',
    },
};

export const typeStringItemStyles: ITextStyles = mergeStyleSets(targetNameTitleStyles, {
    root: {
        fontWeight: FontWeights.regular,
        paddingBlockEnd: 4,
        lineHeight: 20,
    },
});

export const typeGoalStyle = {
    root: {
        fontSize: FontSizes.size12,
        color: NeutralColors.gray130,
    },
};

export const typeGoalWrapperStyle = {
    root: { flexDirection: 'row', gap: 8, lineHeight: 16 },
};
