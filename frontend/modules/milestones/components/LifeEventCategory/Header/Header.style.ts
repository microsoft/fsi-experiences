import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { IStackItemStyles } from '@fluentui/react/lib/components/Stack/StackItem/StackItem.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { FontSizes, NeutralColors } from '@fluentui/react/lib/Theme';

const ellipsisCss = {
    root: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

export const categoryDetails: IStackStyles = {
    root: {
        marginLeft: '8px !important',
        overflow: 'hidden',
        alignItems: 'flex-start',
    },
};

export const eventsTextStyles: ITextStyles = mergeStyleSets(
    {
        root: {
            fontSize: 12,
            color: NeutralColors.gray130,
            lineHeight: 18,
        },
    },
    ellipsisCss
);

export const lifeEventButtonStyle = (primaryColor: string): IButtonStyles => ({
    root: {
        minWidth: '36px',
        width: '36px',
        height: '36px',
        borderRadius: '4px',
        border: 'none',
        '&.ms-Button--default': {
            background: 'transparent',
            color: primaryColor,
            border: `2px solid ${primaryColor}`,
        },
        '&.ms-Button--default:hover': {
            background: 'transparent',
            color: primaryColor,
            border: `2px solid ${primaryColor}`,
        },
        '&.ms-Button--default:active': {
            color: primaryColor,
        },
    },
});

export const categoryTitleStyle: ITextStyles = mergeStyleSets(
    {
        root: {
            fontSize: FontSizes.size14,
            lineHeight: 18,
            color: NeutralColors.black,
            fontWeight: 600,
        },
    },
    ellipsisCss
);

export const disabledCategoryTitleStyle: ITextStyles = mergeStyleSets(categoryTitleStyle, {
    root: {
        color: NeutralColors.gray130,
    },
});

export const rowStyles: IStackItemStyles = {
    root: {
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
    },
};
