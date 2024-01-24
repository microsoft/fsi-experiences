import { IStackStyles } from '@fluentui/react/lib/components/Stack';
import { FontSizes, FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';
import { mergeStyleSets } from '@fluentui/react';

const paddingOfElement = 16;

export const allItemsStyle: IStackStyles = {
    root: {
        padding: paddingOfElement,
        borderBlockEnd: `1px solid ${NeutralColors.gray30}`,
        cursor: 'pointer',
        '&:hover': {
            background: NeutralColors.gray20,
        },
        '.currency-code': {
            fontSize: FontSizes.size14,
            fontWeight: FontWeights.regular,
        },
        '.numeric-value': {
            fontSize: FontSizes.size20,
            fontWeight: FontWeights.regular,
        },
    },
};

const borderWidth = 2;

export const selectedItemStyle = ({ themePrimary }): IStackStyles =>
    mergeStyleSets(allItemsStyle, {
        root: {
            borderInlineStart: `2px solid ${themePrimary}`,
            paddingInlineStart: paddingOfElement - borderWidth,
            background: NeutralColors.gray20,
            '.currency-code, .numeric-value': {
                fontWeight: FontWeights.semibold,
            },
        },
    });
