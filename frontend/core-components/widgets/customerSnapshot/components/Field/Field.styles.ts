import { IIconStyles } from '@fluentui/react/lib/components/Icon/Icon.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const iconStyles: IIconStyles = {
    root: { display: 'flex', alignItems: 'center', fontSize: FontSizes.size14, width: 14, height: 14, color: NeutralColors.gray130 },
};
export const textStyles: ITextStyles = { root: { fontSize: FontSizes.size12, color: NeutralColors.gray130 } };

export const valueTextStyles = ({ horizontal }): ITextStyles => ({
    root: {
        whiteSpace: horizontal ? 'normal' : 'break-spaces',
        selectors: {
            ':focus': {
                textDecoration: 'underline',
                paddingBlock: '3px',
                paddingInline: '0px',
            },
        },
    },
});

export const tagsStyles = {
    text: {
        fontWeight: FontWeights.regular,
    },
};
