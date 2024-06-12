import { CSSProperties } from 'react';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { FontSizes } from '@fluentui/theme/lib/fonts/FluentFonts';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { ILabelStyles } from '@fluentui/react/lib/components/Label/Label.types';

export const deleteIcon: IIconProps = {
    iconName: 'Delete',
    'aria-hidden': true,
};
export const editIcon: IIconProps = {
    iconName: 'EditMirrored',
    'aria-hidden': true,
};
export const addGoalIcon: IIconProps = {
    iconName: 'Add',
    'aria-hidden': true,
};
export const markCompleteGoalIcon: IIconProps = {
    iconName: 'Accept',
    'aria-hidden': true,
};
export const markNotCompleteGoalIcon: IIconProps = {
    iconName: 'RemoveFilter',
    'aria-hidden': true,
};
export const optionsIcon: IIconProps = {
    iconName: 'MoreVertical',
    'aria-hidden': true,
};

export const disabledIconButton = {
    rootDisabled: { background: NeutralColors.white },
    root: { padding: '8px' },
};
export const titleStyle: CSSProperties = {
    fontSize: FontSizes.size14,
    lineHeight: '20px',
    color: NeutralColors.gray160,
    textAlign: 'start',
    fontWeight: FontWeights.semibold as number,
    padding: 0,
};

export const detailsStyle: ILabelStyles = {
    root: {
        fontSize: FontSizes.size12,
        lineHeight: '14px',
        color: NeutralColors.gray130,
        textAlign: 'start',
        fontWeight: FontWeights.regular,
        padding: 0,
        wordBreak: 'break-word',
    },
};
export const dateStyle: ITextStyles = mergeStyleSets(detailsStyle, {
    root: {
        color: NeutralColors.gray160,
        fontSize: FontSizes.size14,
        lineHeight: '20px',
        paddingBlockEnd: '4px',
    },
});
export const externalTagStyle: CSSProperties = {
    fontSize: FontSizes.size10,
    lineHeight: '12px',
    fontWeight: FontWeights.semibold as number,
    background: NeutralColors.gray30,
    padding: '2px 8px',
    marginBlockStart: '8px',
};

export const goalTogetherWithEventStyle: ITextStyles = {
    root: { marginTop: 4 },
};
