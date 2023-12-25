import { IIconStyles } from '@fluentui/react/lib/components/Icon/Icon.types';
import { ILinkStyles } from '@fluentui/react/lib/components/Link/Link.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants';
import { getClassNames, IEmptyStateProps } from '@fsi/core-components/dist/components/atoms/EmptyState';

export const documentPipelineStepsStyles: IStackStyles = {
    root: {},
};

export const documentPipelineStepListStyles: IStackStyles = {
    root: {
        gap: 20,
        paddingBlockStart: 16,
    },
};

export const pipelineStepsCollapseBtnStyles: IIconStyles = { root: { width: 16, height: 16, marginInlineEnd: 4 } };

export const pipelineStepItemNameStyles: ITextStyles = {
    root: {
        fontSize: FontSizes.size12,
        color: COLORS.darkGray160,
        lineHeight: 16,
    },
};

export const pipelineStepItemLinkStyles: ILinkStyles = {
    root: {
        fontSize: FontSizes.size10,
        fontWeight: FontWeights.semibold,
        lineHeight: 12,
        alignSelf: 'start',
        whiteSpace: 'nowrap',
        paddingBlockStart: 2,
    },
};

export const pipelineStepItemDescStyles: ITextStyles = {
    root: {
        fontSize: FontSizes.size12,
        color: COLORS.darkGray,
        lineHeight: 16,
        whiteSpace: 'normal',
    },
};

export const pipelineStepItemTokens = { childrenGap: 4 };

export const getPipelineStepItemIconStyles = (color: string): IIconStyles => ({
    root: {
        alignSelf: 'start',
        fontSize: FontSizes.size12,
        lineHeight: 16,
        color,
    },
});

export const pipelineStepsErrorStyles = {
    title: { fontSize: FontSizes.size12, textAlign: 'start' },
    subtitle: { paddingBlockStart: 0, fontSize: FontSizes.size12, textAlign: 'start' },
    container: {
        flexDirection: 'row nowrap',
        gap: 10,
        alignItems: 'start',
    },
    detailsWrapper: {
        justifyContent: 'start',
        alignItems: 'start',
    },
};

export const errorStateStyles = getClassNames({
    styles: pipelineStepsErrorStyles,
    iconSize: 48,
} as any as IEmptyStateProps);
