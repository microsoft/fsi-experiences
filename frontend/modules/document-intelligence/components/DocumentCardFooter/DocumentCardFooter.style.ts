import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { IIconProps, IIconStyles } from '@fluentui/react/lib/components/Icon/Icon.types';
import { IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';
import { FontSizes } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants';

export const docFooterCardStyles: IButtonStyles = {
    root: {
        paddingBlockStart: 4,
    },
};

export const reviewButtonStyles: IButtonStyles = {
    root: {
        border: '1px solid #D1D1D1',
        borderRadius: 4,
        height: 32,
        paddingBlock: '6px',
        paddingInline: '12px',
    },
};

export const menuButtonStyle: IButtonStyles = {
    root: {
        height: 32,
        i: {
            fontSize: FontSizes.size16,
            color: COLORS.darkGray,
            lineHeight: 16,
        },
    },
};

export const menuIconProps: IIconProps = { iconName: 'MoreVertical' };

export const footerLeftButtonsTokens: IStackTokens = { childrenGap: 18 };
