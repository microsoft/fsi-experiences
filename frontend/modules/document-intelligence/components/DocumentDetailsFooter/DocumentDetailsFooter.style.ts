import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';
import { IIconProps } from '@fluentui/react/lib/components/Icon/Icon.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants';

export const documentDetailsFooterStyles: IStackStyles = {
    root: {
        paddingBlock: 16,
    },
};

export const footerButtonsStyles: IStackStyles = {
    root: {
        gap: 8,
    },
};

export const uploadButtonStyles: IButtonStyles = {
    root: {
        color: COLORS.darkGray160,
        fontWeight: FontWeights.regular,
    },
    rootHovered: {
        textDecoration: 'none',
    },
};

export const uploadBtnIconProps: IIconProps = { iconName: 'Upload' };
